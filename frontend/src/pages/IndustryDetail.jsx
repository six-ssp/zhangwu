import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowLeftOutlined, ShoppingCartOutlined, CodeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import ServiceEconomy from '../components/ServiceEconomy';
import SilicaIndustry from '../components/SilicaIndustry';

const IndustryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = database.industries ? database.industries.find(i => i.id === id) : null;

  if (!item) return <div className="pt-32 text-center">内容未找到</div>;

  // === 特殊逻辑：如果是【硅砂工业】，进入 PPT 沉浸模式 (庄严科技版) ===
  if (id === 'secondary') {
    return (
      <div className="h-screen w-full bg-[#0b0f19] overflow-hidden relative flex flex-col font-sans">
         
         {/* 1. 背景：深邃的科技蓝黑渐变 */}
         <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-[#0f172a] to-black"></div>
         
         {/* 2. 装饰：精细的网格纹理 (增加科技感) */}
         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
              style={{ backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`, backgroundSize: '50px 50px' }}>
         </div>

         {/* 3. 顶部导航 (Sticky Tech Style) */}
         <div className="relative z-20 px-6 md:px-10 py-6 flex justify-between items-center border-b border-slate-800/50 bg-[#0f172a]/80 backdrop-blur-md">
            <button 
               onClick={() => navigate('/industry')}
               className="text-slate-400 hover:text-cyan-400 flex items-center gap-3 transition-all group"
            >
               <div className="w-8 h-8 rounded border border-slate-600 group-hover:border-cyan-400 flex items-center justify-center">
                  <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform"/> 
               </div>
               <span className="text-sm font-bold tracking-widest uppercase">Index</span>
            </button>
            
            <div className="text-right">
               <h1 className="text-xl font-bold text-white tracking-[0.2em] uppercase mb-1 flex items-center justify-end gap-2">
                 <CodeOutlined className="text-cyan-500"/> {item.title}
               </h1>
            </div>
         </div>

         {/* 4. 核心交互区 (Flex 1 填满剩余高度) */}
         <div className="relative z-10 flex-1 min-h-0 w-full"> 
            {item.companies ? (
               <SilicaIndustry companies={item.companies} />
            ) : (
               <div className="flex items-center justify-center h-full text-slate-500">NO DATA AVAILABLE</div>
            )}
         </div>
      </div>
    );
  }
  // === 特殊逻辑 2：如果是【第三产业】，进入 现代服务业 杂志模式 ===
  if (id === 'tertiary') {
   return (
     <div className="min-h-screen bg-slate-50 relative flex flex-col font-sans">
        
        {/* === 修复点：调整位置和层级 === */}
        {/* 1. top-24: 下移，避开全局 Navbar */}
        {/* 2. pointer-events-none: 让这一行透明容器不挡鼠标，只有按钮能点 */}
        <div className="absolute top-24 left-0 w-full z-40 px-6 flex justify-between items-center pointer-events-none">
           <button 
              onClick={() => navigate('/industry')}
              // pointer-events-auto: 恢复按钮点击
              className="pointer-events-auto text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-slate-200 hover:shadow-md"
           >
              <ArrowLeftOutlined /> 返回产业全览
           </button>
           
           <div className="hidden md:block text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
              Integrated Development
           </div>
        </div>
        
        {/* 渲染服务业组件 */}
        <ServiceEconomy data={item} />
        
        {/* 底部商品推荐 (如果有) */}
        {item.products && (
           <div className="bg-white py-16 px-6 border-t border-gray-100 relative z-10">
              <div className="max-w-6xl mx-auto">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
                        <ShoppingCartOutlined />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-slate-900">特色体验 & 产品</h2>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                     {item.products.map((product, idx) => (
                        <div key={idx} className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden cursor-pointer">
                           <div className="h-40 overflow-hidden relative">
                              <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={product.name}/>
                           </div>
                           <div className="p-4">
                              <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
                              <div className="flex justify-between items-center mt-3">
                                 <span className="text-red-600 font-bold">{product.price}</span>
                                 <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full hover:bg-green-600 transition-colors">查看</button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
              </div>
           </div>
        )}
     </div>
   );
 }
  // === 常规逻辑 (保持不变) ===
  const colorMap = {
    green: "text-green-700 bg-green-50 border-green-200",
    blue: "text-blue-700 bg-blue-50 border-blue-200",
    orange: "text-orange-700 bg-orange-50 border-orange-200",
  };
  const themeClass = colorMap[item.color] || colorMap.green;

  return (
    <div className="bg-white min-h-screen pb-20">
       <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
          <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
             <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wider">{item.title}</h1>
             <p className="text-lg md:text-xl opacity-90 font-light tracking-widest uppercase">{item.subtitle}</p>
          </div>
          <button onClick={() => navigate('/industry')} className="absolute top-24 left-6 md:left-12 text-white/80 hover:text-white flex items-center gap-2 transition-colors z-10">
             <ArrowLeftOutlined /> 返回列表
          </button>
       </div>

       <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
          <div className="bg-white rounded-t-3xl shadow-xl p-8 md:p-12 min-h-[400px]">
             <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
             </div>
          </div>

          <div className="mt-12">
             <div className="flex items-center gap-3 mb-8">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${themeClass}`}>
                   <ShoppingCartOutlined />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-slate-900">特色产品推荐</h2>
                   <p className="text-xs text-gray-400">Support Locals · 助力乡村振兴</p>
                </div>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {item.products && item.products.map((product, idx) => (
                   <motion.div 
                     key={idx} 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all overflow-hidden"
                   >
                      <div className="h-40 overflow-hidden relative">
                         <img src={product.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name}/>
                      </div>
                      <div className="p-4">
                         <h3 className="font-bold text-slate-800 mb-1">{product.name}</h3>
                         <div className="flex justify-between items-center mt-3">
                            <span className="text-red-600 font-bold">{product.price}</span>
                            <a href={product.link} className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full hover:bg-green-600 transition-colors">购买</a>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default IndustryDetail;