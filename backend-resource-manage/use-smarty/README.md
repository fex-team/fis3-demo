## 用 Smarty 模板

Smarty 模板也是 PHP 写的，但好处是提供了若干插件，当真正和后端分离是不需要有后端支持就能用插件的方式解决静态资源管理这个事情；

说在前面的话，**如果你只是想用成套已经制定好的解决方案，请移步 [fex-team/fis3-smarty](https://github.com/fex-team/fis3-smarty)，而不需要往下看了**；如果你想了解 Smarty 解决方案是如何工作的，那么下面是一些原理介绍文档，欢迎**继续文档**。

此 demo 并不是 fis3-smarty 解决方案的 demo，而是为了简单诠释 Smarty 解决方案工作原理而设计的，请勿直接用于生产环境中。


### 执行尝试

```bash
# 肯定先下载demo的代码，并且进入这个文件夹下 use-smarty
# 下面这两个是下载 smarty 和 smarty 的 plugin
git submodule init
git submodule update
fis3 release -d output
cd output
php -S 127.0.0.1:8080 index.php
# 打开浏览器访问 URL：http://127.0.0.1:8080
```

### 历史回顾

- FIS 2.0 时期支持 Smarty 开发的成套解决方案是 [fis-plus](https://github.com/fex-team/fis-plus)
- FIS 3.0 时期支持 Smarty 开发的成套解决方案由 [fis3-smarty](https://github.com/fex-team/fis3-smarty) 提供


### 需要做的事情

- 支持 Smarty 组件拆分
- 组件加载时作为入口，将模板依赖的资源全部加载
- 实现模板、js、css互相都可以依赖的模块化方案
    
    其实 FIS 一直提倡的是这种依赖模型，模板我可以依赖某些 js，css 组件，js 依赖一些 css 组件，甚至 css 去依赖 js 组件；

    其实说白了就是一个入口的问题，入口文件依赖别的什么文件；

    浏览器解析网页，模板是第一入口，后由于一些逻辑要执行 js 成为另一个入口，附带一些内嵌模板以及 css 的依赖。

    现在市面上的除了 web components 以外，都是js模块化管理方案，其实并没有给一种能力去让模板依赖资源，而是引入资源。FIS 就实现了各个资源之间互相依赖的特性，在本地编译期间就产出其依赖树，方便线上运行加载。

### 怎么做

上面说到过，模板依赖某个组件（模板，js，css）不再直接引入，而是添加依赖，这些依赖在 FIS 本地编译的时候会产出依赖树，我们一直都叫它**静态资源映射表**；

举个例子；

我给资源都标注一些依赖；比如我模板是这么写的；

*index.tpl*
```smarty
<!-- @require /static/a.js -->
<!-- @require /static/b.js -->
```

> 这块的 `require` 并没有 js 模块化框架里面的 `require` 的功效，其只是标明这个模板依赖俩 js 文件。<br />
> 当然，有的时候需要把 js 模块化也算进去，也经常会根据 js 里面的 `require` 信息去标明依赖，其实这个导致的后果是以为 FIS 本身依赖了某种 js组件化 加载规范，其实 FIS 是裸规范的，所以不管是 AMD、commonJs亦或是你自己实现的*MD，都是可以通过插件去运作起来的。 

当编译的时候，会在最终产出的数据结构中包含这样一个信息

```js
{
    "res": {
        "static/a.js": {
            "uri": "/static/a.js",
            "type": "js"
        },
        "static/b.js": {
            "uri": "/static/b.js",
            "type": "js"
        },
        "index.tpl": {
            "uri": "/index.tpl",
            "type": "tpl",
            "deps": [
                "static/a.js",
                "static/b.js"
            ]
        }
    }
}
```

    你可以在任意的一个文件中包含


    __RESOURCE_MAP__


    字样，产出时这个结构就会替换 __RESOURCE_MAP__。

**等等，标记了依赖我们的资源如何加载？**

一般的模板开发都是 js，css 都是 script，link 到页面的，或者是直接用 `require.js` 之类的进行异步加载，最终也是给页面建 script 节点做的加载。

那么我们这种方式如何加载呢，上面我们得到了模板依赖树的一张表；我们可以通过**前端**解析这张表去加载资源也可以**后端**解析这张表加载资源；

这块我们选择**后端**解析这张表去做加载；

#### Smarty 模块化拆分

为了支持 Smarty 模板的拆分，以及达到当 load 这个拆分组件的时候，能以它为**入口**去把这个组件的**依赖也加载过来**。需要用 Smarty 插件的形式实现一些挂起组件模板另外还触发**查表** 的功能。

- 首先定义使用语法
    
    ```smarty
    {widget name="widget/header.tpl" title=`$global.title`}
    ```

    - `name` 属性 值为静态资源映射表里面的一个 `res` 的 id，当 widget 插件被调用的时候去读这个值，到**表**里面查到具体需要 `fetch` 的模板路径。
    - 其他属性作为局部变量，其内部无法修改外部 global 的数据，比如上面的 `title` 属性，就可以在 `header.tpl` 里面按照如下使用方式获取到 `title`

        ```smarty
        <div>{title}</div>
        ```

- 其次实现查表功能 & Smarty widget 插件

    具体实现就比较简单了，读这张表数据（可以产出到某个 php、json），读到对应的 id 的 uri 用来做模板渲染，而依赖记录下来，后续页面全部渲染完了，嵌入到给浏览器返回的 html 中。

    具体实现代码

    - 插件实现就不是本文关注的重点了，可参考 Smarty 官网
    - 获取模板路径 https://github.com/fex-team/fis-plus-smarty-plugin/blob/master/compiler.widget.php#L55 https://github.com/fex-team/fis-plus-smarty-plugin/blob/master/FISResource.class.php#L104
    - load 依赖的资源 https://github.com/fex-team/fis-plus-smarty-plugin/blob/master/compiler.widget.php#L70 https://github.com/fex-team/fis-plus-smarty-plugin/blob/master/FISResource.class.php#L334


#### 提供其他一些辅助开发的接口

为了方便开发，充分运用 Smarty 的能力，我们还可以加一些接口；

- `{require name="<ID>"}`

    依赖标注的时候，上面提到了统一的注释语法

    ```html
    <!-- @require ./a.js -->
    <!-- @require ./b.js -->
    ```

    其实想想它只是做标注，而且是静态依赖，编译过后在模板的 `deps` 里面，运行时加载过去。但可能这样的方式还可以进行扩展，除了这个我们在模板里面也可以实现类似的功能。比如

    ```smarty
    {require name="a.js"}
    {require name="b.js"}
    ```
    
    其**不是为了添加到依赖树里面**，而是运行时依赖这个资源，这样的一个好处就在于，我们可以做这样的事情，而通过标记依赖是搞不定的。

    ```smarty
    {if $user.id == 1}
        {require name="a.js"}
    {else}
        {require name="b.js"}
    {/if}
    ```

    可以做到按需加载资源；

- `{uri name="<ID>"}`

    其实有的时候你需要知道某一个资源的具体 url，因为 url 有可能在源码 subpath 的基础上做改动，加 md5 等；这个好比是 Smarty 版本的 `uri` 能力。

有了这几个 Smarty 插件，在开发中就方便许多了。

之所以还有个 Smarty 版本的 require、uri 是可以借助后端能力方便搞定一些动态运行的事情。

```smarty
{foreach $ids as $id}
    {require name="`$id`"}
{/foreach}
```

#### 能够解析 Smarty 模板的程序

Smarty 也拆分了，资源加载的方法也有了，那么需要实现一个能解析 Smarty 的脚本了，嗯，对 PHP 脚本就行。

这个脚本就比较简单了，直接阅览代码 [index.php](index.php)