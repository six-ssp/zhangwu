import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Tabs, Carousel, ConfigProvider } from 'antd';
import { database } from '../data';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FlagOutlined, ExperimentOutlined, TeamOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';

// === 1. 极速版流沙组件 (CSS Animation + GPU Acceleration) ===
// 抛弃 Framer Motion，改用原生 CSS 动画，性能提升 10 倍
const SandStorm = () => {
  // 使用 useMemo 生成静态粒子数据，避免重复计算
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      size: Math.random() * 3 + 2, // 2-5px
      top: Math.random() * 100,
      duration: Math.random() * 10 + 10, // 10-20s (慢一点更优雅，且不卡)
      delay: Math.random() * -20, // 负延迟，让动画一开始就是铺满的
      opacity: Math.random() * 0.5 + 0.3,
      color: Math.random() > 0.5 ? '#b45309' : '#a16207', // hex 颜色 (yellow-700 / orange-800)
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden h-full">
      {/* 注入全局 Keyframes 样式 */}
      <style>
        {`
          @keyframes sandFly {
            0% { transform: translate3d(10vw, 0, 0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate3d(-110vw, 20px, 0); opacity: 0; }
          }
          .sand-particle {
            position: absolute;
            border-radius: 50%;
            will-change: transform; /* 告诉浏览器提前优化 */
            animation-name: sandFly;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>
      
      {particles.map((p, i) => (
        <div
          key={i}
          className="sand-particle"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.top}%`,
            left: '100%',
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 2px rgba(0,0,0,0.1)'
          }}
        />
      ))}
    </div>
  );
};

// === 2. Hero 区域 (保持视觉，减少重绘) ===
const SpiritHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // 减少视差移动距离，减轻计算压力
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-[90vh] w-full flex items-center justify-center z-10 will-change-transform">
       <motion.div style={{ y: yText, opacity: opacityText }} className="text-center px-6 max-w-6xl">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-6 inline-flex items-center gap-3 border border-green-800/20 bg-white/70 backdrop-blur-md px-6 py-2 rounded-full shadow-sm"
          >
             <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
             <span className="text-green-900 uppercase text-xs font-bold tracking-[0.2em]">Since 1952</span>
          </motion.div>

          <h1 className="flex flex-col items-center justify-center font-serif drop-shadow-sm">
             <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-6xl md:text-8xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-green-900 to-green-700"
             >
                绿进沙退
             </motion.span>
             <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl md:text-7xl font-bold italic tracking-tighter text-yellow-700/80 mix-blend-multiply mt-2"
             >
                誓叫荒漠变林海
             </motion.span>
          </h1>

          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="mt-8 text-xl md:text-2xl text-green-950 font-medium max-w-2xl mx-auto leading-relaxed"
          >
             七十载时光流转，三代人青春接力。<br/>
             看那郁郁葱葱的松林，是写在大地上的绿色史诗。
          </motion.p>

          <motion.div 
             className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 text-green-900/60 flex flex-col items-center gap-2"
             animate={{ y: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 2 }}
          >
             <span className="text-[10px] tracking-widest uppercase font-bold">Scroll Down</span>
             <DownOutlined />
          </motion.div>
       </motion.div>
    </div>
  );
};

