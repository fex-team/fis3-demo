// sass 里面的规范，一般  _ 打头的文件都不 release.
fis.match('_*.*', {
  release: false
});

// npm install -g fis-parser-sass
fis.match('**/*.scss', {
  rExt: '.css', // from .scss to .css
  parser: fis.plugin('sass', {
    // fis-parser-sass option
  })
});

// 所有文件下面当内嵌 scss 内容时。
// 注意这里的 :scss 也是一种类 css 选择器。表示当目标文件内嵌了其他语言内容时，用来命中内嵌内容为 scss 的编译处理。
// 参考 index.html 中第 7 行。
fis.match('*:scss', {
  parser: fis.plugin('sass', {
    // fis-parser-sass option
  })
});

// 当文件中，内嵌 coffee script 时，使用 coffee-script 进行内容 parse.
fis.match('*:coffee', {
  parser: fis.plugin('coffee-script')
});
