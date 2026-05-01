# markdown-wechat

一个可部署到 Cloudflare Pages 的纯前端网页工具，用来把 Markdown 转成可直接粘贴到微信公众号编辑器的富文本内容。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署到 Cloudflare Pages

推荐使用静态站点部署：

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20+`

这个项目不依赖后端服务，首版所有 Markdown 解析、模板套用和富文本复制都在浏览器端完成。

## V1 能力

- 左侧 Markdown 输入，右侧公众号预览
- 一键复制富文本到剪贴板
- 支持标题、段落、引用、列表、分隔线、链接、图片、代码块、表格
- 通过模板配置集中管理公众号样式

## 后续方向

- 增加更多设计模板
- 本地图片上传 + 外链托管
- 文章历史与模板收藏
