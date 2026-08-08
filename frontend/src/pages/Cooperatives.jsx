import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Tag, Modal, Image, Empty } from 'antd';
import {
  BankOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  TrophyOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  PictureOutlined,
  SwapOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  ShakeOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  RightOutlined,
} from '@ant-design/icons';

// ============================================================
// 合作社数据（后续可替换为真实图片和证书）
// ============================================================
const cooperativesData = [
  {
    id: 'nongjing',
    name: '彰武县农经总站',
    shortName: '农经总站',
    logo: null,
    type: '官方机构',
    typeColor: 'blue',
    icon: <BankOutlined />,
    description:
      '彰武县农业经济管理总站，负责全县农村集体经济组织管理、农业产业化指导及农产品质量安全监管工作。作为沙地地瓜产业发展的核心推动单位，主导制定了沙地鲜食地瓜品质分级地方标准。',
    address: '辽宁省阜新市彰武县',
    phone: '（待补充）',
    highlights: ['政府背书', '产业规划', '标准制定', '质量监管'],
    certificates: [],
    certificatePlaceholder: true,
  },
  {
    id: 'yongzhuo',
    name: '永茁农业',
    shortName: '永茁农业',
    logo: null,
    type: '龙头企业',
    typeColor: 'gold',
    icon: <ThunderboltOutlined />,
    description:
      '永茁农业是彰武县沙地地瓜种植与深加工的龙头企业，拥有标准化种植基地和现代化仓储加工设施。公司采用"企业+合作社+农户"模式，带动周边农户发展沙地地瓜规模化种植，年产优质沙地鲜食地瓜超千吨。',
    address: '辽宁省阜新市彰武县',
    phone: '（待补充）',
    highlights: ['标准化基地', '深加工', '产业带动', '千吨产能'],
    certificates: [],
    certificatePlaceholder: true,
  },
  {
    id: 'wotu',
    name: '沃土生物',
    shortName: '沃土生物',
    logo: null,
    type: '科技企业',
    typeColor: 'green',
    icon: <GlobalOutlined />,
    description:
      '沃土生物科技专注于农业微生物制剂与有机肥研发生产，为沙地地瓜种植提供全程生态种植解决方案。公司致力于土壤改良与地力提升，是沙地地瓜"生态认证"体系的重要技术支撑单位。',
    address: '辽宁省阜新市彰武县',
    phone: '（待补充）',
    highlights: ['微生物制剂', '有机肥', '土壤改良', '生态种植'],
    certificates: [],
    certificatePlaceholder: true,
  },
];

// ============================================================
// 合作价值数据
// ============================================================
const cooperationValues = [
  {
    icon: <SafetyCertificateOutlined />,
    title: '标准共建',
    desc: '共同制定沙地地瓜品质分级地方标准，构建可复制的产业规范',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: <TeamOutlined />,
    title: '产业协同',
    desc: '政府 + 企业 + 农户三位一体，打通种植、加工、销售全链条',
    color: 'from-blue-500 to-sky-600',
  },
  {
    icon: <HeartOutlined />,
    title: '生态共赢',
    desc: '坚持生态种植理念，实现经济效益与沙地生态修复的双赢',
    color: 'from-amber-500 to-orange-600',
  },
];

// ============================================================
// 类型标签颜色映射
// ============================================================
const typeTagColors = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  gold: 'bg-amber-50 text-amber-700 border-amber-200',
  green: 'bg-green-50 text-green-700 border-green-200',
};

const typeIconBg = {
  blue: 'from-blue-400 to-sky-500',
  gold: 'from-amber-400 to-orange-500',
  green: 'from-green-400 to-emerald-500',
};

