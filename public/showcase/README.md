# 智慧园区运营管理系统独立包

这个目录是从原展示项目中抽出的「智慧园区运营管理系统」模块，可单独部署或合入其他项目。

## 文件结构

```text
smart-campus-module/
  showcase.html
  assets/
    showcase-CSJNwqw4.js
    showcase-BiHWydMv.css
    SmartCampusPipelineDemoView-BCvj6AKX.js
    SmartCampusPipelineDemoView-DUMvtGB3.css
    three.module-VY7EyGVP.js
    _plugin-vue_export-helper-DlAUqK2U.js
    fa-*.woff2
```

## 部署方式

当前构建产物使用固定资源前缀 `/showcase/`，所以推荐把这个目录作为站点的 `/showcase` 入口部署：

```text
https://your-domain.com/showcase/
https://your-domain.com/showcase/assets/...
```

如果合入的是 Nginx、Vite、Next.js、Spring Boot 静态目录等项目，需要保证：

- `/showcase/` 返回 `showcase.html`
- `/showcase/smart-campus/demo` 也回退到 `showcase.html`
- `/showcase/assets/*` 能访问到本目录的 `assets/*`

## 本地预览

如果你沿用当前项目里的静态服务映射方式，访问：

```text
http://127.0.0.1:4173/showcase/
```

页面会自动切到：

```text
/showcase/smart-campus/demo
```

## 合入注意

- 这是静态前端演示模块，不依赖真实后端接口。
- 运行时数据、AI 调度、事件流和表单提交都是前端模拟。
- 如果你的项目不能使用 `/showcase/` 前缀，需要批量替换 `showcase.html` 和 CSS/JS 中的 `/showcase/` 资源前缀。
