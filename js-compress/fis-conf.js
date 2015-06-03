
fis.match('*.js', {
  useHash: false, // default is true
  // 指定压缩插件 fis-optimizer-uglify-js 
  optimizer: fis.plugin('uglify-js', {
    // option of uglify-js
  })
});
