# Angular 6 Service Worker 调试记

最近在搭建自己的小站的时候，想用一下`Service Worker`来提高网站对于低网速环境下的友好度，主要是想利用一下`Service Worker`的cache功能。而且利用它，一旦缓存成功，即使在离线情况下，网站依旧能够服务。这对于我的基本都是静态页面的小站来说，一方面能减轻服务器压力，除了第一次和新内容，其他基本都从缓存读取；另一方面，加快内容加载速度，低网速条件下体验能够提升。

### Angular 6 Service Worker支持的实现

Angular 从版本5开始支持`Service Worker`，配置和使用十分方便，具体包含以下几步：

1.  添加`@angular/service-worker`包
2.  设置`angular.json`文件中`build`->`configurations`->`production`->`serviceWorker`为`true`。
3.  在app module中引入并注册`Service Worker`，在`NgModule`中添加`ServiceWorkerModule.register('/ngsw-worker.js',  {enabled: environment.production})`即可。
4. 在项目根目录下创建`ngsw-config.json`的配置文件。

具体详情请参考：[https://angular.io/guide/service-worker-intro](https://angular.io/guide/service-worker-intro).

### 遇到的问题

上述步骤完成后，我用npm命令安装了`http-server`，因为`angular/cli`自带的`ng serve`并不能让`Service Worker`可用。安装命令为:
```
npm install http-server -g
```
安装完成后，即可进入编译得到的dist文件夹下你的项目，运行`http-server`。
```
cd dist/your-project
http-server -p 8080
```
结果很悲剧，我在`Chrome`的`Console`->`Application`->`Service Worker`里并没有看到实例，在[chrome://serviceworker-internals](chrome://serviceworker-internals)没有发现本机8080端口的已经注册的`Service Worker`，在[chrome://inspect/#service-workers](chrome://inspect/#service-workers)里也没看到正在运行的。

### 解决过程

#### 寻找问题

说实话，这个步骤是最最吃力的，一旦定位到问题，那么`Google`或者`Baidu`就能帮上忙了。反之，就只能无头苍蝇乱转，不可能找到解决方法。

我排查问题比较简单粗暴，在确定了自己的配置和教程上所写的并无太大出入之后，我新建了一个空项目，按照`Service Worker`的教程配置新的空项目。以此来验证我新加`Service Worker`支持的步骤的正确性。结果也是好的，证明我的新加步骤没问题。

其次，我将自己的小站的主要配置文件复制到空项目里，也没有问题，依旧可行。可是当我把`src/app`目录下的文件拷贝过去之后，又不work了，问题得以重现。那么久确定了问题是出在`src/app`下的代码文件中。

接下来就更暴力血腥了，我一点一点移除各个module和component，直到只剩下`app.component`。接下来就是一块一块代码注释掉验证，最后定位到一个block。
```ts
ngAfterViewInit(){
    this.timeOutId = setInterval(() => {
       if (Splash.isRunning()) {
         Splash.destroy();
        this.clear();
       }
    }, 5);
   }
   
  clear(){
     if (this.timeOutId) {
       clearTimeout(this.timeOutId);
     }
  }
```
定睛一看，我勒个大擦，之前我用的`setTimeout`，后来又改成`setInterval`，但是在clear方法里并没有改成`clearInterval`，所以用`clearTimeout`方法去清理`interval reference`肯定是不会成功的。但是从头到尾，我的控制台都没有报过错，打死我也不会想到一行代码错误就会让`Service Worker`完全失效。

#### 解决问题

将`clearTimeout`改为`clearInterval`，访问`Chrome Console`，`Service Worker`能够成功使用。至此，问题得以解决。

### 后记

为什么一个代码中不影响运行的bug，会让`Service Worker`完全失效，这需要更多探索研究。