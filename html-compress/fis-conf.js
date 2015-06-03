// You need install it.
// npm i fis-optimizer-html-minifier [-g]
//
fis.match('*.html', {
  //invoke fis-optimizer-html-minifier
  optimizer: fis.plugin('html-minifier')
});
