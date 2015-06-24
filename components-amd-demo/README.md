Components Demo AMD Version
=======================================

此 demo 演示了，在 fis3 中如何去使用 [fis-components](https://github.com/fis-components/components)。

## 1. 安装以下插件
全局安装，或者局部安装都可以。

* [fis3-hook-module](https://github.com/fex-team/fis3-hook-module)
* [fis3-postpackager-loader](https://github.com/fex-team/fis3-postpackager-loader)
* [fis-optimizer-uglify-js](https://github.com/fex-team/fis-optimizer-uglify-js)

## 2. 安装 components

```bash
$ fis3 install

Installed
├── github:fis-components/jquery@1.9.1
└── github:fis-components/jquery-ui@1.11.2
```

## 3. 编译产出 & 预览

```bash
$ fis3 release -d ./output
$ fis3 server start --root ./output
```

## 生成产品代码

```bash
$ fis3 release prod -d ./output
```
