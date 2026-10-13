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
- Node version: `22.12+`

这个项目不依赖后端服务，首版所有 Markdown 解析、模板套用和富文本复制都在浏览器端完成。

## V1 能力

- 左侧 Markdown 输入，右侧公众号预览
- 一键复制富文本到剪贴板
- 支持标题、段落、引用、列表、分隔线、链接、图片、代码块、表格
- 通过模板配置集中管理公众号样式

## 当前交付状态

- 线上地址：https://markdown-wechat.pages.dev/
- GitHub：https://github.com/duffercn/markdown-wechat
- Cloudflare Pages 已连接 GitHub，推送 `master` 后自动构建发布。
- 保留三套中文文章模板：故事心情、商业评论、教程拆解。
- 工具界面采用中性白底，文章以黑灰文字为主。
- 当前版本收尾，暂无进一步功能开发计划。

## 已知限制

- 中文字体使用本机字体回退，不同设备的实际字体可能不同；没有托管网络字体。
- 图片仅支持外链，不提供上传或托管。
- 公众号编辑器可能调整粘贴内容的样式或图片，发布前仍需在公众号后台检查；未完成真实公众号后台的完整粘贴验收。
- 不包含账号、云端保存或文章历史。
