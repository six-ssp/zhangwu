import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShopOutlined, RocketOutlined, CarOutlined, ArrowDownOutlined, CheckCircleFilled, HeartFilled, LikeFilled, FireFilled } from '@ant-design/icons';

// === 1. 动态背景光斑组件 ===
const BackgroundBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div 
      animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-orange-300/30 rounded-full blur-[100px]"
    />
    <motion.div 
      animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute top-[20%] right-[0%] w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[100px]"
    />
    <motion.div 
      animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-green-300/20 rounded-full blur-[120px]"
    />
  </div>
);

// === 2. 漂浮爱心动画 (直播间效果) ===
const FloatingHearts = () => {
  const hearts = Array.from({ length: 8 });
  return (
    <div className="absolute bottom-20 right-4 w-20 h-60 pointer-events-none overflow-hidden z-20">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100, x: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: -200, 
            x: Math.sin(i) * 20, // 左右摇摆
            scale: [0.5, 1, 0.8] 
          }}
          transition={{ 
            duration: 2 + Math.random(), 
            repeat: Infinity, 
            delay: Math.random() * 2,
            ease: "easeOut" 
          }}
          className="absolute bottom-0 left-1/2 text-2xl"
          style={{ color: ['#ff4d4f', '#ff7a45', '#ffc53d'][i % 3] }}
        >
          <HeartFilled />
        </motion.div>
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
   if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    
  };

  const sections = (data && data.sections) ? data.sections : [];
  const getSection = (index) => sections[index] || { items: [] };
  const section1 = getSection(0);
  const section2 = getSection(1);
  const section3 = getSection(2);

  // 滚动视差控制
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="w-full bg-slate-50 overflow-hidden">
      
      {/* === Hero Navigation (更加绚丽) === */}
      <div className="min-h-[95vh] flex flex-col items-center justify-center px-6 relative bg-white/50 backdrop-blur-3xl">
         <BackgroundBlobs />
         
         <div className="text-center mb-20 max-w-5xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full border border-slate-200 bg-white/80 backdrop-blur shadow-sm text-slate-500 text-xs font-bold tracking-[0.2em] uppercase mb-6"
            >
               Tertiary Industry Upgrade
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-8 leading-tight"
            >
               数字赋能 <br className="md:hidden"/>
               <span className="relative inline-block">
                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-purple-600">
                   城乡万象
                 </span>
                 <motion.div 
                   className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-300/50 -z-0 -rotate-1"
                   initial={{ width: 0 }}
                   animate={{ width: '100%' }}
                   transition={{ delay: 0.5, duration: 0.8 }}
                 ></motion.div>
               </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-slate-600 font-light"
            >
               从田间地头到云端秀场，彰武正在上演一场<br/>
               关于<span className="font-bold text-slate-800">速度</span>、<span className="font-bold text-slate-800">热度</span>与<span className="font-bold text-slate-800">温度</span>的产业变革。
            </motion.p>
         </div>

         {/* 3D 悬浮卡片 */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
            {[
               { ref: ecommerceRef, icon: <ShopOutlined />, title: "电商助农", color: "from-orange-400 to-red-500", shadow: "shadow-orange-500/30", sub: "Live Streaming" },
               { ref: logisticsRef, icon: <RocketOutlined />, title: "智慧物流", color: "from-blue-400 to-cyan-500", shadow: "shadow-blue-500/30", sub: "Smart Logistics" },
               { ref: tourismRef, icon: <CarOutlined />, title: "文旅融合", color: "from-emerald-400 to-green-600", shadow: "shadow-green-500/30", sub: "Cultural Tourism" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                onClick={() => scrollToSection(item.ref)}
                className="group cursor-pointer relative bg-white rounded-[2rem] p-1 border border-white/20 shadow-xl"
              >
                 {/* 动态边框 */}
                 <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`}></div>
                 
                 <div className="h-full bg-white/80 backdrop-blur-xl rounded-[1.8rem] p-8 flex flex-col items-center text-center border border-slate-100 overflow-hidden relative">
                    {/* 背景装饰图案 */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.color} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700`}></div>
                    
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg ${item.shadow} group-hover:rotate-12 transition-transform duration-300`}>
                       {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-600 group-hover:to-slate-900 transition-colors">
                       {item.sub}
                    </p>
                    <div className="mt-auto w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-transparent transition-all">
                       <ArrowDownOutlined className="-rotate-90 group-hover:rotate-0 transition-transform duration-300"/>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>

      {/* === Section 1: 电商 (直播间特效) === */}
      <div ref={ecommerceRef} className="py-32 relative bg-white">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            
            {/* 左侧：文字 */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
            >
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase mb-6">
                  <FireFilled /> Hottest Trend
               </span>
               <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
                  {section1.title}
               </h2>
               <p className="text-xl text-slate-600 leading-relaxed mb-10">
                  {section1.desc}
               </p>
               
               {/* 统计数据卡片 */}
               <div className="flex gap-6">
                  <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
                     <div className="text-3xl font-black text-orange-500 mb-1">10W+</div>
                     <div className="text-sm text-slate-500 font-bold">日均观看</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
                     <div className="text-3xl font-black text-red-500 mb-1">5000+</div>
                     <div className="text-sm text-slate-500 font-bold">日均订单</div>
                  </div>
               </div>
            </motion.div>

            {/* 右侧：手机直播模拟 (更逼真) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ type: "spring", stiffness: 50 }}
               className="relative flex justify-center"
            >
               {/* 背景装饰圆环 */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-orange-200 rounded-full animate-spin-slow opacity-50 border-dashed"></div>
               
               <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden z-10 transform hover:scale-105 transition-transform duration-500">
                  {/* 直播画面 */}
                  <img src="https://images.unsplash.com/photo-1592591681282-359f137357c2?q=80&w=800" className="w-full h-full object-cover opacity-90" alt="Live"/>
                  
                  {/* 飘动爱心特效 */}
                  <FloatingHearts />

                  {/* UI 覆盖层 */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 flex flex-col justify-between p-6">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" className="w-full h-full object-cover"/>
                         </div>
                         <div>
                            <div className="text-white text-sm font-bold">彰武好物推荐官</div>
                            <div className="flex items-center gap-1 text-[10px] text-white/80">
                               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> 直播中
                            </div>
                         </div>
                         <button className="ml-auto bg-orange-500 text-white text-xs px-4 py-1.5 rounded-full font-bold animate-pulse">
                            关注
                         </button>
                      </div>

                      <div className="space-y-3">
                         <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 text-white text-sm">
                            <span className="text-orange-300 font-bold">用户882:</span> 这地瓜看着真不错！🍠
                         </div>
                         <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 text-white text-sm">
                            <span className="text-orange-300 font-bold">用户996:</span> 已经下单了，发货快吗？
                         </div>
                         <div className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-full text-center shadow-lg shadow-orange-500/50 mt-2">
                            立即购买 (¥29.9)
                         </div>
                      </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>

      {/* === Section 2: 物流 (动态路径) === */}
      <div ref={logisticsRef} className="py-32 bg-[#0f172a] relative overflow-hidden text-white">
         {/* 动态网格背景 */}
         <div className="absolute inset-0 opacity-20" 
              style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
         </div>

         {/* 动态流光路径 SVG */}
         <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
             <path d="M-100,400 Q400,200 720,400 T1540,400" stroke="#3b82f6" strokeWidth="4" strokeDasharray="20 20" className="animate-dash"/>
             <circle r="10" fill="#60a5fa">
                <animateMotion dur="5s" repeatCount="indefinite" path="M-100,400 Q400,200 720,400 T1540,400" />
             </circle>
         </svg>

         <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            
            {/* 左侧：图片 (玻璃拟态 + 科技感) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="relative"
            >
               <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20"></div>
               <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800" className="relative rounded-2xl border border-white/10 shadow-2xl z-10" alt="Logistics"/>
               
               {/* 悬浮数据卡片 */}
               <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -right-8 -bottom-8 bg-slate-800/90 backdrop-blur border border-blue-500/30 p-6 rounded-xl shadow-xl z-20"
               >
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="text-xs text-blue-300 uppercase tracking-widest">System Status</span>
                  </div>
                  <div className="text-2xl font-mono font-bold text-white">Connected</div>
                  <div className="text-xs text-slate-400">覆盖全县 182 个行政村</div>
               </motion.div>
            </motion.div>

            {/* 右侧：文字 */}
            <div>
               <span className="text-blue-400 font-bold tracking-widest uppercase mb-4 block text-sm">
                 Intelligent Network
               </span>
               <h2 className="text-5xl font-bold mb-8 leading-tight">
                  快递进村<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">打通最后一公里</span>
               </h2>
               <p className="text-xl text-slate-300 leading-relaxed mb-10">
                  {section2.desc}
               </p>
               
               <div className="grid grid-cols-1 gap-4">
                  {section2.items && section2.items.map((item, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.1 }}
                       className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                     >
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                           <RocketOutlined />
                        </div>
                        <span className="font-bold text-lg">{item}</span>
                     </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* === Section 3: 旅游 (拍立得照片墙) === */}
      <div ref={tourismRef} className="py-32 bg-gradient-to-b from-green-50 to-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <span className="text-green-600 font-bold tracking-widest uppercase mb-4 block">Eco-Tourism</span>
               <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                  {section3.title}
               </h2>
               <p className="text-xl text-gray-600">{section3.desc}</p>
            </div>

            {/* 散落的照片墙布局 */}
            <div className="relative h-[600px] w-full flex justify-center items-center">
               {/* 装饰元素 */}
               <div className="absolute top-0 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
               
               {/* 照片 1 */}
               <motion.div 
                  className="absolute z-10"
                  style={{ rotate: -6, x: -200, y: 50 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                  transition={{ type: "spring" }}
               >
                  <div className="bg-white p-4 pb-12 shadow-2xl rotate-3 w-64 transform transition-all duration-300 hover:shadow-green-900/20">
                     <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400" className="w-full h-48 object-cover grayscale-0" alt="img"/>
                     <div className="absolute bottom-4 left-4 font-handwriting text-xl text-slate-600 font-bold"># Farm Food</div>
                  </div>
               </motion.div>

               {/* 照片 2 (中心) */}
               <motion.div 
                  className="absolute z-20"
                  style={{ rotate: 0, y: -50 }}
                  whileHover={{ scale: 1.2, zIndex: 50 }}
                  transition={{ type: "spring" }}
               >
                  <div className="bg-white p-4 pb-16 shadow-2xl w-80 transform transition-all duration-300">
                     <img src="https://images.unsplash.com/photo-1533659828570-3692fb4749da?q=80&w=500" className="w-full h-64 object-cover" alt="img"/>
                     <div className="absolute bottom-6 left-0 w-full text-center font-serif text-2xl text-slate-800 font-bold">漠上草原之旅</div>
                     <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full text-white flex items-center justify-center font-bold rotate-12 shadow-lg">HOT</div>
                  </div>
               </motion.div>

               {/* 照片 3 */}
               <motion.div 
                  className="absolute z-10"
                  style={{ rotate: 8, x: 220, y: 80 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                  transition={{ type: "spring" }}
               >
                  <div className="bg-white p-4 pb-12 shadow-2xl -rotate-2 w-64 transform transition-all duration-300 hover:shadow-green-900/20">
                     <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=400" className="w-full h-48 object-cover" alt="img"/>
                     <div className="absolute bottom-4 left-4 font-handwriting text-xl text-slate-600 font-bold"># Camping</div>
                  </div>
               </motion.div>
               
               {/* 装饰植物叶子 (用 SVG 或 Emoji 代替) */}
               <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-0 right-20 text-9xl opacity-20 pointer-events-none">🌿</motion.div>
               <motion.div animate={{ rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-20 text-8xl opacity-20 pointer-events-none">🍃</motion.div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ServiceEconomy;