fis.match('/components/**.js', {
    isMod: true
});

fis.hook('commonjs');

fis.match('::package', {
    postpackager: fis.plugin('loader')
});

// 编译所有后缀为 jsx 的文件为 js
fis.match('{*.jsx,*:jsx}', {
    parser: fis.plugin('babel-5.x', {
        sourceMaps: true
    }),
    rExt: '.js'
});
