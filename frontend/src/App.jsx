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
import Grading from './pages/Grading';
import Cooperatives from './pages/Cooperatives';
import Cooperation from './pages/Cooperation';

const PRELOADER_SPARKS = [
  { id: 1, left: '8%', top: '24%', size: 5, color: 'rgba(251,191,36,0.8)', dur: 3.6, delay: -1.8 },
  { id: 2, left: '18%', top: '62%', size: 4, color: 'rgba(250,204,21,0.75)', dur: 4.1, delay: -2.5 },
  { id: 3, left: '26%', top: '38%', size: 3, color: 'rgba(248,250,252,0.78)', dur: 3.2, delay: -1.2 },
  { id: 4, left: '34%', top: '76%', size: 4, color: 'rgba(251,191,36,0.72)', dur: 3.9, delay: -2.9 },
  { id: 5, left: '47%', top: '28%', size: 5, color: 'rgba(125,211,252,0.82)', dur: 4.3, delay: -1.4 },
  { id: 6, left: '58%', top: '60%', size: 3, color: 'rgba(248,250,252,0.76)', dur: 3.1, delay: -2.2 },
  { id: 7, left: '66%', top: '44%', size: 4, color: 'rgba(251,191,36,0.8)', dur: 3.7, delay: -0.9 },
  { id: 8, left: '77%', top: '72%', size: 3, color: 'rgba(56,189,248,0.75)', dur: 4.2, delay: -2.6 },
  { id: 9, left: '84%', top: '34%', size: 4, color: 'rgba(250,204,21,0.74)', dur: 3.4, delay: -1.1 },
  { id: 10, left: '92%', top: '56%', size: 5, color: 'rgba(248,250,252,0.78)', dur: 4.5, delay: -3.1 }
];

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
            className="fixed inset-0 z-[9999] overflow-hidden text-white min-h-[100svh]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(150deg,#030b1a_0%,#0a1f3a_48%,#0d2744_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(56,189,248,0.16),transparent_40%),radial-gradient(circle_at_84%_86%,rgba(250,204,21,0.1),transparent_44%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_54%,rgba(2,6,23,0.36)_100%)]" />

            <motion.div
              className="absolute -top-24 -left-28 w-[44vw] h-[44vw] rounded-full bg-cyan-300/20 blur-3xl"
              animate={{ x: [0, 22, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-24 -right-24 w-[46vw] h-[46vw] rounded-full bg-sky-200/16 blur-3xl"
              animate={{ x: [0, -20, 0], y: [0, 16, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:46px_46px]" />
            <motion.div
              className="absolute inset-x-0 top-[42%] h-px bg-gradient-to-r from-transparent via-white/65 to-transparent"
              animate={{ x: ["-18%", "18%", "-18%"], opacity: [0.2, 0.95, 0.2] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute inset-0 pointer-events-none">
              {PRELOADER_SPARKS.map((spark) => (
                <motion.span
                  key={spark.id}
                  className="absolute rounded-full"
                  style={{
                    left: spark.left,
                    top: spark.top,
                    width: spark.size,
                    height: spark.size,
                    backgroundColor: spark.color,
                    boxShadow: `0 0 ${spark.size * 4}px ${spark.color}`
                  }}
                  animate={{
                    x: [0, 9, -6, 0],
                    y: [0, -16, -7, 0],
                    opacity: [0.2, 0.95, 0.35, 0.2],
                    scale: [0.9, 1.25, 0.95, 0.9]
                  }}
                  transition={{
                    duration: spark.dur,
                    delay: spark.delay,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="inline-flex items-center px-3 py-1 rounded-full border border-white/35 bg-white/10 text-[10px] tracking-[0.24em] uppercase"
                >
                  Zhangwu Story
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 36, letterSpacing: "0.22em" }}
                  animate={{ opacity: 1, y: 0, letterSpacing: "0.12em" }}
                  transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
                  className="mt-5 text-5xl md:text-8xl font-serif font-black drop-shadow-[0_10px_24px_rgba(0,0,0,0.32)]"
                >
                  瀚海筑梦
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="mt-3 text-base md:text-2xl tracking-[0.42em] md:tracking-[0.56em] text-white/90"
                >
                  守绿传薪
                </motion.p>

                <div className="w-44 md:w-56 h-[2px] bg-white/30 mx-auto mt-8 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-200 via-white to-emerald-200"
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.7, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="mt-5 text-[11px] tracking-[0.34em] uppercase"
                >
                  大连理工大学 × 彰武
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="absolute inset-x-0 bottom-0 z-20"
            >
              <div className="h-8 md:h-10 bg-black/30 backdrop-blur-[1px]" />
              <div className="bg-black/62 border-t border-white/15 px-4 py-2.5 md:py-3 text-center">
                <p className="text-[12px] md:text-[14px] font-medium tracking-[0.06em] text-white/95">
                  在风沙与岁月之间，他们把青春写成森林。
                </p>
                <p className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-white/70 mt-1">
                  From drifting sands to evergreen hope.
                </p>
              </div>
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
          <Route path="cooperation" element={<Cooperation />} />
          <Route path="cooperation/grading" element={<Grading />} />
          <Route path="cooperation/cooperatives" element={<Cooperatives />} />
          <Route path="grading" element={<Grading />} />
          <Route path="cooperatives" element={<Cooperatives />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<div className="pt-32 text-center text-xl">404 - 页面未找到</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
