fis3-angular-demo
===========================

基于 https://github.com/hefangshi/fis-pure-angular-demo 移植到FIS3，使用了 https://github.com/fex-team/mod 进行模块化管理与依赖加载，同时通过ng-annotate实现依赖注入注解的自动添加

代码请进入此项目: https://github.com/zhangtao07/fis3-angular-demo  查看

## 使用方法

```
# 安装fis-pure
npm i -g fis3

# 下载demo
git clone https://github.com/zhangtao07/fis3-angular-demo.git

cd fis3-angular-demo

# 安装相关插件
npm install 

# bower安装依赖
bower install

# 使用FIS编译DEMO
fis3 release 

# 预览效果
fis3 server  start --type node

# 生产环境打包压缩MD5戳等
fis3 release prod

```

**运行截图**

![首页](https://github.com/zhangtao07/fis3-angular-demo/raw/master/doc/pic.png)

## Why

1. 用gulp做的angular方案很少集成**按需加载**，一般是采用目录全量加载方式去加载资源，这个DEMO中，所有的controller, directives则是按需加载。
2. 无需配置轻松支持**异步加载**controller等逻辑，见`modules/pages/tables/tables.js`
3. 模板也不需要异步加载，或者用类似html2js的插件去处理，直接__inline就可以使用。
4. 如果看看配置文件就会发现，在FIS的环境下开发angular应用基本不需要任何配置，也是给大家展现一些FIS的使用思路
5. 这个方案的目录组织结构也是按照模块进行功能拆分，给出了一个在angular应用下，模块拆分的指引
6. 无缝结合FIS的打包、压缩、MD5戳等功能
7. 通过按需编译FIS3能轻松解决使用`bower`时很多`冗余资源`的问题
