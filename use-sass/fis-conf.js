//npm install -g fis-parser-sass
fis.match('**/*.scss', {
    rExt: '.css',
    parser: fis.plugin('sass', {
        //fis-parser-sass option
    })
});