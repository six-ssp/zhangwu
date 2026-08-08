import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, Drawer } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. 判断是否在首页
  const isHome = location.pathname === '/';

  // 2. 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 20;
      setIsScrolled((prev) => (prev === next ? prev : next));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由变化后自动关闭移动端抽屉，避免页面跳转后菜单残留
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  // === 3. 样式逻辑 ===
  const navClass = `fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
    isScrolled || !isHome
      ? 'bg-white/70 backdrop-blur-md shadow-sm py-3 border-b border-white/20' 
      : 'bg-transparent py-6 border-transparent'
  }`;

  const textColor = (isScrolled || !isHome) ? "text-slate-800" : "text-white";
  const hoverColor = "hover:text-green-600"; 
  
  const linkClass = `text-[15px] font-medium tracking-wide transition-all duration-300 flex items-center gap-1 px-3 py-2 rounded-full hover:bg-black/5 ${textColor} ${hoverColor}`;
  const activeClass = "font-bold text-green-700 bg-green-50/50";

  // === 4. 菜单配置 (核心修改部分) ===

  // 治沙精神菜单
  const spiritMenu = {
    items: [
      { key: 'history', label: ' 治沙历史', onClick: () => navigate('/spirit?tab=history') },
      { key: 'people', label: ' 杰出代表', onClick: () => navigate('/spirit?tab=people') },
    ]
  };

  // 彰武产业菜单 (已更新为跳转详情页)
  const industryMenu = {
    items: [
      { 
        key: 'primary', 
        label: ' 精品农业', 
        // 修改：直接跳转到第一产业详情页
        onClick: () => navigate('/industry/primary') 
      },
      { 
        key: 'secondary', 
        label: ' 硅砂工业', 
        // 修改：直接跳转到第二产业详情页 (PPT模式)
        onClick: () => navigate('/industry/secondary') 
      },
      {
        key: 'tertiary',
        label: ' 全域旅游',
        // 修改：直接跳转到第三产业详情页
        onClick: () => navigate('/industry/tertiary')
      },
    ]
  };
  const activityMenu = {
    items: [
      { key: 'study', label: ' 研学活动', onClick: () => navigate('/activity/study') },
      { key: 'tree', label: ' 一棵树活动', onClick: () => navigate('/activity/tree') },
      { key: 'show', label: ' 表演预约', onClick: () => navigate('/activity/show') },
      { key: 'video', label: ' 短视频大赛', onClick: () => navigate('/activity/video') },
    ]
  };
  // 合作共创菜单
  const cooperationMenu = {
    items: [
      { key: 'overview', label: '合作共创总览', onClick: () => navigate('/cooperation') },
      { type: 'divider' },
      { key: 'grading', label: '沙地地瓜品质分级', onClick: () => navigate('/cooperation/grading') },
      { key: 'cooperatives', label: '合作合作社名录', onClick: () => navigate('/cooperation/cooperatives') },
    ]
  };
  // 辅助函数：判断高亮
  const isActive = (path) => {
    // 如果当前路径包含 path (比如 /industry/secondary 包含 /industry)，就高亮
    return location.pathname.includes(path) && (isScrolled || !isHome) ? activeClass : "";
  };

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
           <img 
             src="/team-logo.jpg" 
             className={`w-10 h-10 rounded-full border-2 transition-all duration-500 ${isScrolled || !isHome ? 'border-green-600 shadow-md' : 'border-white/50'}`} 
             alt="Logo"
           />
           <div className={`flex flex-col transition-colors duration-300 ${textColor}`}>
             <span className="font-serif font-bold text-base sm:text-lg leading-none tracking-widest group-hover:text-green-600 transition-colors">
               “瀚海筑梦”实践团
             </span>
             <span className="text-[10px] opacity-80 uppercase tracking-wider mt-1 hidden sm:block">
               大连理工大学
             </span>
           </div>
        </Link>

        {/* 菜单区域 */}
        <div className="hidden md:flex gap-2">
          <Link to="/" className={`${linkClass} ${location.pathname === '/' ? isActive('/') : ''}`}>
            首页
          </Link>

          <Dropdown menu={spiritMenu} placement="bottom" arrow={{ pointAtCenter: true }}>
             <button
                className={`${linkClass} ${isActive('/spirit')}`}
                onClick={() => navigate('/spirit?tab=history')}
             >
                治沙精神 <DownOutlined className="text-[10px] opacity-60 ml-1"/>
             </button>
          </Dropdown>

          {/* 产业菜单按钮 */}
          <Dropdown menu={industryMenu} placement="bottom" arrow={{ pointAtCenter: true }}>
             {/* 点击主按钮去总览页 /industry */}
             <button 
                className={`${linkClass} ${isActive('/industry')}`}
                onClick={() => navigate('/industry')}
             >
                彰武产业 <DownOutlined className="text-[10px] opacity-60 ml-1"/>
             </button>
          </Dropdown>

          <Dropdown menu={activityMenu} placement="bottom" arrow={{ pointAtCenter: true }}>
             <button
                className={`${linkClass} ${isActive('/activity')}`}
                onClick={() => navigate('/activity')}
             >
                彰武活动 <DownOutlined className="text-[10px] opacity-60 ml-1"/>
             </button>
          </Dropdown>

          {/* 合作共创下拉菜单 */}
          <Dropdown menu={cooperationMenu} placement="bottom" arrow={{ pointAtCenter: true }}>
             <button
                className={`${linkClass} ${isActive('/cooperation') || isActive('/grading') || isActive('/cooperatives') ? activeClass : ''}`}
                onClick={() => navigate('/cooperation')}
             >
                合作共创 <DownOutlined className="text-[10px] opacity-60 ml-1"/>
             </button>
          </Dropdown>

          <Link to="/about" className={`${linkClass} ${isActive('/about')}`}>
            关于我们
          </Link>
          
          {/* EN 按钮
          <div className={`ml-4 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all ${
              isScrolled || !isHome 
                ? 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600' 
                : 'bg-white/20 text-white hover:bg-white hover:text-green-900 backdrop-blur-sm'
            }`}>
             <span className="font-serif font-bold text-xs">CN</span>
          </div> */}
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isScrolled || !isHome
              ? 'bg-slate-900/5 text-slate-800 hover:bg-slate-900/10'
              : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm'
          }`}
          onClick={() => setMobileOpen(true)}
          aria-label="打开菜单"
        >
          <MenuOutlined />
        </button>
      </div>

      <Drawer
        title="站点导航"
        placement="right"
        width={300}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/')}>首页</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/about')}>关于我们</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/industry')}>彰武产业总览</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/activity')}>彰武活动总览</button>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 px-1">治沙精神</p>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700" onClick={() => navigate('/spirit?tab=history')}>治沙历史</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700" onClick={() => navigate('/spirit?tab=people')}>杰出代表</button>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 px-1">彰武产业</p>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/industry/primary')}>精品农业</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/industry/secondary')}>硅砂工业</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/industry/tertiary')}>全域旅游</button>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 px-1">彰武活动</p>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/activity/study')}>研学活动</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/activity/tree')}>一棵树活动</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/activity/show')}>表演预约</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100" onClick={() => navigate('/activity/video')}>短视频大赛</button>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 px-1">合作共创</p>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700" onClick={() => navigate('/cooperation')}>合作共创总览</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700" onClick={() => navigate('/cooperation/grading')}>沙地地瓜品质分级</button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-50 hover:text-green-700" onClick={() => navigate('/cooperation/cooperatives')}>合作合作社名录</button>
            </div>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
