//忽视所有 _开头的文件
fis.match('_*.*', {
    release: false
});
fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-node-sass option
    })
});
