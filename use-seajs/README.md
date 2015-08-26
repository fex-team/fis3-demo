## use-seajs

http://seajs.org

基于 seaJS 的模块化解决方案

### 注意

- 支持文件 md5 戳功能
- 支持 all in one 打包。但是：不支持部分打包！！

## 插件安装

插件支持本地安装。如需本地安装，去掉下面的 `-g` 参数

```bash
$ npm install fis3 -g
$ npm install fis3-hook-cmd -g
$ npm install fis3-postpackager-loader -g
```

## 编译 & 预览

```bash
$ fis3 release
$ fis3 server start
```

## 产出产品代码

```bash
$ fis3 release prod -d ./output
```
