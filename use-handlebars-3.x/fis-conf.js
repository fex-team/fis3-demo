//npm install -g fis-parser-handlebars-3.x
fis.match('hbs/*.handlebars', {
    rExt: '.js', // from .handlebars to .js 虽然源文件不需要编译，但是还是要转换为 .js 后缀
    parser: fis.plugin('handlebars-3.x', {
        //fis-parser-handlebars-3.x option
    }),
    release: false // handlebars 源文件不需要编译
});