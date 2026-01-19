import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = database.activities ? database.activities.find(i => i.id === id) : null;

  if (!item) return <div className="pt-32 text-center">活动未找到</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
       {/* Hero Image */}
       <div className="relative h-[400px] w-full overflow-hidden">
          <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
             <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">{item.title}</h1>
             <p className="text-lg opacity-90 font-light tracking-widest uppercase">{item.subtitle}</p>
          </div>
          <button 
             onClick={() => navigate('/activity')}
             className="absolute top-24 left-6 md:left-12 text-white/80 hover:text-white flex items-center gap-2 transition-colors z-10 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
             <ArrowLeftOutlined /> 返回活动总览
          </button>
       </div>

       {/* Content */}
       <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
          <div className="bg-white rounded-t-3xl shadow-xl p-8 md:p-12 min-h-[400px]">
             
             {/* 报名/参与按钮 */}
             <div className="flex justify-end mb-6">
                 <button className="bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <CalendarOutlined /> 立即报名 / 预约
                 </button>
             </div>

             <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
             </div>
          </div>
       </div>
    </div>
  );
};

export default ActivityDetail;