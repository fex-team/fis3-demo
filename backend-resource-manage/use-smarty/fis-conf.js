
// node_modules 默认被添加到了 ignore 列表中，所以不做处理也不会被发布

fis.match('*', {
    useHash: false, // md5 都关掉
    release: '/static/$0'
});

fis.match('*.php', {
    release: '$0'
});

fis.match('/smarty/{*,**/*}', {
    release: '$0'
});

fis.match('*.tpl', {
    release: '/template/$0'
});

fis.match('/(widget/{*,**/*}.tpl)', {
    useMap: true,
    url: '$1' // 这个比较重要
});

fis.match('map.json', {
    release: '/config/$0'
});

fis.match('/widget/{*,**/*}.js', {
    isMod: true,
    postprocessor: fis.plugin('mod.js-define-wrapper') // 未发布 NPM
    // fis3 是可以加载项目里面的 node_modules 下的插件的，但是这个对理解 fis3 有帮助
    // 不建议在生产环境中这么干，不然维护起来会比较麻烦，fis 依然推荐全局做安装
});

fis.match(/.*\.partial\.js$/, {
    isMod: false
});

fis.match('/plugin/test/{*,**/*}', {
    release: false
});