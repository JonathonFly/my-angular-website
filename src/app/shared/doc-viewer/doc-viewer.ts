import { DomPortalHost } from '@angular/cdk/portal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'doc-viewer',
  template: 'Loading document...',
})
export class DocViewer implements OnDestroy {
  private _documentFetchSubscription: Subscription;

  /** The URL of the document to display. */
  @Input()
  set documentUrl(url: string) {
    this._fetchDocument(url);
  }

  @Output() contentLoaded = new EventEmitter<void>();

  /** The document text. It should not be HTML encoded. */
  textContent = '';

  constructor(
    private _elementRef: ElementRef,
    private _http: HttpClient,
    private _router: Router) { }

  /** Fetch a document by URL. */
  private _fetchDocument(url: string) {
    // Cancel previous pending request
    if (this._documentFetchSubscription) {
      this._documentFetchSubscription.unsubscribe();
    }

    this._documentFetchSubscription = this._http.get(url, { responseType: 'text' }).subscribe(
      document => this.updateDocument(document),
      error => this.showError(url, error)
    );
  }

  /**
   * Updates the displayed document
   * @param document The raw document content to show.
   */
  private updateDocument(document: string) {

    this._elementRef.nativeElement.innerHTML = document;
    this.textContent = this._elementRef.nativeElement.textContent;
    this._fixFragmentUrls();
    this.contentLoaded.next();
    this.lazyLoadImageModuleReInit();
  }

  private lazyLoadImageModuleReInit(){
    let echo = (<any>window).echo;
    if (echo) {
      echo.detach();
      echo.init({
        throttle: 250,
        unload: false,
        callback: function (element, op) {
        }
      });
    }
  }


  /** Show an error that ocurred when fetching a document. */
  private showError(url: string, error: HttpErrorResponse) {
    console.log(error);
    this._elementRef.nativeElement.innerText =
      `Failed to load document: ${url}. Error: ${error.statusText}`;
  }

  /**
   * A fragment link is a link that references a specific element on the page that should be
   * scrolled into the viewport on page load or click.
   *
   * By default those links refer to the root page of the documentation and the fragment links
   * won't work properly. Those links need to be updated to be relative to the current base URL.
   */
  private _fixFragmentUrls() {
    const baseUrl = this._router.url.split('#')[0];
    const anchorElements =
      [].slice.call(this._elementRef.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];

    // Update hash links that are referring to the same page and host. Links that are referring
    // to a different destination shouldn't be updated. For example the Google Fonts URL.
    anchorElements
      .filter(anchorEl => anchorEl.hash && anchorEl.host === location.host)
      .forEach(anchorEl => anchorEl.href = `${baseUrl}${anchorEl.hash}`);
  }

  ngOnDestroy() {

    if (this._documentFetchSubscription) {
      this._documentFetchSubscription.unsubscribe();
    }
  }
}
