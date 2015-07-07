// 启用 es6-babel 插件，解析 .es6 后缀为 .js
fis.match('*.es6', {
  rExt: '.js',
  parser: fis.plugin('es6-babel')
});


// 开启模块化开发
fis.hook('module');
fis.match('*.es6', {
  isMod: true
});

fis.match('::package', {
  postpackager: fis.plugin('loader')
});
