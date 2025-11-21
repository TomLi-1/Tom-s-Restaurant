# Tom 餐馆 PWA

adaaa♡tom专属餐厅是一款专属我女朋友ada的点餐 PWA，帮她随时挑菜。项目暂时使用纯 HTML/CSS/vanilla JS，以后可迁移到任意框架。

## 功能亮点
- 流体玻璃感 UI，粉色渐变背景搭配圆角卡片，顶栏可随时替换情侣头像
- 菜卡展示图片、描述、热量、蛋白、标签，点击 `+` 会弹出辣度选择；饮品也能一键加入
- “随机菜单” 会先询问想吃的主题或直接交给 Omakase，一次推荐两道菜（不含饮料/甜品），再由 ada 决定安排哪一道
- 结算按钮弹出订单汇总弹窗，可填写备注，并通过 Server酱把消息推送到你的微信
- 仍支持 PWA 安装、离线缓存与 GitHub Pages 自动部署


## 如何新增 / 修改菜品
1. **编辑数据文件**：在 `src/data/dishes.js` 添加或修改 `dishes`，字段示例：
   ```js
   {
     id: 'new-dish',
     categoryId: 'hunan',
     name: '剁椒小炒肉',
     description: '特香超下饭',
     price: 32,
     heat: '🌶🌶',
     calories: 520,
     protein: 30,
     spiceLevel: 'spicy', // 会决定辣度弹窗的默认项
     tags: ['香辣', '下饭'],
     image: 'https://...jpg'
   }
   ```
2. **Admin 工具**：访问 `http://localhost:3000/admin.html`，在可视化 JSON 编辑器或“快速新增菜品”中操作，结果只会保存在浏览器 `localStorage`；
   点击“保存到浏览器”后主界面会自动读取，恢复默认请按“恢复默认菜单”。
3. **一键同步 JSON**：在 admin 页点击“复制 JSON”存成 `menu.json`，然后运行 `python scripts/import_menu.py menu.json`，脚本会自动把内容写入 `src/data/dishes.js` 并保持格式一致，下次 push 就能同步到线上版本。

## 订单推送到微信（Server酱）
1. 在 [Server酱](https://sct.ftqq.com/) 登录并获取 SendKey（形如 `SCTxxxxxxxx`）。
2. 点击网页底部的“去结算”→ 在弹窗底部的 “Server酱 SendKey” 输入框中填入该 Key，它会被保存在浏览器中。
3. 之后每次点“发送给 Tom”都会调用 Server酱 API，把订单列表、总价和备注推送到你的微信服务号；留空 SendKey 则只在页面内记录。
4. 如果要停用推送，只需把输入框清空即可。

## 本地运行
```bash
cd tom-restaurant
npx serve .
```
访问 http://localhost:3000 即可体验。若标题或图片没刷新，可在浏览器 DevTools → Application → Storage 中清理缓存/Service Worker。

## 部署到 GitHub Pages
1. 仓库 Settings → Pages → Source 选择 “GitHub Actions”。
2. `.github/workflows/deploy.yml` 已就绪，push 即自动部署。
3. workflow 绿色后，Pages 页面会显示访问 URL，可分享给女朋友使用。

## 全栈拓展路线
1. **数据层**：接入 Supabase/Firebase 或自建 Node/Express + SQLite，把 `dishes`/`orders` 等表移到云端。
2. **实时通知**：若想要更可靠的推送，可配合 Cloudflare Workers/Serverless 函数，通过企业微信、Twilio WhatsApp 等渠道发送。
3. **账户与推荐**：用 Auth 记录喜好、最近订单；追加“心情”滑块影响推荐结果。
4. **运营面板**：在 `/admin` 增加图片上传、价格调整、饮品轮换等控件，真正做到全栈。
5. **CI/CD**：引入 ESLint/Vitest/Playwright，Actions 中自动跑测试后再部署。
