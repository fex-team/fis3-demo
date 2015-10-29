//npm install -g fis-parser-sass
fis.match('**/*.scss', {
    rExt: '.css', // from .scss to .css
    parser: fis.plugin('node-sass', {
        //fis-parser-sass option
    })
});
