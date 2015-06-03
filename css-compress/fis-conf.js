
// fis3 release -d output
// cd ./output
// cat ./style.css #view result

fis.match('*.css', {
  useHash: false, //default is `true`
  // compress css invoke fis-optimizer-clean-css
  optimizer: fis.plugin('clean-css', {
    // option of clean-css
  })
});
