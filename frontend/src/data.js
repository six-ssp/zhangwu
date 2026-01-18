// src/data.js
// 这个文件是全站的“内容仓库”，以后修改文字直接来这里找

export const database = {
    // === 1. 治沙英雄数据 (Spirit板块) ===
    heroes: [
      // --- 党员先锋 ---
      {
        id: "liubin",
        category: "party", // 新增字段：party=党员, science=科研, public=民众
        name: "刘斌",
        title: "第一任治沙局长",
        tags: ["党员先锋", "拓荒者"],
        avatar: "/liubin.jpg", 
        quote: "如果不把沙治住，就让沙把我们埋掉。",
        content: "<p>这里是刘斌的详细事迹...</p>"
      },
      {
        id: "wangzhan",
        category: "party",
        name: "王战", // 虚构示例
        title: "治沙突击队队长",
        tags: ["党旗飘扬", "冲锋在前"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
        quote: "哪里最苦，哪里就有共产党员。",
        content: "<p>详细事迹...</p>"
      },
  
      // --- 科研脊梁 ---
      {
        id: "dongfucai",
        category: "science",
        name: "董福财",
        title: "林业专家 / 治沙愚公",
        tags: ["科研攻坚", "樟子松之父"],
        avatar: "/dongfucai.jpg",
        quote: "一生只做一件事，把论文写在大地上。",
        content: "<p>详细事迹...</p>"
      },
      {
        id: "liscientist",
        category: "science",
        name: "李教授", // 虚构示例
        title: "土壤改良专家",
        tags: ["科技兴林", "创新"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
        quote: "用科学战胜风沙。",
        content: "<p>详细事迹...</p>"
      },
  
      // --- 民众力量 ---
      {
        id: "houguimin",
        category: "public",
        name: "侯贵敏",
        title: "治沙女杰",
        tags: ["巾帼英雄", "坚守"],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
        quote: "为了子孙后代，这树必须种活。",
        content: "<p>详细事迹...</p>"
      },
      {
        id: "zhangsan",
        category: "public",
        name: "老张头", // 虚构示例
        title: "护林员",
        tags: ["默默奉献", "守护"],
        avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400",
        quote: "看着树长大，就像看着孩子长大。",
        content: "<p>详细事迹...</p>"
      },
    ],
  
    // === 2. 产业数据 (Industry板块) ===
    industries: [
      {
        id: "primary", // 第一产业
        title: "沙地生金 · 生态农业",
        subtitle: "Ecological Agriculture",
        summary: "依托独特的沙地土壤，打造高品质农产品。", // 入口页显示的短语
        img: "/shengtainongye.jpg",
        color: "green", // 主题色
        // 详情页的长文介绍 (支持HTML)
        content: `
          <p>彰武县地处科尔沁沙地南部，曾经是“风沙蔽日”的贫瘠之地。然而，彰武人并没有被恶劣的自然条件吓倒，而是利用沙地透气性好、昼夜温差大的特点，发展出了独具特色的沙地农业。</p>
          <h3>沙地红薯：甜蜜的奇迹</h3>
          <p>彰武沙地红薯口感细腻、甜度高，已成为国家地理标志保护产品。每年秋季，红薯丰收的景象成为了沙地上一道金色的风景线。</p>
          <h3>林下经济：生态与经济双赢</h3>
          <p>依托百万亩松林资源，大力发展赤松茸等林下菌类种植，既保护了生态，又鼓起了农民的钱袋子。</p>
        `,
        // 该产业下的商品/助农链接
        products: [
          { name: "彰武沙地蜜薯", price: "¥29.9 / 5斤", img: "/digua.jpg", link: "#" },
          { name: "林下赤松茸", price: "¥58.0 / 斤", img: "/songrong.jpg", link: "#" },
          { name: "有机花生油", price: "¥89.0 / 桶", img: "/you.jpg", link: "#" }
        ]
      },
      {
        id: "secondary", // 第二产业
        title: "点沙成金 · 硅砂工业",
        subtitle: "Silica Sand Industry",
        summary: "世界级铸造砂基地，变废为宝的工业奇迹。",
        img: "/guishacahnye.jpg",
        color: "blue",
        content: `
          <p>彰武县拥有丰富的天然硅砂资源，储量大、品质优。过去，这些沙子是风沙灾害的源头；现在，它们成为了工业生产的“金沙”。</p>
          <h3>铸造用砂的世界名片</h3>
          <p>彰武硅砂具有耐高温、复用率高等特点，被广泛应用于汽车发动机、航空航天等高端铸造领域。目前，彰武已成为全国最大的天然硅砂生产基地。</p>
          <h3>全产业链发展</h3>
          <p>从原砂开采到覆膜砂加工，再到3D打印砂型，彰武正在构建一条完整的硅砂产业链，实现了从“卖资源”到“卖技术”的华丽转身。</p>
        `,
        companies: [
          {
            id: 1,
            name: "彰武硅砂集团",
            logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100", // 替换为真实 Logo
            front: {
              desc: "全国最大的天然硅砂开采与加工企业，拥有三大核心矿区。",
              tag: "龙头企业"
            },
            back: {
              product: "高精密铸造砂",
              capacity: "年产 200 万吨",
              partner: "一汽、宝马供应链"
            }
          },
          {
            id: 2,
            name: "联信铸造砂业",
            logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=100",
            front: {
              desc: "专注于覆膜砂技术研发，拥有国家级实验室。",
              tag: "技术创新"
            },
            back: {
              product: "耐高温覆膜砂",
              capacity: "专利技术 15 项",
              partner: "航空航天部件铸造"
            }
          },
          {
            id: 3,
            name: "永红机械制造",
            logo: "https://images.unsplash.com/photo-1622675363311-ac22f5e9ce1c?q=80&w=100",
            front: {
              desc: "利用硅砂废料进行3D打印砂型生产，实现零排放。",
              tag: "绿色循环"
            },
            back: {
              product: "3D打印砂型",
              capacity: "智能制造车间",
              partner: "高端定制模具"
            }
          },
          {
            id: 4,
            name: "宏图精工",
            logo: "https://images.unsplash.com/photo-1574681615838-8c5054bd794c?q=80&w=100",
            front: {
              desc: "专注于出口级硅砂产品，远销日韩及东南亚。",
              tag: "出口先锋"
            },
            back: {
              product: "高目数擦洗砂",
              capacity: "出口份额 40%",
              partner: "丰田、本田"
            }
          },
          {
            id: 5,
            name: "大漠建材",
            logo: "https://images.unsplash.com/photo-1517089152318-42ec560349c0?q=80&w=100",
            front: {
              desc: "将风积沙转化为高强度透水砖，助力海绵城市建设。",
              tag: "变废为宝"
            },
            back: {
              product: "生态透水砖",
              capacity: "年铺设 50 万平",
              partner: "市政工程指定供应商"
            }
          }
        ],
        products: [
          { name: "精制铸造砂样", price: "展示品", img: "https://images.unsplash.com/photo-1605557202138-097824c3f5c4?q=80&w=400", link: "#" },
          { name: "硅砂工艺品", price: "¥128.0", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400", link: "#" }
        ]
      },
      {
        id: "tertiary", // 第三产业
        title: "绿水青山 · 全域旅游",
        subtitle: "Ecological Tourism",
        summary: "漠上草原，康养胜地，体验治沙精神之旅。",
        img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000",
        color: "orange",
        content: `
          <p>随着生态环境的改善，彰武县将治沙成果转化为旅游资源，大力发展全域旅游。</p>
          <h3>漠上草原</h3>
          <p>在昔日的流动沙丘上，如今生长着茂盛的草场。游客在这里可以体验骑马、射箭、住蒙古包的草原风情。</p>
          <h3>红色研学</h3>
          <p>以章古台林场为核心，打造了多条红色研学路线，让游客在游览中感悟“大漠孤烟”变“绿洲新生”的治沙精神。</p>
        `,
        products: [
          { name: "草原景区门票", price: "¥40.0", img: "/caoyuanjingqu.jpg", link: "#" },
          { name: "研学团预约", price: "咨询客服", img: "/yuyue.jpg", link: "#" }
        ]
      }
    ],
  
    // === 3. 团队信息 (About板块) ===
    team: {
      slogan: "以数字技术赋能乡村振兴",
      // 1. 团队介绍文案 (融合旗帜含义)
      intro: {
        title: "旗帜的颜色，是生命的底色",
        content: `我们的队旗以“生态绿”为主色调，象征着彰武治沙七十载在大漠中播种的希望。
        旗帜中央的校徽代表着大连理工大学“海纳百川”的胸怀，而周围环绕的金色麦穗与绿色波浪，
        寓意着我们从渤海之滨来到科尔沁沙地，用青春和汗水，誓将“瀚海”变“绿洲”。
        这面旗帜，不仅是团队的象征，更是“守绿传薪”精神的具象化。`
      },
      // 2. 成员数据 (扩充到10人，建议找点帅气/漂亮的真实照片或者风景照代替)
      members: [
        { id: 1, name: "王泽祥", role: "队长 / 统筹", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600", desc: "把舵定向，带领团队穿越风沙。" },
        { id: 2, name: "刘畅", role: "技术负责人", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600", desc: "用代码构建数字绿洲。" },
        { id: 3, name: "李子豪", role: "UI 设计", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600", desc: "描绘治沙精神的最美画卷。" },
        { id: 4, name: "魏龙城", role: "文案策划", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600", desc: "用文字记录每一份感动。" },
        { id: 5, name: "张圣铭", role: "摄影纪实", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600", desc: "定格光影中的绿色奇迹。" },
        { id: 6, name: "刘腾予", role: "外联公关", img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600", desc: "连接校内外的沟通桥梁。" },
        { id: 7, name: "冯才瑞", role: "调研组长", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600", desc: "行走在沙地上的丈量者。" },
        { id: 8, name: "焦冰和", role: "财务后勤", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600", desc: "团队坚实的后盾保障。" },
        { id: 9, name: "哈哈哈", role: "新媒体", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600", desc: "让治沙故事传得更远。" },
        { id: 10, name: "小6猪", role: "数据分析", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=600", desc: "从数据中挖掘生态价值。" },
      ],
      // 3. 过往活动 (Events)
      activities: [
        { date: "2024.07", title: "初识大漠", desc: "团队抵达彰武，参观治沙精神纪念馆，确立调研课题。", img: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=600" },
        { date: "2024.08", title: "深入林场", desc: "深入章古台林场，对话第一代治沙人，记录口述历史。", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600" },
        { date: "2024.12", title: "成果汇报", desc: "完成社会实践报告，获得校级优秀团队称号。", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600" },
      ]
    },
  tours: [
      { 
        id: "zhanggutai", 
        name: "章古台林场", 
        x: 68, y: 25, // 坐标还是需要的，画地图用
        type: "林海", 
        img: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800", 
        desc: "万亩松林核心区，治沙精神发源地",
        // 下面是详情页专用的长内容
        intro: "这里是彰武治沙的起点，拥有亚洲最大的人工樟子松林。置身其中，听松涛阵阵，感悟一代代治沙人与天斗、与地斗的英雄气概。",
        features: ["万亩松林", "瞭望塔", "治沙纪念馆"],
        itinerary: [
          { time: "09:00", activity: "抵达林场，参观治沙精神纪念馆" },
          { time: "10:30", activity: "徒步松林栈道，登瞭望塔俯瞰绿洲" },
          { time: "12:00", activity: "品尝林场特色农家饭" }
        ]
      },
      { 
        id: "daleng", 
        name: "大冷乡", 
        x: 42, y: 35, 
        type: "草原", 
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800", 
        desc: "漠上草原风景区，体验独特沙地风情",
        intro: "大冷乡拥有独特的沙地草原地貌，牛羊成群，风吹草低。这里不仅能看到从前的沙地遗迹，更能看到生态恢复后的勃勃生机。",
        features: ["草原骑马", "蒙古包体验", "篝火晚会"],
        itinerary: [
          { time: "14:00", activity: "草原漫步，体验骑马射箭" },
          { time: "16:00", activity: "走访牧民家庭，了解生态养殖" },
          { time: "19:00", activity: "参加草原篝火晚会" }
        ]
      },
      { 
        id: "zhangwutown", 
        name: "彰武镇", 
        x: 55, y: 70, 
        type: "人文", 
        img: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800", 
        desc: "县政府所在地，历史与现代交融",
        intro: "作为全县的政治经济中心，彰武镇见证了这座城市的变迁。这里有热闹的市集、完善的设施，是研学旅行的最佳中转站。",
        features: ["城市漫步", "特色美食", "历史建筑"],
        itinerary: [
          { time: "全天", activity: "游览县城，品尝彰武地瓜、烘糕等特产" }
        ]
      },
      { 
        id: "liuhe", 
        name: "柳河湿地", 
        x: 30, y: 55, 
        type: "湿地", 
        img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800", 
        desc: "候鸟迁徙停歇地，生态摄影天堂",
        intro: "柳河蜿蜒流淌，形成了大片的湿地生态系统。每年春秋两季，成千上万的候鸟在此停歇，是摄影爱好者和自然观察者的天堂。",
        features: ["观鸟拍摄", "湿地科普", "日落景观"],
        itinerary: [
          { time: "16:00", activity: "抵达湿地公园，进行鸟类观察" },
          { time: "17:30", activity: "拍摄柳河日落壮美景色" }
        ]
      },
    ]
  };