import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReloadOutlined, DatabaseOutlined, ApartmentOutlined } from '@ant-design/icons';

const SilicaIndustry = ({ companies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setIsFlipped(false);
  };

  return (
    // 修改 1: 使用 Flex 布局，防止重叠
    <div className="flex w-full h-full items-center gap-8 px-4 md:px-0 relative z-10">
      
      {/* === 背景装饰：科技网格 (仅装饰) === */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* === 左侧：弧形滚轮 (固定宽度，防止重叠) === */}
      <div className="hidden md:flex w-[30%] min-w-[300px] h-full relative items-center justify-start pl-8">
        
        {/* 弧线：青色微光 */}
        <div className="absolute -left-[500px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-r-2 border-slate-700 shadow-[0_0_20px_rgba(34,211,238,0.1)]"></div>
        
        <div className="relative w-full h-[60%]">
          {companies.map((company, index) => {
            const offset = index - activeIndex;
            // 限制显示数量
            if (Math.abs(offset) > 3) return null;

            const isActive = offset === 0;
            // 计算位置
            const y = offset * 80; 
            const x = isActive ? 40 : Math.abs(offset) * 10; // 选中时向右突出
            const scale = isActive ? 1.1 : 0.9;
            const opacity = isActive ? 1 : 0.4;
            
            return (
              <motion.div
                key={company.id}
                className="absolute left-0 flex items-center gap-4 cursor-pointer origin-left w-full"
                initial={false}
                animate={{ x, y, scale, opacity }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ top: '50%', marginTop: '-20px' }}
                onClick={() => handleSelect(index)}
              >
                {/* 连线点 */}
                <div className={`w-3 h-3 rounded-sm rotate-45 transition-all duration-300 ${isActive ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-slate-600 border border-slate-500'}`}></div>
                
                {/* 连线 */}
                <div className={`h-[2px] transition-all ${isActive ? 'w-16 bg-cyan-500/50' : 'w-8 bg-slate-700'}`}></div>

                {/* 公司名 */}
                <span className={`font-bold text-lg tracking-wider transition-colors truncate ${isActive ? 'text-white drop-shadow-md' : 'text-slate-500'}`}>
                  {company.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === 右侧：科技卡片 (自适应宽度) === */}
      {/* 修改 2: 使用 flex-1 自动填满剩余空间，min-w-0 防止 flex 子项溢出 */}
      <div className="flex-1 min-w-0 h-full flex items-center justify-center py-6 pr-4 md:pr-12 perspective-2000">
        <motion.div
          className="w-full max-w-5xl h-[85%] relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* --- 正面 (Front) --- */}
          <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
            <div className="w-full h-full bg-slate-900/90 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col relative group">
                
                {/* 顶部装饰条 */}
                <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"></div>

                {/* 标题栏 */}
                <div className="h-24 flex items-center justify-between px-8 border-b border-slate-800 bg-slate-800/50">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white rounded p-2 shadow-lg shadow-cyan-900/20">
                          <img src={companies[activeIndex].logo} className="w-full h-full object-contain" alt="logo"/>
                      </div>
                      <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{companies[activeIndex].name}</h2>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                             <span className="text-xs text-cyan-400 font-mono uppercase tracking-widest">{companies[activeIndex].front.tag}</span>
                          </div>
                      </div>
                   </div>
                   <ApartmentOutlined className="text-5xl text-slate-700 opacity-50" />
                </div>

                {/* 修改 3: 内容区域增加 overflow-y-auto，防止文字溢出 */}
                <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar">
                    <div className="flex items-start gap-4 mb-6">
                       <div className="mt-1 w-1 h-6 bg-cyan-500"></div>
                       <h3 className="text-slate-400 uppercase tracking-widest text-sm font-bold">Business Profile</h3>
                    </div>
                    {/* 文字加粗一点，颜色更亮，提高可读性 */}
                    <p className="text-xl md:text-2xl font-normal leading-relaxed text-slate-200">
                      {companies[activeIndex].front.desc}
                    </p>
                </div>
                
                {/* 底部栏 */}
                <div className="h-16 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 text-slate-500">
                    <div className="font-mono text-xs">ID: {activeIndex + 1024} // SYS_READY</div>
                    <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                       <span className="text-xs font-bold tracking-widest">VIEW DATA</span>
                       <ReloadOutlined className="animate-spin-slow" />
                    </div>
                </div>
            </div>
          </div>

          {/* --- 背面 (Back) --- */}
          <div 
             className="absolute inset-0 backface-hidden"
             style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
             <div className="w-full h-full bg-slate-950 border border-cyan-900/50 rounded-xl shadow-2xl overflow-hidden flex flex-col relative">
                 {/* 顶部 */}
                 <div className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                       <DatabaseOutlined className="text-cyan-500"/> TECHNICAL SPECS
                    </h3>
                    <div className="flex gap-1">
                       {[1,2,3,4].map(i => <div key={i} className={`w-1 h-3 ${i===1 ? 'bg-cyan-500' : 'bg-slate-700'}`}></div>)}
                    </div>
                 </div>

                 {/* 数据区 - 网格 */}
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-center bg-slate-900/30">
                       <span className="text-xs text-cyan-600 uppercase tracking-widest mb-4 font-bold">Core Product</span>
                       <p className="text-3xl md:text-4xl font-bold text-white mb-2">{companies[activeIndex].back.product}</p>
                       <p className="text-slate-400 text-sm">Industrial Grade</p>
                    </div>
                    
                    <div className="flex flex-col">
                       <div className="flex-1 p-8 border-b border-slate-800 flex flex-col justify-center hover:bg-slate-900/50 transition-colors">
                          <span className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Capacity</span>
                          <p className="text-2xl font-mono text-cyan-100">{companies[activeIndex].back.capacity}</p>
                       </div>
                       <div className="flex-1 p-8 flex flex-col justify-center hover:bg-slate-900/50 transition-colors">
                          <span className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">Partners</span>
                          <p className="text-xl text-slate-300">{companies[activeIndex].back.partner}</p>
                       </div>
                    </div>
                 </div>

                 {/* 底部 */}
                 <div className="h-14 border-t border-slate-800 bg-slate-950 flex items-center justify-between px-8">
                     <button className="text-xs text-slate-400 hover:text-white flex items-center gap-2 uppercase tracking-wider">
                        <ReloadOutlined className="rotate-180" /> Return
                     </button>
                 </div>
             </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default SilicaIndustry;