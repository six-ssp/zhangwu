import React from 'react';
import { Link } from 'react-router-dom';
import { MailOutlined, EnvironmentOutlined, ArrowRightOutlined } from '@ant-design/icons';

const SOCIAL_CHANNELS = [
  { key: 'weixin', label: '微信', image: '/weixin.jpg' },
  { key: 'bilibili', label: 'B站', image: '/bilibili.jpg' },
  { key: 'douyin', label: '抖音', image: '/douyin.jpg' },
  { key: 'qq', label: 'QQ', image: '/QQ.jpg' },
  { key: 'weibo', label: '微博', image: '/weibo.jpg' }
];

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 上部分：三列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* 1. 品牌与学校信息 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="./team-logo.jpg" className="w-12 h-12 rounded-full border-2 border-white/20" alt="Logo" />
              <div>
                <h3 className="text-xl font-serif font-bold text-white tracking-wider">瀚海筑梦实践团</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest">HanHai ZhuMeng Practice Team</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-loose max-w-sm">
              “瀚海筑梦 · 守绿传薪”社会实践团。<br/>
              以数字技术赋能乡村振兴，记录彰武治沙七十载的绿色奇迹，传承大漠深处的精神火炬。
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Official Contact Channels</p>
          </div>

          {/* 2. 快速导航 (两列) */}
          <div className="grid grid-cols-2 gap-8 md:pl-10">
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-2 border-green-600 pl-3">探索</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/spirit" className="hover:text-green-400 transition-colors flex items-center gap-2"><ArrowRightOutlined className="text-xs opacity-50"/> 治沙精神</Link></li>
                <li><Link to="/industry" className="hover:text-green-400 transition-colors flex items-center gap-2"><ArrowRightOutlined className="text-xs opacity-50"/> 绿色产业</Link></li>
                <li><Link to="/activity/study" className="hover:text-green-400 transition-colors flex items-center gap-2"><ArrowRightOutlined className="text-xs opacity-50"/> 研学路线</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-2 border-green-600 pl-3">关于</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-green-400 transition-colors">团队介绍</Link></li>
                <li><Link to="/about" className="hover:text-green-400 transition-colors">项目成果</Link></li>
                <li><Link to="/" className="hover:text-green-400 transition-colors">回到首页</Link></li>
              </ul>
            </div>
          </div>

          {/* 3. 联系与落款 */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-2 border-green-600 pl-3">联系我们</h4>
            <div className="space-y-4 text-sm text-slate-400">
              <p className="flex items-start gap-3">
                <EnvironmentOutlined className="mt-1 text-green-500"/>
                <span>辽宁省盘锦市大洼区<br/>大连理工大学盘锦校区</span>
              </p>
              <p className="flex items-center gap-3">
                <MailOutlined className="text-green-500"/>
                <span>hhzmsjt@qq.com</span>
              </p>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                {SOCIAL_CHANNELS.map((channel) => (
                  <div key={channel.key} className="group relative">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-green-700 hover:text-white hover:border-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/60"
                    >
                      {channel.label}
                    </button>
                    <div className="pointer-events-none absolute left-1/2 bottom-[calc(100%+10px)] -translate-x-1/2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 z-20">
                      <div className="w-36 rounded-xl border border-white/15 bg-slate-900/95 p-2 shadow-2xl">
                        <img
                          src={channel.image}
                          alt={`${channel.label}二维码`}
                          className="w-full h-32 object-cover rounded-lg"
                          loading="lazy"
                          decoding="async"
                        />
                        <p className="text-center text-[11px] text-slate-300 mt-1">{channel.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 下部分：版权信息 */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
           <p>© 2025 DUT "Zhangwu Dream" Practice Team. All Rights Reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
              <span>仅用于学术展示</span>
              <span>非商业用途</span>
              <span>隐私政策</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
