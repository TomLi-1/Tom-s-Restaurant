# Tom 餐馆 PWA

Tom 餐馆是一款专属女朋友Ada的点餐 PWA，帮她快速挑到心仪的菜。项目暂时使用纯 HTML/CSS/vanilla JS，以后可以替换为任意框架。整个结构保持轻量级，便于逐步演进为更完整的全栈应用。

## 功能规划
- 支持湘菜、粤菜、空气炸锅、健身餐等多种分类，并可在 `src/data/dishes.js` 中随时追加
- 菜品列表包含图片、标签、描述、价格、辣度等元信息
- 购物车底部固定，展示已选项目和结算 CTA
- 提供“今日特选”和口味偏好筛选，方便ada随性挑选
- PWA：提供 manifest、service worker、离线缓存和“添加到主屏幕”体验

## 技术选型
- `index.html` + `styles.css` + `app.js` 组成前端
- `src/data/dishes.js` 用于集中管理菜品数据
- `public/manifest.json` & `sw.js` 保证 PWA 能力
- 将来可接入云函数/数据库，或迁移到 Next.js/Remix 等全栈框架

## 如何新增 / 修改菜品
- 最直接的方式是在 `src/data/dishes.js` 中编辑 `categories` 与 `dishes` 数组。只要替换 `image` 为你喜欢的图片地址、调整 `name/description/price/tags` 即可。
- 如果不想碰源码，可以访问 `admin.html`（例如 http://localhost:3000/admin.html），在“可视化数据编辑”界面里直接修改 JSON 数据并保存到浏览器 `localStorage`。主页面会自动读取最新的本地配置，想恢复默认可点击“恢复默认菜单”。

## 本地运行
```bash
cd tom-restaurant
npx serve .
```
访问 http://localhost:3000（或 serve 输出的端口）即可在浏览器/手机上体验，并且可以选择 “添加到主屏幕”。

## 全栈拓展路线
1. **数据层**：接入 Supabase/Firebase 或自建轻量 Node/Express + SQLite，提供菜品 CRUD 和用户偏好接口。
2. **账户与推荐**：用 Auth（Supabase Auth、Clerk、Auth0）记录女朋友的实时心情、最近选择，结合简单的打分算法做推荐。
3. **运营面板**：额外创建 `/admin` 页面上传菜品图片、调价、安排“今日特选”。可以用最熟悉的 React/Vue + Tailwind 来构建。
4. **部署上线**：静态部分可推送到 GitHub Pages、Netlify、Vercel 或 Cloudflare Pages，若接入后端则将 API 部署到 Fly.io/Render/Serverless。
5. **CI/CD**：以 GitHub Actions 实现自动格式检查 + 构建 + 部署，同时跑简单的 `vitest`/`playwright` UI 冒烟测试。

## 下一步
1. 完成静态 UI + 交互原型（本次提交）
2. 接入后端或 Supabase/Firebase 以支持账户和实时菜单更新
3. 编写部署脚本（Netlify、Vercel 或 Cloudflare Pages）
4. push 到 GitHub 并开 issue/roadmap 追踪演进
