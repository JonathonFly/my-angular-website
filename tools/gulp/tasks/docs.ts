import { task, src, dest } from 'gulp';
import * as path from 'path';
import { sequenceTask } from './sequence-task';

// There are no type definitions available for these imports.
const markdown = require('gulp-markdown');
const transform = require('gulp-transform');
const highlight = require('gulp-highlight-files');
const rename = require('gulp-rename');
const flatten = require('gulp-flatten');
const htmlmin = require('gulp-htmlmin');
const hljs = require('highlight.js');
const dom = require('gulp-dom');
const sass = require('gulp-sass');

// Our docs contain comments of the form `<!-- example(...) -->` which serve as placeholders where
// example code should be inserted. We replace these comments with divs that have a
// `material-docs-example` attribute which can be used to locate the divs and initialize the example
// viewer.
const EXAMPLE_PATTERN = /<!--\W*example\(([^)]+)\)\W*-->/g;

// Markdown files can contain links to other markdown files.
// Most of those links don't work in the Material docs, because the paths are invalid in the
// documentation page. Using a RegExp to rewrite links in HTML files to work in the docs.
const LINK_PATTERN = /(<a[^>]*) href="([^"]*)"/g;

const IMG_PATTERN = /<img\s+src="(assets[^"]*)\/([^\/"]+)"([^>]*)>/g;

// HTML tags in the markdown generated files that should receive a .docs-markdown-${tagName} class
// for styling purposes.
const MARKDOWN_TAGS_TO_CLASS_ALIAS = [
  'a',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'li',
  'ol',
  'p',
  'table',
  'tbody',
  'td',
  'th',
  'tr',
  'ul',
  'pre',
  'code',
];

// Options for the html-minifier that minifies the generated HTML files.
const htmlMinifierOptions = {
  collapseWhitespace: true,
  removeComments: true,
  caseSensitive: true,
  removeAttributeQuotes: false
};

const markdownOptions = {
  // Add syntax highlight using highlight.js
  highlight: (code: string, language: string): string => {
    if (language) {
      // highlight.js expects "typescript" written out, while Github supports "ts".
      let lang = language.toLowerCase() === 'ts' ? 'typescript' : language;
      return hljs.highlight(lang, code).value;
    }

    return code;
  }
};

task('sass', () => {
  return src('src/tempfiles/custom-themes/**/*.scss')
    .pipe(sass())
    .pipe(dest('src/assets/'));
});

/** Generate all docs content. */
task('docs', sequenceTask(
  [
    'markdown-docs-material',
    // 'markdown-docs-cdk',
    // 'build-highlighted-examples',
    // 'build-examples-module',
    // 'copy-stackblitz-examples'
  ],
  'minify-html-files'
));

/** Generates html files from the markdown overviews and guides for material. */
task('markdown-docs-material', () => {
  // Extend the renderer for custom heading anchor rendering
  markdown.marked.Renderer.prototype.heading = (text: string, level: number): string => {
    if (level === 3 || level === 4) {
      const escapedText = text.toLowerCase().replace(/[^\u4e00-\u9fa5_a-zA-Z0-9]+/g, '-');
      return `
        <h${level} id="${escapedText}" class="docs-header-link">
          <span header-link="${escapedText}"></span>
          ${text}
        </h${level}>
      `;
    } else {
      return `<h${level}>${text}</h${level}>`;
    }
  };

  return src(['src/tempfiles/docs-md/*.md'])
    .pipe(rename({ prefix: 'jonathonfly-' }))
    .pipe(markdown(markdownOptions))
    .pipe(transform(transformMarkdownFiles))
    .pipe(dom(createTagNameAliaser('docs-markdown')))
    .pipe(dest('src/tempfiles/documents-large'));
});

/**
 * Creates syntax-highlighted html files from the examples to be used for the source view of
 * live examples on the docs site.
 */
task('build-highlighted-examples', () => {
  // rename files to fit format: [filename]-[filetype].html
  const renameFile = (filePath: any) => {
    const extension = filePath.extname.slice(1);
    filePath.basename = `${filePath.basename}-${extension}`;
  };

  return src('src/material-examples/**/*.+(html|css|ts)')
    .pipe(flatten())
    .pipe(rename(renameFile))
    .pipe(highlight())
    .pipe(dest('dist/docs/examples'));
});
/**
 * Minifies all HTML files that have been generated. The HTML files for the
 * highlighted examples can be skipped, because it won't have any effect.
 */
task('minify-html-files', () => {
  return src('src/tempfiles/documents-large/**/*.html')
    .pipe(htmlmin(htmlMinifierOptions))
    .pipe(dest('src/assets/documents'));
});

/** Updates the markdown file's content to work inside of the docs app. */
function transformMarkdownFiles(buffer: Buffer, file: any): string {
  let content = buffer.toString('utf-8');

  // Replace <!-- example(..) --> comments with HTML elements.
  content = content.replace(EXAMPLE_PATTERN, (_match: string, name: string) =>
    `<div material-docs-example="${name}"></div>`
  );

  //replace local image's attributes. support lazy loading.
  content = content.replace(IMG_PATTERN, (_match: string, imagePath: string, imageName: string, other:string) =>
    `<img src="${imagePath}/low/${imageName}" data-echo="${imagePath}/${imageName}" width="100%" height="100%"${other}>`
  );

  // Replace the URL in anchor elements inside of compiled markdown files.
  content = content.replace(LINK_PATTERN, (_match: string, head: string, link: string) =>
    // The head is the first match of the RegExp and is necessary to ensure that the RegExp matches
    // an anchor element. The head will be then used to re-create the existing anchor element.
    // If the head is not prepended to the replaced value, then the first match will be lost.
    `${head} href="${fixMarkdownDocLinks(link, file.path)}"`
  );

  // Finally, wrap the entire generated in a doc in a div with a specific class.
  return `<div class="docs-markdown">${content}</div>`;
}

/** Fixes paths in the markdown files to work in the material-docs-io. */
function fixMarkdownDocLinks(link: string, filePath: string): string {
  // As for now, only markdown links that are relative and inside of the guides/ directory
  // will be rewritten.
  if (!filePath.includes(path.normalize('src/assets/docs-md')) || link.startsWith('http')) {
    return link;
  }

  let baseName = path.basename(link, path.extname(link));

  // Temporary link the file to the /guide URL because that's the route where the
  // guides can be loaded in the Material docs.
  return `article/${baseName}`;
}

/**
 * Returns a function to be called with an HTML document as its context that aliases HTML tags by
 * adding a class consisting of a prefix + the tag name.
 * @param classPrefix The prefix to use for the alias class.
 */
function createTagNameAliaser(classPrefix: string) {
  return function () {
    MARKDOWN_TAGS_TO_CLASS_ALIAS.forEach(tag => {
      for (let el of this.querySelectorAll(tag)) {
        el.classList.add(`${classPrefix}-${tag}`);
      }
    });

    return this;
  };
}