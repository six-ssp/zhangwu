import React from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../data';
import { ArrowRightOutlined } from '@ant-design/icons';

const Activity = () => {
  const navigate = useNavigate();
  const activities = database.activities || [];

  const handleCardClick = (item) => {
    // 如果是“研学活动(study)”，跳转到专门的地图路由
    if (item.id === 'study') {
      navigate('/activity/study');
    } else {
      // 其他活动跳转到通用的详情页
      navigate(`/activity/${item.id}`);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 标题 */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">彰武活动</h1>
            <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">
                从实地研学到公益认养，从文化体验到影像记录。<br/>
                参与丰富多彩的活动，亲身感受治沙精神的脉动。
            </p>
        </div>

        {/* 卡片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((item) => (
                <div 
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-[450px]"
                  onClick={() => handleCardClick(item)}
                >
                    {/* 图片区域 */}
                    <div className="h-64 overflow-hidden relative">
                       <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title}/>
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {item.id === 'study' ? 'Interactive' : 'Event'}
                       </div>
                    </div>

                    {/* 文字区域 */}
                    <div className="p-8 flex-grow flex flex-col justify-between">
                       <div>
                         <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">{item.title}</h2>
                         <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">{item.subtitle}</p>
                         <p className="text-gray-600 line-clamp-2">
                            {item.summary}
                         </p>
                       </div>
                       
                       <div className="flex items-center gap-2 text-slate-900 font-bold group-hover:translate-x-2 transition-transform mt-4">
                          {item.id === 'study' ? '进入地图' : '查看详情'} <ArrowRightOutlined />
                       </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Activity;