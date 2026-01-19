import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// 1. 引入刚才写好的组件
import ScrollToTop from './components/ScrollToTop';

import Layout from './components/Layout';
import Home from './pages/Home';
import Spirit from './pages/Spirit';
import PersonDetail from './pages/PersonDetail';
import Industry from './pages/Industry';
import IndustryDetail from './pages/IndustryDetail'; 
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import About from './pages/About';
import Activity from './pages/Activity'; 
import ActivityDetail from './pages/ActivityDetail'; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {/* 2. 把它放在这里！必须在 BrowserRouter 里面，Routes 外面 */}
      {/* 这样它就能监听所有页面的跳转，每次跳转都自动置顶 */}
      <ScrollToTop />

      <AnimatePresence>
        {loading && (
          <motion.div 
            key="preloader"
            initial={{ y: 0 }} 
            exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[9999] bg-[#001529] flex items-center justify-center text-white"
          >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <h2 className="text-6xl md:text-9xl font-serif italic tracking-widest mb-8 font-black">
            瀚海筑梦</h2>
               <div className="w-16 h-[1px] bg-white/30 mx-auto overflow-hidden">
                <motion.div className="w-full h-full bg-white" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5 }} />
              </div>
              <p className="mt-4 text-xs tracking-[0.3em] opacity-70"><h5>大工 × 彰武</h5></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="spirit" element={<Spirit />} />
          <Route path="spirit/people/:id" element={<PersonDetail />} />
          <Route path="industry" element={<Industry />} />
          <Route path="industry/:id" element={<IndustryDetail />} />
          <Route path="activity" element={<Activity />} />
          <Route path="activity/study" element={<Tours />} />
          <Route path="activity/study/:id" element={<TourDetail />} />
          <Route path="activity/:id" element={<ActivityDetail />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<div className="pt-32 text-center text-xl">404 - 页面未找到</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;