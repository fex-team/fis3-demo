## use-amd

- framework `require.js`
- fis3 plugin
    - fis3-hook-amd 本地解析替换路径，为合并做准备
    - fis3-postpackager-loader 解析 fis3 的 __RESOURCE_MAP__ 来生成 require.paths 列表，以实现对资源加 md5 或者 cdn 的需求
- command
    - fis3 release  组件分散预览
    - fis3 release prod 资源或者组件进行了合并处理
