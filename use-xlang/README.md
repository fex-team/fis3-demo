## use xlang

xlang 提供一种 html 中内嵌异构语言的一种能力。

比如使用 less.

```html
<style type="text/x-less">
  body {
    h1 {
      color: red;
    }
  }
</style>
```

此 demo 演示了如何使用 sass 和 coffescript，更多细节请参考源码。

### about plugin

- fis-parser-sass
    - npm https://www.npmjs.com/package/fis-parser-sass
    - GitHub https://github.com/fouber/fis-parser-sass

- fis-parser-coffee-script
    - npm https://www.npmjs.com/package/fis-parser-coffee-script
    - GitHub https://github.com/fouber/fis-parser-coffee-script
