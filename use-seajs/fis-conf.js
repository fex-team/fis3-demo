// 只需要编译 html 文件，以及其用到的资源。
fis.set('project.files', ['*.html', 'map.json']);

fis.match('*.js', {
  isMod: true
});

fis.match('/static/sea.js', {
  isMod: false
});

fis.hook('cmd', {
  baseUrl: './sea-modules/',

  paths: {
    "jquery": "jquery/jquery/1.10.1/jquery.js",
    "$": "jquery/jquery/1.10.1/jquery.js",
    "jquery-easing": "jquery/easing/1.3.0/easing.js",
    "store": "gallery/store/1.3.7/store",
    "angularjs": "angular/angularjs/1.1.5/angular.js",
    "underscore": "gallery/underscore/1.4.4/underscore.js",
    "backbone": "gallery/backbone/1.0.0/backbone.js"
  }
});

fis.match('::packager', {
  postpackager: fis.plugin('loader')
});


// 注意： fis 中的 sea.js 方案，不支持部分打包。
// 所以不要去配置 packTo 了，运行时会报错的。
fis
  .media('prod')
  .match('/static/**.js', {
    // 通过 uglify 压缩 js
    // 记得先安装：
    // npm install [-g] fis-optimizer-uglify-js
    optimizer: fis.plugin('uglify-js')
  })
  .match('::packager', {
    postpackager: fis.plugin('loader', {
      allInOne: {
        includeAsyncs: true,
        ignore: ['/static/sea.js']
      }
    })
  })
