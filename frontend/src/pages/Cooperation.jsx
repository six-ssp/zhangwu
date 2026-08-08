import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  BankOutlined,
  ThunderboltOutlined,
  ShakeOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

// ============================================================
// 合作共创下设板块数据
// ============================================================
const modules = [
  {
    id: 'grading',
    path: '/cooperation/grading',
    title: '沙地地瓜品质分级',
    en: 'Quality Grading',
    img: '/digua.jpg',
    badge: 'AI 智能评级',
    badgeColor: 'from-green-500 to-emerald-600',
    desc: '基于 MiMo 多模态大模型，严格依据《沙地地瓜生态品质认证指标体系》，上传图片即可自动评定一等果、二等果、微型小果，并识别坏果与无效图片。',
    points: ['AI 拍照评级', '8 项认证指标', '坏果自动拦截'],
    icon: <SafetyCertificateOutlined />,
  },
  {
    id: 'cooperatives',
    path: '/cooperation/cooperatives',
    title: '合作合作社名录',
    en: 'Cooperative Directory',
    img: '/agri-01.jpeg',
    badge: '产业合作',
    badgeColor: 'from-blue-500 to-sky-600',
    desc: '汇集彰武沙地地瓜产业的核心合作单位：政府机构、龙头企业与科技企业携手共建，共同打造生态品质认证的完整产业链条。',
    points: ['政府背书', '龙头企业', '科技支撑'],
    icon: <BankOutlined />,
  },
];

// ============================================================
// 总览页组件
// ============================================================
const Cooperation = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50">
      {/* ========== 1. Hero 首屏 ========== */}
      <header className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* 背景 */}
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10 }} className="absolute inset-0">
          <img src="/agri-01.jpeg" className="w-full h-full object-cover opacity-35" alt="合作共创" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-slate-50"></div>
        </motion.div>

        {/* 装饰光斑 */}
        <motion.div
          className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-green-500/10 blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -left-20 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl"
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-28 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/25 text-green-200 text-xs font-bold tracking-[0.2em] uppercase">
              <ShakeOutlined /> 携手共进 · 合作共赢
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 text-5xl md:text-7xl font-serif font-black text-white leading-tight drop-shadow-lg"
          >
            合作<span className="bg-gradient-to-r from-green-300 via-emerald-200 to-blue-200 bg-clip-text text-transparent">共创</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 text-white/80 leading-relaxed text-sm md:text-base max-w-2xl mx-auto"
          >
            以标准为纽带，以品质为承诺。
            <br className="hidden md:block" />
            探索沙地地瓜生态品质认证的更多可能。
          </motion.p>

          {/* 数据徽章 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto"
          >
            {[
              { num: '2', label: '合作板块' },
              { num: '8', label: '项认证指标' },
              { num: '3', label: '家核心单位' },
            ].map((item) => (
              <div key={item.label} className="px-4 py-4 rounded-2xl bg-white/8 backdrop-blur border border-white/15">
                <div className="text-3xl font-serif font-black text-white">{item.num}</div>
                <div className="text-[11px] text-white/60 tracking-widest mt-1">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ========== 2. 下设板块入口 ========== */}
        <section className="pt-16 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 text-green-800 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <GlobalOutlined /> 合作板块入口
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              选择你要探索的<span className="text-green-700">板块</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">点击卡片进入对应板块</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((mod, idx) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl shadow-[0_12px_30px_rgba(15,23,42,0.1)] hover:shadow-[0_24px_50px_rgba(15,23,42,0.16)] transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col border border-white/75"
                onClick={() => navigate(mod.path)}
              >
                {/* 图片区 */}
                <div className="h-56 md:h-64 overflow-hidden relative">
                  <img
                    src={mod.img}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={mod.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* 徽章 */}
                  <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${mod.badgeColor} text-white text-xs font-bold shadow-lg`}>
                    <ThunderboltOutlined /> {mod.badge}
                  </div>

                  {/* 标题 */}
                  <div className="absolute bottom-4 left-5 text-white">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-xl">{mod.icon}</span>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold">{mod.title}</h3>
                    </div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 font-bold">{mod.en}</p>
                  </div>
                </div>

                {/* 内容区 */}
                <div className="p-6 md:p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {mod.desc}
                    </p>

                    {/* 特性标签 */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {mod.points.map((p) => (
                        <span key={p} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-900 font-bold mt-6 group-hover:translate-x-1.5 group-hover:text-green-700 transition-all">
                    进入板块 <ArrowRightOutlined />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== 3. 底部 CTA ========== */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-center"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-green-500/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10">
              <ShakeOutlined className="text-4xl text-green-300 mb-5" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                让每一颗沙地地瓜，都经得起品质检验
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                品质分级 · 生态认证 · 产业合作
                <br />
                我们正在持续构建完整的产业生态。
              </p>
              <button
                onClick={() => navigate('/cooperation/grading')}
                className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-green-50 transition-colors"
              >
                立即体验 AI 评级
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Cooperation;
