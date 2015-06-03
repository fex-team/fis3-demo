// https://github.com/fex-team/fis3


fis.match('*', {
  release: '/static/$0'
});

fis.match('/map.json', {
  release: '/config/$0'
});

fis.match('*.tpl', {
  release: '/template/$0'
});

fis.match('/widget/**/*.{js,css}', {
  isMod: true
});

fis.match('/widget/**/*.js', {
  postprocessor: fis.plugin('jswrapper', {
    type: 'amd'
  })
});
