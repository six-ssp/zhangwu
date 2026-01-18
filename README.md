# 🌲 瀚海筑梦 · 守绿传薪 (Zhangwu Antidesertification Project)

> **大连理工大学盘锦校区 · 社会实践团**
> 以数字技术赋能乡村振兴，记录彰武治沙七十载的绿色奇迹。

## 📖 项目简介 (Introduction)

本项目是一个现代化的响应式 Web 应用，旨在全方位展示辽宁省彰武县“大漠变绿洲”的治沙历史与生态建设成果。通过沉浸式的交互体验，不仅记录了从“沙进人退”到“绿进沙退”的历史跨越，更展示了当前的绿色产业体系与全域旅游研学路线。

项目采用 **React + Vite** 构建，注重视觉体验与交互细节，包含动态路由、交互式地图、时间轴动画等高级功能。

## ✨ 核心功能 (Key Features)

### 1. 🏠 沉浸式首页 (Immersive Home)
- **电影级开屏动画**：深色幕布拉起效果，配合 "ZHANGWU" 巨型排版，营造史诗感。
- **数据可视化看板**：展示森林覆盖率、造林面积等核心指标。
- **全屏 Hero 展示**：视差滚动背景与动态标题。

### 2. 🔥 治沙精神 (Spirit of Zhangwu)
- **双视图切换**：支持“历史脉络”与“杰出代表”无缝切换。
- **历史时光轴**：以绿色线条贯穿 1952-2025 年的关键治沙节点。
- **英雄群像轮播**：顶部大图轮播，致敬治沙英雄。
- **分类展示**：自动将人物分为“党员先锋”、“科研脊梁”、“民众力量”三大板块。
- **动态详情页**：点击人物卡片进入专属详情页，展示生平与金句。

### 3. 🗺️ 研学导览 (Interactive Tours)
- **交互式地图**：基于真实地理轮廓的 SVG/PNG 地图，支持鼠标悬停预览。
- **呼吸灯交互**：地图标记点具有呼吸闪烁效果，点击可跳转。
- **路线详情页**：包含高清大图、核心看点标签及时间轴式的行程规划。

### 4. 🏭 绿色产业 (Green Industry)
- **三列悬停卡片**：展示农业、工业、畜牧业三大支柱。
- **毛玻璃特效**：鼠标悬停时背景放大，文字上浮，极具质感。

### 5. 🎨 现代化 UI/UX
- **毛玻璃导航栏**：顶部导航栏随页面滚动自动切换为磨砂玻璃效果。
- **响应式设计**：完美适配 PC 端与移动端。
- **数据驱动**：所有核心数据（人物、景点、产业）统一管理，便于维护。

## 🛠️ 技术栈 (Tech Stack)

* **核心框架**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **路由管理**: [React Router DOM v6](https://reactrouter.com/) (支持嵌套与动态路由)
* **UI 组件库**: [Ant Design](https://ant.design/) (Carousel, Tabs, Dropdown)
* **样式处理**: [Tailwind CSS](https://tailwindcss.com/) (原子化 CSS)
* **动画效果**: [Framer Motion](https://www.framer.com/motion/) (页面转场与元素动画)
* **图标库**: @ant-design/icons

## 🚀 快速开始 (Getting Started)

### 1. 克隆项目
```bash
git clone [https://github.com/YourUsername/zhangwu-project.git](https://github.com/YourUsername/zhangwu-project.git)
cd zhangwu-project
