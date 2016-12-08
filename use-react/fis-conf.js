fis.match('{app.jsx,/node_modules/**.js}', {
    isMod: true
});

fis.hook('commonjs');
fis.hook('node_modules', {
    'shimProcess': false
})

fis.match('::package', {
    postpackager: fis.plugin('loader')
});

// 编译所有后缀为 jsx 的文件为 js
fis.match('{*.jsx,*:jsx}', {
    parser: fis.plugin('babel-6.x', {
        sourceMaps: true
    }),
    rExt: '.js'
});
