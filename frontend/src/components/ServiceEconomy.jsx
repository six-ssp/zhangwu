import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShopOutlined, RocketOutlined, CarOutlined, ArrowDownOutlined, CheckCircleFilled, HeartFilled, FireFilled } from '@ant-design/icons';

// === 1. 纯 CSS 爱心气泡 (保留，轻量且好看) ===
const FloatingHearts = () => {
  const hearts = [1, 2, 3, 4, 5]; 
  return (
    <div className="absolute bottom-20 right-4 w-20 h-60 pointer-events-none overflow-hidden z-20">
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(100%) scale(0.5); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(-150%) scale(1); opacity: 0; }
          }
          .heart-particle {
            position: absolute;
            bottom: 0;
            left: 50%;
            font-size: 24px;
            animation: floatUp 4s infinite ease-in-out;
            will-change: transform, opacity;
          }
        `}
      </style>
      {hearts.map((_, i) => (
        <div
          key={i}
          className="heart-particle"
          style={{
            color: i % 2 === 0 ? '#ff4d4f' : '#ff7a45',
            animationDelay: i * 0.8 + 's',
            marginLeft: (i % 2 === 0 ? -1 : 1) * 10 + 'px'
          }}
        >
          <HeartFilled />
        </div>
      ))}
    </div>
  );
};

// === 主组件 ===
const ServiceEconomy = ({ data }) => {
  const ecommerceRef = useRef(null);
  const logisticsRef = useRef(null);
  const tourismRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 数据安全获取
  const sections = (data && data.sections) ? data.sections : [];
  
  const getSection = (index) => {
    if (sections && sections[index]) {
      return sections[index];
    }
    return { items: [], title: 'Loading...', desc: '', tag: '' };
  };

  const section1 = getSection(0);
  const section2 = getSection(1);
  const section3 = getSection(2);

  const navItems = [
    { ref: ecommerceRef, icon: <ShopOutlined />, title: "电商助农", color: "from-orange-400 to-red-500", sub: "Live Streaming", shadow: "shadow-orange-200" },
    { ref: logisticsRef, icon: <RocketOutlined />, title: "智慧物流", color: "from-blue-400 to-cyan-500", sub: "Smart Logistics", shadow: "shadow-blue-200" },
    { ref: tourismRef, icon: <CarOutlined />, title: "文旅融合", color: "from-emerald-400 to-green-600", sub: "Cultural Tourism", shadow: "shadow-green-200" }
  ];

  return (
    <div className="w-full bg-slate-50 overflow-hidden">
      
      {/* === Hero 区域 === */}
      <div 
        className="min-h-[95vh] flex flex-col items-center justify-center px-6 relative"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #fff 0%, #f1f5f9 100%)'
        }}
      >
         {/* 静态装饰光晕 (性能极高) */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-200/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[100px]"></div>
         </div>

         <div className="text-center mb-16 max-w-5xl relative z-10">
            <div className="inline-block px-4 py-1 rounded-full border border-slate-200 bg-white/60 backdrop-blur-sm text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">
               Tertiary Industry Upgrade
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-6 leading-tight"
            >
               数字赋能 <br className="md:hidden"/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-purple-600">
                 城乡万象
               </span>
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-slate-600 font-light max-w-3xl mx-auto">
               从田间地头到云端秀场，彰武正在上演一场
               <span className="font-bold text-slate-800 mx-1">速度</span>、
               <span className="font-bold text-slate-800 mx-1">热度</span>与
               <span className="font-bold text-slate-800 mx-1">温度</span>的产业变革。
            </p>
         </div>

         {/* 导航卡片 (加回了 3D 悬浮感) */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl relative z-10">
            {navItems.map((item, i) => (
              <div
                key={i}
                onClick={() => scrollToSection(item.ref)}
                className="group cursor-pointer relative bg-white rounded-[2rem] p-1 shadow-xl hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
              >
                 <div className="h-full bg-white rounded-[1.8rem] p-8 flex flex-col items-center text-center border border-slate-50 relative overflow-hidden">
                    {/* 顶部彩色装饰条 */}
                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${item.color}`}></div>
                    
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                       {item.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
                       {item.sub}
                    </p>
                    
                    <div className="mt-6 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-transparent transition-colors duration-300">
                       <ArrowDownOutlined className="-rotate-90 group-hover:rotate-0 transition-transform duration-300"/>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* === Section 1: 电商 (复活手机直播 UI) === */}
      <div ref={ecommerceRef} className="py-24 relative bg-white overflow-hidden">
         {/* 背景斜切色块 */}
         <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 -skew-x-12 translate-x-1/4 z-0"></div>

         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase mb-6">
                  <FireFilled /> Hottest Trend
               </span>
               <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">{section1.title}</h2>
               <p className="text-lg text-slate-600 leading-relaxed mb-8">{section1.desc}</p>
               
               <div className="flex gap-6">
                  <div className="p-4 rounded-2xl bg-white border border-orange-100 shadow-sm">
                     <div className="text-2xl font-black text-orange-500">10W+</div>
                     <div className="text-xs text-slate-500 font-bold">日均观看</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-red-100 shadow-sm">
                     <div className="text-2xl font-black text-red-500">5000+</div>
                     <div className="text-xs text-slate-500 font-bold">日均订单</div>
                  </div>
               </div>
            </motion.div>

            <div className="relative flex justify-center">
               {/* 手机框：加回边框和阴影 */}
               <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden z-10 transform hover:scale-105 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1592591681282-359f137357c2?q=80&w=600" className="w-full h-full object-cover opacity-90" alt="Live"/>
                  <FloatingHearts />
                  
                  {/* 直播 UI 覆盖层 */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 flex flex-col justify-between p-5 pointer-events-none">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full border border-orange-500 bg-gray-500 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" className="w-full h-full object-cover"/>
                         </div>
                         <div>
                            <div className="text-white text-xs font-bold">彰武好物推荐官</div>
                            <div className="flex items-center gap-1 text-[10px] text-white/80">
                               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> 直播中
                            </div>
                         </div>
                         <button className="ml-auto bg-orange-500 text-white text-[10px] px-3 py-1 rounded-full font-bold">关注</button>
                      </div>

                      <div className="space-y-2">
                         <div className="bg-black/30 backdrop-blur-md rounded-lg p-2 text-white text-xs inline-block">
                            <span className="text-orange-300 font-bold">用户882:</span> 这地瓜真甜！🍠
                         </div>
                         <div className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-full text-center shadow-lg mt-2 text-sm">
                            立即购买 (¥29.9)
                         </div>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* === Section 2: 物流 (复活动态流线 - 纯 CSS 版) === */}
      <div ref={logisticsRef} className="py-24 bg-[#0f172a] relative overflow-hidden text-white">
         {/* 1. 动态 CSS 流线动画 (不占 JS 线程) */}
         <div className="absolute inset-0 z-0 opacity-40">
            <style>
               {`
                  @keyframes dash {
                     to { stroke-dashoffset: -1000; }
                  }
                  .path-animation {
                     stroke-dasharray: 20 20;
                     animation: dash 20s linear infinite;
                     will-change: stroke-dashoffset;
                  }
               `}
            </style>
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
               <path d="M-100,600 C300,300 800,500 1540,200" stroke="#3b82f6" strokeWidth="2" className="path-animation" />
               <path d="M-100,200 C400,600 900,300 1540,600" stroke="#0ea5e9" strokeWidth="2" className="path-animation" style={{ animationDuration: '25s' }} />
            </svg>
         </div>
         
         {/* 静态网格背景 */}
         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#334155_1px,transparent_1px),linear-gradient(90deg,#334155_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
               <div className="relative">
                  {/* 图片发光效果 */}
                  <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-20"></div>
                  <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800" className="relative rounded-2xl border border-white/10 shadow-2xl z-10" alt="Logistics"/>
                  
                  {/* 悬浮数据卡片 */}
                  <div className="absolute -right-4 -bottom-4 bg-slate-800/90 backdrop-blur border border-blue-500/30 p-4 rounded-xl shadow-xl z-20 hidden md:block">
                     <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] text-blue-300 uppercase tracking-widest">Connected</span>
                     </div>
                     <div className="text-sm text-slate-300">覆盖全县 182 个行政村</div>
                  </div>
               </div>
            </motion.div>
            <div>
               <span className="text-blue-400 font-bold tracking-widest uppercase mb-4 block text-sm">Intelligent Network</span>
               <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  快递进村<br/><span className="text-cyan-400">打通最后一公里</span>
               </h2>
               <p className="text-lg text-slate-300 leading-relaxed mb-8">{section2.desc}</p>
               <div className="space-y-3">
                  {section2.items && section2.items.map((item, i) => (
                     <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                        <RocketOutlined className="text-blue-400"/>
                        <span className="font-bold">{item}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* === Section 3: 旅游 (复活拍立得堆叠效果) === */}
      <div ref={tourismRef} className="py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{section3.title}</h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">{section3.desc}</p>
            </div>
            
            {/* 拍立得照片堆叠布局 */}
            <div className="relative h-[500px] w-full flex justify-center items-center">
               
               {/* 左侧照片 */}
               <div 
                  className="absolute z-10 transform -rotate-6 -translate-x-32 hover:z-50 hover:scale-110 hover:rotate-0 transition-all duration-500 cursor-pointer"
               >
                  <div className="bg-white p-3 pb-12 shadow-xl w-64 border border-gray-200">
                     <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400" className="w-full h-48 object-cover grayscale-0" alt="img"/>
                     <div className="absolute bottom-4 left-4 font-mono text-slate-500 font-bold"># Farm Food</div>
                  </div>
               </div>

               {/* 中间照片 (大) */}
               <div 
                  className="absolute z-20 transform hover:z-50 hover:scale-110 transition-all duration-500 cursor-pointer"
               >
                  <div className="bg-white p-4 pb-16 shadow-2xl w-80 border border-gray-200">
                     <img src="https://images.unsplash.com/photo-1533659828570-3692fb4749da?q=80&w=500" className="w-full h-64 object-cover" alt="img"/>
                     <div className="absolute bottom-6 left-0 w-full text-center font-serif text-xl text-slate-800 font-bold">漠上草原之旅</div>
                  </div>
               </div>

               {/* 右侧照片 */}
               <div 
                  className="absolute z-10 transform rotate-6 translate-x-32 hover:z-50 hover:scale-110 hover:rotate-0 transition-all duration-500 cursor-pointer"
               >
                  <div className="bg-white p-3 pb-12 shadow-xl w-64 border border-gray-200">
                     <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=400" className="w-full h-48 object-cover" alt="img"/>
                     <div className="absolute bottom-4 left-4 font-mono text-slate-500 font-bold"># Camping</div>
                  </div>
               </div>
               
               {/* 装饰表情 */}
               <div className="absolute bottom-10 right-1/4 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🌿</div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ServiceEconomy;