// ============================================================
// 页面组件
// ============================================================
const Cooperatives = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewTitle, setPreviewTitle] = useState('');

  const openCertificatePreview = (coop) => {
    if (coop.certificates.length > 0) {
      setPreviewImages(coop.certificates);
      setPreviewTitle(`${coop.name} — 合作证明`);
      setPreviewVisible(true);
    }
  };

  return (
    <div className="bg-slate-50">
      {/* ========== 1. Hero 首屏 ========== */}
      <header className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* 背景 */}
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10 }} className="absolute inset-0">
          <img src="/agri-01.jpeg" className="w-full h-full object-cover opacity-40" alt="彰武农业" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-slate-50"></div>
        </motion.div>

        {/* 装饰光斑 */}
        <motion.div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-blue-500/10 blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -left-20 w-[520px] h-[520px] rounded-full bg-green-500/10 blur-3xl"
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-28 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/25 text-blue-200 text-xs font-bold tracking-[0.2em] uppercase">
              <ShakeOutlined /> 彰武沙地地瓜 · 产业合作
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 text-5xl md:text-7xl font-serif font-black text-white leading-tight drop-shadow-lg"
          >
            合作<span className="bg-gradient-to-r from-blue-300 via-sky-200 to-emerald-200 bg-clip-text text-transparent">合作社名录</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 text-white/80 leading-relaxed text-sm md:text-base max-w-2xl mx-auto"
          >
            政府机构、龙头企业与科技企业携手共建，
            <br className="hidden md:block" />
            共同打造沙地地瓜生态品质认证的完整产业链条。
          </motion.p>

          {/* 数据徽章 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto"
          >
            {[
              { num: '3', label: '核心合作单位' },
              { num: '2', label: '种 产业形态' },
              { num: '∞', label: '合作可能' },
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
        {/* ========== 2. 合作价值 ========== */}
        <section className="pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cooperationValues.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 p-6 text-center overflow-hidden border border-gray-100"
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center text-white text-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  {val.icon}
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== 3. 合作社卡片列表 ========== */}
        <section className="pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <BankOutlined /> 合作单位目录
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              携手共进的<span className="text-blue-700">伙伴们</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">以下为彰武沙地地瓜产业的核心合作单位</p>
          </motion.div>

          <div className="space-y-6">
            {cooperativesData.map((coop, index) => (
              <motion.div
                key={coop.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="shadow-md hover:shadow-xl transition-shadow duration-500 border-0 rounded-2xl overflow-hidden group"
                  styles={{ body: { padding: 0 } }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* 左侧：Logo / 图标区域 */}
                    <div className="w-full md:w-52 flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6 md:p-0 min-h-[160px] md:min-h-[auto] relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/60" />
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/40" />
                      </div>

                      {coop.logo ? (
                        <img
                          src={coop.logo}
                          alt={coop.name}
                          className="w-28 h-28 object-contain rounded-2xl relative z-10 shadow-md"
                        />
                      ) : (
                        <div className="relative z-10 flex flex-col items-center gap-3">
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${typeIconBg[coop.typeColor]} shadow-lg flex items-center justify-center text-white text-3xl`}>
                            {coop.icon}
                          </div>
                          <span className="text-xs text-slate-500 font-medium tracking-wide">
                            LOGO 待补充
                          </span>
                        </div>
                      )}

                      {/* 序号角标 */}
                      <span className="absolute top-3 left-4 text-5xl font-serif font-black text-white/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* 右侧：详细信息 */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {coop.name}
                        </h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${typeTagColors[coop.typeColor]}`}>
                          {coop.type}
                        </span>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                        {coop.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {coop.highlights.map((h) => (
                          <Tag key={h} color="default" className="rounded-full text-xs px-2.5 py-0.5">
                            {h}
                          </Tag>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <EnvironmentOutlined /> {coop.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <PhoneOutlined /> {coop.phone}
                        </span>
                      </div>

                      {/* 合作证明区域 */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <SafetyCertificateOutlined className="text-blue-600" />
                            <span className="text-sm font-bold text-slate-700">合作证明</span>
                          </div>
                          {coop.certificates.length > 0 ? (
                            <button
                              onClick={() => openCertificatePreview(coop)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                            >
                              <PictureOutlined /> 查看证书 ({coop.certificates.length})
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <ClockCircleOutlined /> 待补充
                            </span>
                          )}
                        </div>

                        {coop.certificates.length > 0 ? (
                          <div className="mt-3 flex gap-3">
                            {coop.certificates.map((cert, i) => (
                              <div
                                key={i}
                                className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors flex-shrink-0"
                                onClick={() => openCertificatePreview(coop)}
                              >
                                <img src={cert} alt={`证书 ${i + 1}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div
                            className="mt-3 border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all min-h-[100px]"
                            title="等待添加合作证明图片"
                          >
                            <SwapOutlined className="text-2xl text-gray-300" />
                            <p className="text-xs text-gray-400 text-center">
                              合作证明将在获取后上传
                              <br />
                              <span className="text-gray-300">此处为图片占位，后续直接换源即可</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== 4. 底部 CTA ========== */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-center"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative z-10">
              <ShakeOutlined className="text-4xl text-blue-300 mb-5" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                合作单位持续拓展中
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                我们正在积极与更多合作社及企业洽谈合作，
                <br />
                合作名录将动态更新。如有合作意向，欢迎联系。
              </p>
              <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
                联系"瀚海筑梦"实践团 <RightOutlined className="text-[10px]" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* 证书预览模态框 */}
        <Modal
          open={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
          width={720}
          centered
        >
          {previewImages.length > 0 ? (
            <Image.PreviewGroup>
              <div className="flex flex-wrap gap-4 justify-center">
                {previewImages.map((img, i) => (
                  <Image key={i} src={img} alt={`证书 ${i + 1}`} className="max-h-[400px] object-contain" />
                ))}
              </div>
            </Image.PreviewGroup>
          ) : (
            <Empty description="暂无证书图片" />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Cooperatives;
