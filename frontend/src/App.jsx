import React, { useState, useEffect } from 'react';
import { Button, Tag, Modal, Form, Input, message } from 'antd';
import { PlayCircleOutlined, UserOutlined, CaretRightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// --- 修复版组件：丝滑无卡顿的图片对比滑块 ---
const ImageComparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  // 不用复杂的鼠标监听，直接用 input onChange，浏览器底层优化，绝对丝滑
  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl select-none"
    >
      {/* 1. 底图 (After - 2025 绿洲) */}
      <img 
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover" 
        alt="After" 
      />
      <div className="absolute top-4 right-4 bg-green-800/90 text-white px-4 py-1 rounded-full text-sm backdrop-blur-md z-10 font-serif tracking-widest border border-white/20">
        2025 · 绿洲彰武
      </div>

      {/* 2. 顶图 (Before - 1950 沙漠) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2832&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90" // 增加旧照片质感
          alt="Before" 
        />
        <div className="absolute top-4 left-4 bg-yellow-700/90 text-white px-4 py-1 rounded-full text-sm backdrop-blur-md font-serif tracking-widest border border-white/20">
          1950 · 沙海肆虐
        </div>
      </div>

      {/* 3. 分割线 (视觉装饰) */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-800">
           <div className="flex gap-0.5"><CaretRightOutlined rotate={180} style={{fontSize: 10}}/><CaretRightOutlined style={{fontSize: 10}}/></div>
        </div>
      </div>

      {/* 4. 核心修复：透明的 Range Input (解决卡顿的关键) */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0" 
        style={{appearance: 'none'}} // 确保在所有浏览器隐形
      />
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setLoading(false), 2000);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#Fdfdfd] font-sans selection:bg-blue-200">
      
      {/* === 开场动画 === */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] bg-[#001529] flex items-center justify-center text-white"
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h1 className="text-6xl md:text-9xl font-serif italic tracking-widest mb-8 font-black">
            彰武</h1>
              <div className="w-16 h-[1px] bg-white/30 mx-auto overflow-hidden">
                <motion.div className="w-full h-full bg-white" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5 }} />
              </div>
              <p className="mt-4 text-xs tracking-[0.3em] opacity-70">中国 · 辽宁</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 导航栏 */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-3 shadow-sm text-slate-800' : 'bg-transparent py-8 text-white'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif font-bold text-2xl tracking-widest flex items-center gap-2 uppercase">
           彰武
          </div>
          <div className={`hidden md:flex gap-12 text-sm font-medium tracking-wide ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}>
            <a href="#spirit" className="hover:text-blue-500 transition-colors">治沙精神</a>
            <a href="#industry" className="hover:text-blue-500 transition-colors">绿色产业</a>
            <a href="#scenery" className="hover:text-blue-500 transition-colors">全域旅游</a>
          </div>
          <Button 
            type={isScrolled ? "default" : "primary"} 
            ghost={!isScrolled}
            icon={<UserOutlined />}
            onClick={() => setIsModalOpen(true)}
            className={!isScrolled ? "border-white/50 text-white hover:border-white hover:text-white" : ""}
          >
            管理登录
          </Button>
        </div>
      </nav>

      {/* Hero 区域 (全汉化) */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <motion.div 
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 10, ease: "linear" }}
           className="absolute inset-0"
        >
            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="background"/>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#Fdfdfd]"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
            <FadeIn delay={2.2}>
            <p className="text-blue-200 tracking-[0.8em] md:tracking-[1.2em] text-xs md:text-sm uppercase mb-8 font-medium border-b border-blue-500/30 pb-4 inline-block">中国 · 辽宁 · 彰武</p>
            </FadeIn>
            
            <div className="overflow-hidden py-2">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.3, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-lg"
              >
                筑梦瀚海 <br/> <span className="italic font-light opacity-90">守绿传新</span>
              </motion.h1>
            </div>

            <FadeIn delay={2.5}>
              <p className="text-lg text-gray-200 mb-12 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
                 看见彰武，看见中国治沙的力量。七十载岁月，彰武人以精神为种，以汗水浇灌，将昔日的不毛之地，变为了今日的生态屏障。
              </p>
              <div className="flex justify-center gap-6">
                 <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">探索故事</button>
                 <button className="px-8 py-3 text-white border border-white/30 rounded-full font-medium hover:bg-white/10 backdrop-blur-sm transition-colors flex items-center gap-2"><PlayCircleOutlined /> 宣传大片</button>
              </div>
            </FadeIn>
        </div>
      </header>

      {/* 治沙精神 (全汉化) */}
      <section id="spirit" className="py-32 bg-[#Fdfdfd] relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <FadeIn>
                <span className="text-yellow-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">1950 - 2025</span>
                <h2 className="text-5xl font-serif text-slate-900 mb-8 leading-tight">
                    从黄沙漫天 <br/> 到 <span className="italic text-green-800">林海茫茫</span>
                </h2>
                <p className="text-gray-500 text-lg leading-loose mb-8 font-light text-justify">
                    如何让风停下？七十年来，彰武人用树木给出了答案。
                    <br/>
                    这里曾是“狂风吹散屋顶，黄沙掩埋农田”的科尔沁沙地南缘。如今，一代代治沙人创造了绿色的奇迹，改写了辽宁的生态版图。
                </p>
                
                <div className="flex gap-12 border-t border-gray-100 pt-8">
                    <div>
                        <div className="text-4xl font-serif text-slate-900">34.5%</div>
                        <div className="text-xs text-gray-400 mt-1">森林覆盖率</div>
                    </div>
                    <div>
                        <div className="text-4xl font-serif text-slate-900">600万+</div>
                        <div className="text-xs text-gray-400 mt-1">固沙造林 (亩)</div>
                    </div>
                </div>
            </FadeIn>
            <ImageComparison />
        </div>
      </section>

      {/* 产业板块 (全汉化) */}
      <section id="industry" className="py-32 bg-[#111] text-white">
        <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-8">
                  <div>
                    <span className="text-blue-500 font-bold tracking-widest text-xs uppercase">Premium Industry</span>
                    <h2 className="text-5xl font-serif mt-4">点沙成金 · 产业奇迹</h2>
                  </div>
                  <p className="text-gray-400 max-w-sm text-right hidden md:block">精准农业与现代工业的完美协奏。</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. 枸杞 */}
                <FadeIn delay={0.2}>
                  <div className="md:col-span-2 h-[500px] bg-[#1a1a1a] rounded-none relative overflow-hidden group border border-white/5">
                      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between">
                          <div>
                            <Tag className="bg-red-900/40 text-red-200 border-none px-3 py-1 text-xs tracking-wider">农业王牌</Tag>
                            <h3 className="text-4xl font-serif mt-4 mb-2">彰武沙地枸杞</h3>
                          </div>
                          <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                             <p className="text-gray-300 mb-6 max-w-md">得益于独特的沙地土壤与大温差，其多糖含量高出国家平均水平 15% 以上。</p>
                             <span className="text-white border-b border-white pb-1 cursor-pointer text-sm tracking-wide">阅读调研报告 →</span>
                          </div>
                      </div>
                      <img src="https://so1.360tres.com/t011e86626eb063d83d.png" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" alt="goji"/>
                  </div>
                </FadeIn>

                {/* 2. 硅砂 */}
                <FadeIn delay={0.4}>
                  <div className="h-[500px] bg-[#1a1a1a] relative overflow-hidden group border border-white/5">
                      <div className="absolute inset-0 z-10 p-10">
                          <h3 className="text-3xl font-serif text-white">世界级硅砂</h3>
                          <p className="text-gray-400 mt-2 text-sm tracking-wider">Industrial Grade Purity</p>
                      </div>
                      <img src="http://5b0988e595225.cdn.sohucs.com/images/20170923/0b70bbf9b8e44cac9eba35664dcf61eb.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt="sand"/>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </FadeIn>
            </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-white text-slate-900 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
                <div className="font-serif text-2xl font-bold mb-6">彰武</div>
                <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
                    大连理工大学社会实践团数字作品。<br/>
                    致力于通过数字技术传播彰武治沙精神，助力乡村振兴与品牌推广。
                </p>
            </div>
            <div>
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest">网站导航</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                    <li><a href="#spirit" className="hover:text-black transition-colors">治沙历史</a></li>
                    <li><a href="#industry" className="hover:text-black transition-colors">特色产业</a></li>
                    <li><a href="#scenery" className="hover:text-black transition-colors">全域旅游</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest">联系我们</h4>
                <ul className="space-y-4 text-gray-500 text-sm">
                    <li><a href="#" className="hover:text-black transition-colors">官方微信</a></li>
                    <li><a href="#" className="hover:text-black transition-colors">合作邮箱</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
            <span>© 2025 DUT Practice Team.</span>
            <span>仅用于学术与公益展示</span>
        </div>
      </footer>
      
      {/* 登录框 */}
      <Modal title="后台管理系统" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} centered>
        <Form layout="vertical" className="pt-4">
            <Form.Item name="username" label="管理员账号"><Input size="large" prefix={<UserOutlined />} /></Form.Item>
            <Form.Item name="password" label="密码"><Input.Password size="large" /></Form.Item>
            <Button type="primary" block size="large" className="bg-black hover:bg-gray-800 border-none h-12">安全登录</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default App;