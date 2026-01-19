import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { database } from '../data'; // 1. 导入数据库
import { EnvironmentOutlined, CarOutlined, CameraOutlined, ArrowRightOutlined } from '@ant-design/icons';

const Tours = () => {
  const [activeSpot, setActiveSpot] = useState(null);
  const navigate = useNavigate();

  // 从数据库读取地图点位 (如果没有数据防止报错，给个空数组)
  const mapSpots = database.tours || [];

  return (
    <div className="pt-24 min-h-screen bg-[#fffcf5] pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 标题区 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">全域旅游 · 研学导览</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            点击地图上的红色标记，查看详细研学攻略与实地景观。
          </p>
        </div>

        {/* === 地图交互区 === */}
        <div className="relative w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
            
            <div className="relative aspect-[4/3] md:aspect-[16/9] bg-[#eef5f9]">
                {/* 地图底图 */}
                <img 
                  src="/zhangwu-map.png" 
                  className="w-full h-full object-contain mix-blend-multiply opacity-90 p-4 md:p-10" 
                  alt="Map"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>

                {/* 生成坐标点 */}
                {mapSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className="absolute w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    onMouseEnter={() => setActiveSpot(spot.id)} // 鼠标移入显示预览
                    onClick={() => navigate(`/activity/study/${spot.id}`)} // 2. 点击直接跳转详情页
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-red-600 border-2 border-white shadow-lg items-center justify-center text-white transition-transform group-hover:scale-125">
                       <EnvironmentOutlined className="text-[10px] md:text-xs" />
                    </span>
                    
                    {/* 地名标签 */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm border border-gray-100 text-slate-800 pointer-events-none">
                       {spot.name}
                    </div>
                  </div>
                ))}

                {/* 悬浮预览卡片 (Preview Card) */}
                <AnimatePresence>
                  {activeSpot && (
                    <motion.div 
                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.9, y: 10 }}
                       className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:w-80 md:right-auto bg-white rounded-xl shadow-2xl p-4 z-50 border border-gray-100 cursor-pointer hover:border-green-500 transition-colors"
                       onClick={() => navigate(`/activity/study/${activeSpot}`)} // 点击卡片也能跳转
                    >
                       {(() => {
                         const spot = mapSpots.find(s => s.id === activeSpot);
                         if (!spot) return null;
                         return (
                           <div className="flex gap-4 items-center">
                              <img src={spot.img} className="w-16 h-16 rounded-lg object-cover bg-gray-100" alt={spot.name}/>
                              <div>
                                 <h3 className="font-bold text-slate-900">{spot.name}</h3>
                                 <p className="text-xs text-gray-500 line-clamp-1 mb-2">{spot.desc}</p>
                                 <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                    点击查看详情 <ArrowRightOutlined />
                                 </span>
                              </div>
                           </div>
                         );
                       })()}
                    </motion.div>
                  )}
                </AnimatePresence>

            </div>
        </div>

        {/* 底部装饰 */}
        <div className="mt-16 text-center">
             <p className="text-gray-400 text-sm">更多路线正在开发中...</p>
        </div>
      </div>
    </div>
  );
};

export default Tours;