# 瀚海筑梦网站
---

# 项目架构与技术栈文档 (Project Architecture & Tech Stack)

## 1.  技术栈 (Technology Stack)

本项目采用现代化的 **React + Vite** 生态系统构建，注重高性能渲染与极致的交互体验。

### **核心框架 (Core)**

* **React 18**: 用于构建用户界面的 JavaScript 库，使用函数式组件 (Functional Components) 和 Hooks (`useState`, `useEffect`, `useParams`) 管理状态。
* **Vite**: 下一代前端构建工具，提供秒级热更新 (HMR) 和极速打包体验。

### **路由管理 (Routing)**

* **React Router DOM (v6)**: 实现单页应用 (SPA) 的无刷新跳转。
* **嵌套路由 (Nested Routes)**: 用于 `Layout` 布局管理。
* **动态路由 (Dynamic Routing)**: 用于人物详情页 (`/spirit/people/:id`) 和景点详情页 (`/tours/:id`)。



### **样式与UI (Styling & UI)**

* **Tailwind CSS**: 原子化 CSS 框架，用于快速构建响应式布局、Flex/Grid 排版及自定义颜色系统（如森系绿、深空蓝）。
* **Ant Design (Antd)**: 企业级 UI 组件库，使用了 `Carousel` (轮播图)、`Tabs` (标签页)、`Dropdown` (下拉菜单) 等高级组件。
* **@ant-design/icons**: 配套的高质量 SVG 图标库。

### **动画与交互 (Animation)**

* **Framer Motion**: 生产级 React 动画库。
* 实现了**开屏幕布动画** (Preloader)。
* 实现了**滚动视差** (Scroll Reveal)。
* 实现了**地图弹窗**与**页面转场**效果。


* **Glassmorphism (CSS)**: 自定义毛玻璃拟态效果 (`backdrop-filter: blur`)，应用于导航栏和详情页。

---

## 2. 文件结构说明 (File Structure)

项目采用 **"功能分层"** 的目录结构，实现了**数据与视图分离** (Data-View Separation)，便于后期维护和内容更新。

```text
src/
├──  components/          # 【公共组件层】(全站通用的UI模块)
│   ├── Layout.jsx          # 布局容器：负责将 Navbar、Outlet、Footer 组合在一起
│   ├── Navbar.jsx          # 顶部导航：含毛玻璃特效、滚动变色逻辑、下拉菜单跳转
│   ├── ServiceEconomy.jsx         
│   ├── ScrollToTop.jsx          
│   ├── SilicaIndustry.jsx          
│   └── Footer.jsx          # 底部页脚：含品牌信息、快速链接、订阅交互
│
├──  pages/               # 【页面视图层】(各个路由对应的核心页面)
│   ├── Home.jsx            # 首页：含 Hero首屏、数据看板、各板块导流入口
│   ├── Spirit.jsx          # 治沙精神页：含“历史时间轴”和“英雄轮播/分栏展示”
│   ├── Industry.jsx        # 绿色产业页：含农/工/畜三列悬停卡片交互
│   ├── Tours.jsx           # 研学路线页：核心交互地图，支持红点呼吸灯与点击跳转
│   ├── TourDetail.jsx      # [动态] 景点详情页：展示景点大图、介绍及行程时间轴
│   ├── Activity.jsx
│   ├── ActivityDetail.jsx
│   ├── IndustryDetail.jsx
│   ├── PersonDetail.jsx    # [动态] 人物详情页：展示治沙英雄的详细事迹与语录
│   └── About.jsx           # 关于我们页：展示团队 Slogan、项目背景及成员介绍
│
├──  App.jsx              # 【总控中心】：配置所有路由路径，管理全站级开屏动画
├──  data.js              # 【数据中心】：模拟后端数据库，存储所有人物、景点、产业的 JSON 数据
├──  main.jsx             # 【入口文件】：React 应用挂载点，引入全局样式
└──  index.css            # 【全局样式】：Tailwind 指令引入及全局 CSS 重置

```

---

## 3.  开发环境与依赖 (Environment)

### **环境要求**

* **Node.js**: `v16.0.0` 或更高版本 (推荐 v18 LTS)。
* **包管理器**: `npm` (v8+) 或 `yarn`。
* **编辑器**: VS Code (推荐安装 ES7+ React Snippets, Tailwind CSS IntelliSense 插件)。
* **浏览器**: Chrome, Edge, Firefox (需支持 ES6+ 语法)。

### **核心依赖包 (package.json)**

你可以通过查看 `package.json` 确认以下版本：

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x.x",  // 路由核心
  "framer-motion": "^10.x.x",    // 动画核心
  "antd": "^5.x.x",              // UI组件
  "@ant-design/icons": "^5.x.x"  // 图标
},
"devDependencies": {
  "vite": "^4.x.x",
  "tailwindcss": "^3.x.x",
  "autoprefixer": "^10.x.x",
  "postcss": "^8.x.x"
}

```

---

## 4.  关键功能实现逻辑 (Key Features Logic)

1. **数据驱动视图 (Data-Driven)**:
* 我们没有把文字写死在 HTML 里，而是建立了 `data.js`。
* **优势**: 如果要修改英雄的名字或增加一个景点，不需要懂代码，直接改 `data.js` 里的 JSON 数据，页面会自动更新。


2. **动态路由 (Dynamic Routing)**:
* 利用 `:id` 参数（如 `path="tours/:id"`）。
* 当用户点击地图上的“章古台”时，URL 变为 `/tours/zhanggutai`。
* `TourDetail.jsx` 页面通过 `useParams()` 拿到 `zhanggutai` 这个 ID，去 `data.js` 里查找对应的数据并渲染。


3. **沉浸式开屏 (Immersive Preloader)**:
* 在 `App.jsx` 中使用 `useState(true)` 控制加载状态。
* 利用 `Framer Motion` 的 `<AnimatePresence>` 组件，在加载完成时执行 `exit` 动画（幕布上拉效果），实现了电影级的入场体验。


4. **交互式地图 (Interactive Map)**:
* 采用 **相对定位 (Percentage Positioning)** 技术。
* 地图上的红点坐标使用百分比 (`left: 68%, top: 25%`)，确保在手机端和电脑端，红点永远固定在地图的正确位置，不会错位。