// === 3. 主页面组件 ===
const Spirit = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || 'history';
  const [activeTab, setActiveTab] = useState(initialTab);

  const partyHeroes = database.heroes.filter(h => h.category === 'party');
  const scienceHeroes = database.heroes.filter(h => h.category === 'science');
  const publicHeroes = database.heroes.filter(h => h.category === 'public');

  // 历史脉络卡片
  const HistorySection = () => (
    <div className="py-12 max-w-5xl mx-auto">
      <div className="relative border-l-2 border-green-900/10 ml-6 md:ml-32 space-y-24 pl-8 md:pl-20 py-8">
        
        {/* 1952 */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} className="relative group">
            <span className="absolute -left-[41px] md:-left-[91px] top-2 w-5 h-5 bg-yellow-600 rounded-full border-4 border-[#eef5ed] shadow-md z-10"></span>
            <span className="hidden md:block absolute -left-[240px] top-0 w-[140px] text-right">
               <span className="text-5xl font-serif font-bold text-green-900 block">1952</span>
               <span className="text-xs text-green-800/60 uppercase tracking-widest">Start Point</span>
            </span>
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform translate-z-0">
               <span className="md:hidden text-3xl font-serif font-bold text-green-800 block mb-4">1952</span>
               <h3 className="text-2xl font-bold text-green-900 mb-4">设治沙机构，向黄沙宣战</h3>
               <p className="text-green-950/80 leading-relaxed text-lg text-justify">
                  彰武县成立了全省第一个治沙造林机构——彰武县林场。第一代治沙人背着树苗，住进地窝子，面对的是“狂风吹散屋顶，黄沙掩埋农田”的绝境。
               </p>
               <div className="mt-6 overflow-hidden rounded-2xl shadow-lg w-full h-72 relative transform translate-z-0">
                   <img src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=600" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="1952"/>
               </div>
            </div>
        </motion.div>

        {/* 1990 */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} className="relative group">
            <span className="absolute -left-[41px] md:-left-[91px] top-2 w-5 h-5 bg-green-600 rounded-full border-4 border-[#eef5ed] shadow-md z-10"></span>
            <span className="hidden md:block absolute -left-[240px] top-0 w-[140px] text-right">
               <span className="text-5xl font-serif font-bold text-green-900 block">1990</span>
               <span className="text-xs text-green-800/60 uppercase tracking-widest">Technology</span>
            </span>
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform translate-z-0">
               <span className="md:hidden text-3xl font-serif font-bold text-green-600 block mb-4">1990</span>
               <h3 className="text-2xl font-bold text-green-900 mb-4">攻克技术难关，樟子松引种成功</h3>
               <p className="text-green-950/80 leading-relaxed text-lg text-justify">
                  以董福财为代表的科研人员，突破了流动沙丘造林成活率低的难题。樟子松成功扎根，彰武成为全国著名的“樟子松故乡”。
               </p>
            </div>
        </motion.div>

        {/* 2025 */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} className="relative group">
            <span className="absolute -left-[41px] md:-left-[91px] top-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-[#eef5ed] shadow-md z-10"></span>
            <span className="hidden md:block absolute -left-[240px] top-0 w-[140px] text-right">
               <span className="text-5xl font-serif font-bold text-green-900 block">2025</span>
               <span className="text-xs text-green-800/60 uppercase tracking-widest">Eco-Tourism</span>
            </span>
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-300 transform translate-z-0">
               <span className="md:hidden text-3xl font-serif font-bold text-blue-600 block mb-4">2025</span>
               <h3 className="text-2xl font-bold text-green-900 mb-4">全域旅游，绿水青山就是金山银山</h3>
               <p className="text-green-950/80 leading-relaxed text-lg text-justify">
                  从“以树挡沙”向“以光锁沙”、“以草固沙”的新模式转变。森林覆盖率达到 34.5%，昔日沙海变身今日绿洲，生态旅游蓬勃发展。
               </p>
               <div className="mt-6 overflow-hidden rounded-2xl shadow-lg w-full h-72 relative transform translate-z-0">
                   <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="2025"/>
               </div>
            </div>
        </motion.div>
      </div>
    </div>
  );

  const HeroCard = ({ hero, colorClass, icon }) => (
    <div 
      onClick={() => navigate(`/spirit/people/${hero.id}`)}
      className="group cursor-pointer bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6 flex items-start gap-5 transform translate-z-0"
    >
       <div className="w-16 h-16 flex-shrink-0">
          <img src={hero.avatar} className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform" alt={hero.name}/>
       </div>
       <div className="flex-grow">
         <div className="flex justify-between items-start mb-2">
             <div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-green-700 transition-colors tracking-wide">{hero.name}</h3>
                <p className={`text-xs font-bold uppercase tracking-wider ${colorClass}`}>{hero.title}</p>
             </div>
             <div className="text-gray-400 text-xl group-hover:text-green-600 transition-colors">{icon}</div>
         </div>
         <p className="text-gray-500 text-sm italic line-clamp-2">“{hero.quote}”</p>
         <div className="mt-4 flex items-center gap-1 text-xs text-gray-400 group-hover:text-green-800 transition-colors justify-end font-bold">
            查看详情 <RightOutlined className="text-[10px]"/>
         </div>
       </div>
    </div>
  );

  const SectionContainer = ({ title, sub, icon, color, heroes }) => (
    <div className="mb-20">
       <div className="flex items-center gap-4 mb-8 border-b border-green-900/10 pb-4">
          <div className={`text-2xl ${color.replace('bg-', 'text-')}`}>{icon}</div>
          <div>
             <h2 className="text-2xl font-serif font-bold text-slate-900">{title}</h2>
             <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">{sub}</p>
          </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.length > 0 ? (
             heroes.map(hero => (
               <HeroCard key={hero.id} hero={hero} colorClass={color.replace('bg-', 'text-')} icon={icon} />
             ))
          ) : (
             <p className="text-gray-400">暂无数据...</p>
          )}
       </div>
    </div>
  );

  const PeopleSection = () => (
    <div className="pb-12">
      <div className="mb-20 rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white transform translate-z-0">
        <Carousel autoplay effect="fade">
          {[
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200", 
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200"
          ].map((src, i) => (
             <div key={i} className="relative h-[400px]">
                <img src={src} className="w-full h-full object-cover" alt={`slide-${i}`}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-serif font-bold mb-2">{i===0 ? "英雄群像" : "薪火相传"}</h2>
                    <p className="opacity-90">{i===0 ? "铭记每一位为这片绿洲奉献青春的人" : "从第一代治沙人到新时代护林员"}</p>
                </div>
             </div>
          ))}
        </Carousel>
      </div>
      <div className="max-w-6xl mx-auto">
        <SectionContainer title="党员先锋" sub="The Vanguard" icon={<FlagOutlined />} color="bg-red-600" heroes={partyHeroes}/>
        <SectionContainer title="科研脊梁" sub="Scientific Backbone" icon={<ExperimentOutlined />} color="bg-blue-600" heroes={scienceHeroes}/>
        <SectionContainer title="民众力量" sub="Power of People" icon={<TeamOutlined />} color="bg-orange-500" heroes={publicHeroes}/>
      </div>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#166534',
          fontFamily: 'serif',
        },
      }}
    >
      {/* 优化要点：
         1. 移除了 bg-fixed (导致重绘)。
         2. 改用 position: fixed 的 div 来放背景图，z-index: -1。
         3. 这种方式兼容性最好，且性能最高 (GPU层)。
      */}
      <div className="min-h-screen relative font-sans selection:bg-green-200 selection:text-green-900">
        
        {/* 固定背景层 (GPU Accelerated) */}
        <div className="fixed inset-0 z-[-1] will-change-transform transform translate-z-0">
            <img 
              src="/shenlin.jpg"
              className="w-full h-full object-cover opacity-100"
              alt="Lush Forest"
            />
            {/* 透光遮罩 */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-[#eef5ed]/90"></div>
        </div>

        {/* 优化的流沙层 */}
        <SandStorm />

        {/* 滚动内容区 */}
        <div className="relative z-10 pb-20">
           <SpiritHero />

           <div className="max-w-7xl mx-auto px-6">
              <Tabs 
                activeKey={activeTab} 
                onChange={(key) => setActiveTab(key)}
                centered 
                size="large"
                className="custom-tabs"
                items={[
                  { key: 'history', label: '历史脉络', children: <HistorySection /> },
                  { key: 'people', label: '杰出代表', children: <PeopleSection /> },
                ]}
              />
           </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Spirit;