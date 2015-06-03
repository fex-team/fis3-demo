## 目录规范定制

### 源码目录

```
.
├── fis-conf.js
├── map.json
├── page
├── static
└── widget
```

### 产出目录

```
.
├── config
├── static
└── template
```


---
规则

- 静态资源全部发布到 `static` 目录下
- `map.json` 发布到 `config` 目录下
- 模板文件都发布到 `template` 目录下

> 在项目根目录下执行 `fis3 inspect` 来查看特定文件分配到的属性
