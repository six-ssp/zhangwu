import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Tag, message, Descriptions, Divider } from 'antd';
import {
  CameraOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionOutlined,
  TrophyOutlined,
  ExperimentOutlined,
  SafetyCertificateOutlined,
  ScanOutlined,
  DeleteOutlined,
  SwapOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  DownOutlined,
  RightOutlined,
  ThunderboltOutlined,
  RiseOutlined,
  FieldTimeOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons';

// ============================================================
// MIMO API 配置 — 后续替换为实际的 endpoint / api_key
// ============================================================
const MIMO_API_URL = '/api/mimo/grade';

// ============================================================
// 预设提示词（完整的分级标准）
// ============================================================
const GRADING_PROMPT = `你是一位专业的沙地地瓜（红薯/甘薯）品质分级专家。请严格依据以下《沙地地瓜生态品质认证指标体系》对用户上传的图片中的地瓜进行品质评级。

# 沙地地瓜生态品质认证指标体系

## 1. 基本要求
沙地鲜食地瓜均应满足下列基本要求：
1. 清洁、无可见杂质，薯体附着少量细沙；
2. 外观新鲜、硬实、无脱水、无皱缩；
3. 口感纯正、无异味；
4. 无腐烂和变质；
5. 无冻害、无水浸、无糠心；
6. 无黑斑病、软腐病、茎线虫病、干腐病；
7. 种植过程规范管控，农残指标符合绿色食品标准。

## 2. 等级
在符合基本要求的前提下，沙地鲜食地瓜分为一等果、二等果、微型小果：

- **一等果**：同一品种，大小相对均匀；表皮完整洁净、光滑，无须根；无严重畸形、开裂、虫蚀、发芽；无明显机械损伤；不允许存在任何污斑、黑斑；完成标准糖化，可溶性糖≥18Brix
- **二等果**：同一品种或相近品种，大小基本均匀；表皮基本完整光滑；允许轻微弯曲、少量浅污痕；不允许腐烂、扩散性黑斑；允许存在轻微表皮划痕，无内伤腐烂
- **微型小果**：同一品种，果型小巧匀称；表皮完整、洁净无霉变；无腐烂、虫洞，无明显机械损伤，适合独立小包装销售

## 3. 等级允许误差
a）一等果允许5%的产品不符合该等级的要求，但应符合二等果要求；
b）二等果允许10%的产品不符合该等级的要求，但应符合基本要求；
c）微型小果允许10%的产品不符合该等级的要求，但应符合基本要求。

## 4. 规格
以鲜食地瓜薯块质量为划分规格指标：
- 一等果：单薯质量 ≥150g，≤400g
- 二等果：＞400g 或 ≥50g，＜150g（畸形薯）
- 微型小果：≥50g，≤150g（外形规整薯块）

## 5. 规格允许误差
a）一等果允许有5%的产品不符合该规格的要求；
b）二等果、微型小果允许有10%的产品不符合该规格的要求。

## 6. 种苗生态要求
a）优先选用与辽宁省农科院合作培育的脱毒一代种苗；脱毒二代种苗仅限小规模自留使用，三代及以上退化种苗禁止规模化商品薯种植；
b）全程主推有机肥、生态除草模式；采用风电、光伏绿电开展仓储、深加工的产品可予以认证加分。

## 7. 糖化与仓储要求
a）烟薯标准糖化周期7d～15d；玛莎莉、哈密、52良作标准糖化周期30d；未达到糖化标准的地瓜不得标注最优口感宣传用语；
b）深加工原料优先选用一等果；二等果可用于大众休闲薯制品加工。

## 8. 溯源认证要求
成品外包装粘贴唯一溯源二维码，溯源信息至少包含：产地、品种、种苗代数、种植记录、地瓜等级、糖化周期、检测报告、采收日期。

---

## 边界情况处理（重要）

### 情况一：图片中无法识别地瓜
如果上传的图片中**不存在地瓜（红薯/甘薯）**，或主体不清晰、无法辨认是否为地瓜，请：
- 将 overall_grade 输出为 **"无法识别"**
- 在 analysis.appearance 中说明图片中实际显示的内容
- meets_basic_requirements 设为 false
- 在 basic_requirement_details 中说明"图片中未检测到地瓜主体，无法进行品质评级"

### 情况二：坏果判定
如果图片中的地瓜存在以下**任一**严重缺陷，直接判定为 **"坏果"**（即使其他方面看起来正常）：
- 明显腐烂、软化出水、变质
- 大面积发霉或霉斑
- 严重黑斑病（黑色凹陷病斑大面积扩散）、软腐病、干腐病
- 严重虫蛀（大面积虫洞）、被啃食
- 冻伤严重（组织水浸状、透明软化）
- 明显发芽且表皮严重皱缩脱水

坏果判定时：
- 将 overall_grade 输出为 **"坏果"**
- meets_basic_requirements 设为 false
- 在 analysis.defects 中明确描述具体缺陷
- 在 suggestions 中给出处理建议（如：禁止上市销售、深加工前剔除等）

---

请根据以上标准，对上传图片中的沙地地瓜进行评定，按以下JSON格式输出结果：
{
  "overall_grade": "一等果 | 二等果 | 微型小果 | 坏果 | 无法识别",
  "confidence": "高 | 中 | 低",
  "analysis": {
    "appearance": "外观评价",
    "size_estimation": "规格估算",
    "skin_condition": "表皮状态",
    "defects": "缺陷描述",
    "sugarization": "糖化状态推断"
  },
  "meets_basic_requirements": true/false,
  "basic_requirement_details": "基本要求符合情况说明",
  "suggestions": "品质提升建议（如有）"
}`;

// ============================================================
// 分级标准数据（用于页面展示）
// ============================================================
const gradeStandards = [
  {
    key: 'basic',
    header: '1. 基本要求',
    content: (
      <ul className="list-disc pl-5 space-y-1.5 text-gray-600 leading-relaxed">
        <li>清洁、无可见杂质，薯体附着少量细沙；</li>
        <li>外观新鲜、硬实、无脱水、无皱缩；</li>
        <li>口感纯正、无异味；</li>
        <li>无腐烂和变质；</li>
        <li>无冻害、无水浸、无糠心；</li>
        <li>无黑斑病、软腐病、茎线虫病、干腐病；</li>
        <li>种植过程规范管控，农残指标符合绿色食品标准。</li>
      </ul>
    ),
  },
  {
    key: 'grade',
    header: '2. 等级划分',
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-green-50">
              <th className="border px-3 py-2 text-left font-semibold text-green-900 w-24">等级</th>
              <th className="border px-3 py-2 text-left font-semibold text-green-900">要求</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border px-3 py-2 align-top">
                <Tag color="gold" className="font-bold px-2 py-0.5">一等果</Tag>
              </td>
              <td className="border px-3 py-2 text-gray-600 leading-relaxed">
                同一品种，大小相对均匀；表皮完整洁净、光滑，无须根；无严重畸形、开裂、虫蚀、发芽；无明显机械损伤；不允许存在任何污斑、黑斑；完成标准糖化，可溶性糖≥18Brix
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border px-3 py-2 align-top">
                <Tag color="blue" className="font-bold px-2 py-0.5">二等果</Tag>
              </td>
              <td className="border px-3 py-2 text-gray-600 leading-relaxed">
                同一品种或相近品种，大小基本均匀；表皮基本完整光滑；允许轻微弯曲、少量浅污痕；不允许腐烂、扩散性黑斑；允许存在轻微表皮划痕，无内伤腐烂
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border px-3 py-2 align-top">
                <Tag color="green" className="font-bold px-2 py-0.5">微型小果</Tag>
              </td>
              <td className="border px-3 py-2 text-gray-600 leading-relaxed">
                同一品种，果型小巧匀称；表皮完整、洁净无霉变；无腐烂、虫洞，无明显机械损伤，适合独立小包装销售
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    key: 'tolerance',
    header: '3. 等级允许误差',
    content: (
      <ul className="list-disc pl-5 space-y-1.5 text-gray-600 leading-relaxed">
        <li>一等果允许 <strong>5%</strong> 的产品不符合该等级的要求，但应符合二等果要求；</li>
        <li>二等果允许 <strong>10%</strong> 的产品不符合该等级的要求，但应符合基本要求；</li>
        <li>微型小果允许 <strong>10%</strong> 的产品不符合该等级的要求，但应符合基本要求。</li>
      </ul>
    ),
  },
  {
    key: 'spec',
    header: '4. 规格（单薯质量）',
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-green-50">
              <th className="border px-3 py-2 text-left font-semibold text-green-900">等级</th>
              <th className="border px-3 py-2 text-left font-semibold text-green-900">单薯质量</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-3 py-2">一等果</td><td className="border px-3 py-2">≥150g，≤400g</td></tr>
            <tr><td className="border px-3 py-2">二等果</td><td className="border px-3 py-2">＞400g 或 ≥50g，＜150g（畸形薯）</td></tr>
            <tr><td className="border px-3 py-2">微型小果</td><td className="border px-3 py-2">≥50g，≤150g（外形规整薯块）</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    key: 'seedling',
    header: '6. 种苗生态要求',
    content: (
      <ul className="list-disc pl-5 space-y-1.5 text-gray-600 leading-relaxed">
        <li>优先选用与辽宁省农科院合作培育的<strong>脱毒一代种苗</strong>；脱毒二代种苗仅限小规模自留使用，三代及以上退化种苗禁止规模化商品薯种植；</li>
        <li>全程主推有机肥、生态除草模式；采用风电、光伏绿电开展仓储、深加工的产品可予以<strong>认证加分</strong>。</li>
      </ul>
    ),
  },
  {
    key: 'sugar',
    header: '7. 糖化与仓储要求',
    content: (
      <ul className="list-disc pl-5 space-y-1.5 text-gray-600 leading-relaxed">
        <li>烟薯标准糖化周期 <strong>7d～15d</strong>；玛莎莉、哈密、52良作标准糖化周期 <strong>30d</strong>；未达到糖化标准的地瓜不得标注最优口感宣传用语；</li>
        <li>深加工原料优先选用一等果；二等果可用于大众休闲薯制品加工。</li>
      </ul>
    ),
  },
  {
    key: 'trace',
    header: '8. 溯源认证要求',
    content: (
      <div className="flex items-start gap-3">
        <ScanOutlined className="text-xl text-green-600 mt-0.5" />
        <p className="text-gray-600 leading-relaxed">
          成品外包装粘贴<strong>唯一溯源二维码</strong>，溯源信息至少包含：产地、品种、种苗代数、种植记录、地瓜等级、糖化周期、检测报告、采收日期。
        </p>
      </div>
    ),
  },
];

// ============================================================
// 等级对比数据（Hero 下方三大等级展示）
// ============================================================
const gradeLevels = [
  {
    name: '一等果',
    en: 'PREMIUM',
    color: 'amber',
    icon: <TrophyOutlined />,
    desc: '表皮完整光滑，糖化充分，可溶性糖 ≥18Brix，品相俱佳',
    spec: '单薯 150g ~ 400g',
    features: ['完整洁净', '糖化达标', '零瑕疵'],
    gradient: 'from-amber-400 to-orange-500',
    ring: 'border-amber-200',
    badgeBg: 'bg-amber-50 text-amber-700',
  },
  {
    name: '二等果',
    en: 'STANDARD',
    color: 'blue',
    icon: <AppstoreOutlined />,
    desc: '表皮基本完整，允许轻微划痕与浅污痕，无腐烂无内伤',
    spec: '＞400g 或 50g ~ 150g 畸形薯',
    features: ['大小基本均匀', '轻微瑕疵', '无内伤'],
    gradient: 'from-blue-400 to-sky-500',
    ring: 'border-blue-200',
    badgeBg: 'bg-blue-50 text-blue-700',
  },
  {
    name: '微型小果',
    en: 'MINI',
    color: 'green',
    icon: <CheckCircleOutlined />,
    desc: '果型小巧匀称，适合独立小包装销售，零腐烂零霉变',
    spec: '单薯 50g ~ 150g 规整薯块',
    features: ['小巧匀称', '洁净无霉', '独立包装'],
    gradient: 'from-green-400 to-emerald-500',
    ring: 'border-green-200',
    badgeBg: 'bg-green-50 text-green-700',
  },
];

// ============================================================
// 认证流程数据
// ============================================================
const certProcess = [
  { icon: <RiseOutlined />, title: '种苗优选', desc: '脱毒一代种苗\n农科院合作培育' },
  { icon: <ThunderboltOutlined />, title: '生态种植', desc: '有机肥主推\n生态除草模式' },
  { icon: <ExperimentOutlined />, title: '品质检测', desc: 'AI 智能评级\n绿色食品标准' },
  { icon: <FieldTimeOutlined />, title: '标准糖化', desc: '烟薯 7~15 天\n玛莎莉 30 天' },
  { icon: <DeploymentUnitOutlined />, title: '一物一码', desc: '唯一溯源二维码\n全链条可追溯' },
];

// ============================================================
// AI 分析加载动画（扫描 + 转圈）
// ============================================================
const AI_ANALYSIS_STEPS = [
  '正在扫描地瓜外观...',
  '正在分析表皮状态...',
  '正在评估规格尺寸...',
  '正在检测缺陷特征...',
  '正在比对分级标准...',
  'AI 评级完成！',
];

const AILoadingOverlay = () => {
  const [step, setStep] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < AI_ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl"
    >
      {/* 中央雷达扫描动画 */}
      <div className="relative w-28 h-28 mb-6">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-green-500/30 border-t-green-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border-2 border-green-400/40 border-b-green-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
          <ScanOutlined className="text-white text-2xl" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, rgba(16,185,129,0.35), transparent 60%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* 状态文案 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="text-center px-8"
        >
          <p className="text-green-700 font-bold text-base mb-1.5">{AI_ANALYSIS_STEPS[step]}</p>
          <p className="text-xs text-gray-400">
            AI 正在依据《沙地地瓜生态品质认证指标体系》进行多维度评定
          </p>
        </motion.div>
      </AnimatePresence>

      {/* 进度条 */}
      <div className="w-56 h-1.5 bg-gray-100 rounded-full mt-5 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 8.4, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};

// ============================================================
// 等级标签组件
// ============================================================
const GradeBadge = ({ grade }) => {
  const map = {
    '一等果': { color: 'gold', icon: <TrophyOutlined />, bg: 'from-amber-50 to-yellow-50', border: 'border-amber-300', text: 'text-amber-800' },
    '二等果': { color: 'blue', icon: <CheckCircleOutlined />, bg: 'from-blue-50 to-sky-50', border: 'border-blue-300', text: 'text-blue-800' },
    '微型小果': { color: 'green', icon: <CheckCircleOutlined />, bg: 'from-green-50 to-emerald-50', border: 'border-green-300', text: 'text-green-800' },
    '坏果': { color: 'red', icon: <CloseCircleOutlined />, bg: 'from-red-50 to-rose-50', border: 'border-red-300', text: 'text-red-800' },
    '无法识别': { color: 'default', icon: <QuestionOutlined />, bg: 'from-gray-50 to-slate-100', border: 'border-gray-300', text: 'text-gray-700' },
  };
  const style = map[grade] || { color: 'red', icon: <CloseCircleOutlined />, bg: 'from-red-50 to-rose-50', border: 'border-red-300', text: 'text-red-800' };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${style.bg} border ${style.border}`}>
      <span className={`text-lg ${style.text}`}>{style.icon}</span>
      <span className={`font-bold text-lg ${style.text}`}>{grade}</span>
    </div>
  );
};

// ============================================================
// 主页面组件
// ============================================================
const Grading = () => {
  const [fileList, setFileList] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);
  const aiSectionRef = useRef(null);

  // 处理图片上传
  const handleUpload = (file) => {
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
      setFileList([file]);
    };
    reader.readAsDataURL(file);
    return false;
  };

  // 清除图片
  const handleClear = () => {
    setFileList([]);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  // 滚动到 AI 评级区
  const scrollToAI = () => {
    aiSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 发送图片到 MIMO API 进行评级
  const handleGrade = async () => {
    if (fileList.length === 0) {
      message.warning('请先上传地瓜图片');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', fileList[0]);
      formData.append('prompt', GRADING_PROMPT);

      const response = await fetch(MIMO_API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `请求失败 (${response.status})`);
      }

      const data = await response.json();

      // 尝试解析 MIMO 返回的 JSON（可能在 content 字段中）
      let parsed = data;
      if (data.content && typeof data.content === 'string') {
        try {
          const jsonMatch = data.content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0]);
          } else {
            parsed = { raw_response: data.content };
          }
        } catch {
          parsed = { raw_response: data.content };
        }
      }

      setResult(parsed);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } catch (err) {
      setError(err.message);
      message.error(`评级失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50">
      {/* ========== 1. Hero 首屏 ========== */}
      <header className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* 背景图 */}
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10 }} className="absolute inset-0">
          <img src="/digua.jpg" className="w-full h-full object-cover opacity-50" alt="沙地地瓜" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-slate-50"></div>
        </motion.div>

        {/* 装饰光斑 */}
        <motion.div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-green-500/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-20 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/25 text-green-200 text-xs font-bold tracking-[0.2em] uppercase">
              <SafetyCertificateOutlined /> 彰武沙地 · 生态品质认证
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 text-5xl md:text-7xl font-serif font-black text-white leading-tight drop-shadow-lg"
          >
            沙地地瓜
            <span className="block mt-2 bg-gradient-to-r from-green-300 via-emerald-200 to-amber-200 bg-clip-text text-transparent">
              生态品质认证
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 text-white/80 leading-relaxed text-sm md:text-base max-w-2xl mx-auto"
          >
            一套覆盖 <strong className="text-white">外观、规格、糖化、种苗、溯源</strong> 的全链条品质评价体系，
            <br className="hidden md:block" />
            从沙地到餐桌，每一颗地瓜都有它应有的身份认证。
          </motion.p>

          {/* 数据徽章 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { num: '3', label: '大品质等级' },
              { num: '8', label: '项认证指标' },
              { num: '2', label: '档规格标准' },
              { num: '1', label: '物一码溯源' },
            ].map((item) => (
              <div key={item.label} className="px-4 py-4 rounded-2xl bg-white/8 backdrop-blur border border-white/15">
                <div className="text-3xl font-serif font-black text-white">{item.num}</div>
                <div className="text-[11px] text-white/60 tracking-widest mt-1">{item.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA 按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={scrollToAI}
              className="px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-900/40 flex items-center gap-2 group"
            >
              <CameraOutlined /> AI 智能评级
              <DownOutlined className="text-xs group-hover:translate-y-0.5 transition-transform" />
            </button>
            <a
              href="#standards"
              className="px-8 py-3.5 text-white border border-white/30 rounded-full font-medium hover:bg-white/10 backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              查看分级标准 <RightOutlined className="text-xs" />
            </a>
          </motion.div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* ========== 2. AI 智能评级 ========== */}
        <div ref={aiSectionRef} className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="pt-20 pb-4"
          >
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 text-green-800 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                <ThunderboltOutlined /> AI 智能评级
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                拍照上传，<span className="text-green-700">秒出等级</span>
              </h2>
              <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto">
                基于 MiMo 多模态大模型，依据《沙地地瓜生态品质认证指标体系》自动评定
              </p>
            </div>

            <Card
              className="shadow-lg border-0 rounded-2xl overflow-hidden"
              styles={{ body: { padding: '28px' } }}
            >
              {/* 上传 + 评级说明 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div
                    className={`relative border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                      ${previewUrl
                        ? 'border-green-400 bg-green-50/30 h-64'
                        : 'border-gray-300 hover:border-green-400 hover:bg-green-50/30 h-64 cursor-pointer'
                      }`}
                    onClick={() => !previewUrl && document.getElementById('grading-upload-input').click()}
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="上传预览" className="absolute inset-0 w-full h-full object-contain p-2" />
                        <button
                          onClick={(e) => { e.stopPropagation(); handleClear(); }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-md z-10"
                          title="移除图片"
                        >
                          <DeleteOutlined />
                        </button>
                        <AnimatePresence>
                          {loading && <AILoadingOverlay />}
                        </AnimatePresence>
                      </>
                    ) : (
                      <div className="text-center px-4">
                        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-3">
                          <CameraOutlined className="text-2xl text-green-500" />
                        </div>
                        <p className="text-gray-500 font-medium mb-1">点击或拖拽上传地瓜图片</p>
                        <p className="text-xs text-gray-400">支持 JPG / PNG / WebP，单张不超过 10MB</p>
                      </div>
                    )}
                  </div>
                  <input
                    id="grading-upload-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file);
                      e.target.value = '';
                    }}
                  />

                  <div className="flex gap-3 mt-4">
                    {previewUrl && (
                      <Button
                        icon={<SwapOutlined />}
                        onClick={() => { setPreviewUrl(null); setFileList([]); setResult(null); document.getElementById('grading-upload-input').click(); }}
                        disabled={loading}
                      >
                        换一张
                      </Button>
                    )}
                    <Button
                      type="primary"
                      onClick={handleGrade}
                      disabled={!previewUrl || loading}
                      loading={loading}
                      className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 font-medium flex-1 md:flex-none"
                      size="large"
                    >
                      {loading ? 'AI 评级中...' : '开始智能评级'}
                    </Button>
                  </div>
                </div>

                {/* 评级说明 */}
                <div className="md:w-60 flex-shrink-0">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 h-full">
                    <h4 className="font-bold text-slate-700 mb-4 text-sm flex items-center gap-2">
                      <TrophyOutlined className="text-amber-500" /> 评级维度
                    </h4>
                    <div className="space-y-3">
                      {[
                        { dot: 'bg-amber-400', label: '外观品相' },
                        { dot: 'bg-blue-400', label: '规格尺寸' },
                        { dot: 'bg-green-400', label: '表皮状态' },
                        { dot: 'bg-red-400', label: '缺陷检测' },
                        { dot: 'bg-purple-400', label: '糖化推断' },
                      ].map((d) => (
                        <div key={d.label} className="flex items-center gap-2.5">
                          <span className={`w-2 h-2 rounded-full ${d.dot}`}></span>
                          <span className="text-sm text-gray-600">{d.label}</span>
                        </div>
                      ))}
                    </div>
                    <Divider className="my-4" />
                    <p className="text-xs text-gray-400 leading-relaxed">
                      AI 将严格依据分级指标体系中 8 项认证指标进行多维度综合评定
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <CloseCircleOutlined className="mr-2" />{error}
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* ========== 3. AI 评级结果 ========== */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="pt-6"
            >
              <Card
                className="shadow-lg border-0 rounded-2xl overflow-hidden border-l-4 border-l-green-500"
                title={
                  <div className="flex items-center gap-3 py-1">
                    <SafetyCertificateOutlined className="text-xl text-green-600" />
                    <span className="text-lg font-bold text-slate-800">评级结果</span>
                  </div>
                }
                styles={{ body: { padding: '24px' } }}
              >
                {result.raw_response ? (
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {result.raw_response}
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm text-gray-500 font-medium">综合评级：</span>
                      <GradeBadge grade={result.overall_grade || '—'} />
                      {result.confidence && (
                        <Tag color={result.confidence === '高' ? 'green' : result.confidence === '中' ? 'orange' : 'red'}>
                          置信度：{result.confidence}
                        </Tag>
                      )}
                      {result.meets_basic_requirements !== undefined && (
                        <Tag
                          icon={result.meets_basic_requirements ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                          color={result.meets_basic_requirements ? 'success' : 'error'}
                        >
                          {result.meets_basic_requirements ? '符合基本要求' : '不符合基本要求'}
                        </Tag>
                      )}
                    </div>

                    {/* 边界情况警示横幅 */}
                    {result.overall_grade === '坏果' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-start gap-3 bg-red-50 border border-red-300 rounded-xl p-4"
                      >
                        <CloseCircleOutlined className="text-2xl text-red-600 mt-0.5" />
                        <div>
                          <p className="font-bold text-red-700 mb-0.5">⚠️ 检测到坏果 — 禁止上市销售</p>
                          <p className="text-sm text-red-600 leading-relaxed">
                            该地瓜存在腐烂、霉变或严重病害，不符合《沙地地瓜生态品质认证指标体系》基本要求，
                            应予以剔除，不得进入流通环节。
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {result.overall_grade === '无法识别' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-start gap-3 bg-gray-50 border border-gray-300 rounded-xl p-4"
                      >
                        <QuestionOutlined className="text-2xl text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-700 mb-0.5">图片中未识别到地瓜主体</p>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            请上传包含地瓜（红薯/甘薯）的清晰图片后重新评级，
                            建议单颗地瓜居中拍摄、光线充足。
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {result.analysis && (
                      <Descriptions
                        bordered
                        size="small"
                        column={{ xs: 1, sm: 2 }}
                        labelStyle={{ fontWeight: 600, background: '#f8fafc', width: 120 }}
                      >
                        {result.analysis.appearance && (
                          <Descriptions.Item label="外观评价">{result.analysis.appearance}</Descriptions.Item>
                        )}
                        {result.analysis.size_estimation && (
                          <Descriptions.Item label="规格估算">{result.analysis.size_estimation}</Descriptions.Item>
                        )}
                        {result.analysis.skin_condition && (
                          <Descriptions.Item label="表皮状态">{result.analysis.skin_condition}</Descriptions.Item>
                        )}
                        {result.analysis.defects && (
                          <Descriptions.Item label="缺陷描述">{result.analysis.defects}</Descriptions.Item>
                        )}
                        {result.analysis.sugarization && (
                          <Descriptions.Item label="糖化状态">{result.analysis.sugarization}</Descriptions.Item>
                        )}
                      </Descriptions>
                    )}

                    {result.basic_requirement_details && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm font-bold text-slate-700 mb-1">基本要求符合情况</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{result.basic_requirement_details}</p>
                      </div>
                    )}

                    {result.suggestions && (
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                        <p className="text-sm font-bold text-amber-800 mb-1">品质提升建议</p>
                        <p className="text-sm text-amber-700 leading-relaxed">{result.suggestions}</p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========== 4. 三大等级对比 ========== */}
        <section id="levels" className="pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 text-amber-800 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <TrophyOutlined /> 品质等级体系
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              三大等级，<span className="text-amber-600">各具其美</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">每个等级都有明确的标准与定位，从臻品到精致小果</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gradeLevels.map((level, idx) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 border ${level.ring} overflow-hidden`}
              >
                {/* 顶部渐变 */}
                <div className={`h-1.5 bg-gradient-to-r ${level.gradient}`} />
                {/* 背景水印 */}
                <div className={`absolute -right-4 -bottom-6 text-8xl font-serif font-black opacity-5 group-hover:opacity-10 transition-opacity`}>
                  {idx + 1}
                </div>

                <div className="p-6 md:p-7">
                  {/* 图标 */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center text-white text-xl shadow-lg mb-5`}>
                    {level.icon}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-serif font-bold text-slate-900">{level.name}</h3>
                  </div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-bold mb-4">{level.en}</p>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{level.desc}</p>

                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${level.badgeBg} mb-4`}>
                    {level.spec}
                  </div>

                  {/* 特性列表 */}
                  <div className="space-y-2">
                    {level.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircleOutlined className={`text-xs ${level.name === '一等果' ? 'text-amber-500' : level.name === '二等果' ? 'text-blue-500' : 'text-green-500'}`} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== 5. 认证流程 ========== */}
        <section className="pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 text-green-800 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <SafetyCertificateOutlined /> 生态认证流程
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              从种苗到餐桌的<span className="text-green-700">五步认证</span>
            </h2>
          </motion.div>

          {/* 流程时间线（桌面端横向，移动端纵向） */}
          <div className="relative">
            {/* 连接线（桌面） */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-green-200 via-emerald-300 to-green-200" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3">
              {certProcess.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative flex md:flex-col items-center gap-4 md:gap-0 md:text-center"
                >
                  {/* 节点 */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-green-200 shadow-md flex items-center justify-center text-2xl text-green-600 group-hover:scale-110 transition-transform md:mx-auto">
                      {step.icon}
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="md:mt-4">
                    <h4 className="font-bold text-slate-800 mb-1">{step.title}</h4>
                    <p className="text-xs text-gray-500 whitespace-pre-line leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 6. 指标体系卡片 ========== */}
        <section id="standards" className="pt-20 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 text-amber-800 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              <FileTextOutlined /> 指标体系
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              沙地地瓜生态品质<span className="text-green-700">认证指标体系</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">适用于彰武沙地鲜食地瓜的全链条品质评价</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gradeStandards.map((section, idx) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden border border-gray-100 ${
                  idx === gradeStandards.length - 1 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-300 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-4 right-5 text-4xl font-serif font-black text-gray-100 group-hover:text-green-100 transition-colors">
                  {section.key === 'basic' ? '01' : section.key === 'grade' ? '02' : section.key === 'tolerance' ? '03' : section.key === 'spec' ? '04' : section.key === 'seedling' ? '06' : section.key === 'sugar' ? '07' : '08'}
                </span>

                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-emerald-50 border border-green-200 flex items-center justify-center group-hover:from-green-500 group-hover:to-emerald-600 group-hover:border-transparent transition-all duration-300">
                      {section.key === 'basic' && <CheckCircleOutlined className="text-green-600 group-hover:text-white text-sm transition-colors" />}
                      {section.key === 'grade' && <TrophyOutlined className="text-green-600 group-hover:text-white text-sm transition-colors" />}
                      {section.key === 'tolerance' && <AppstoreOutlined className="text-green-600 group-hover:text-white text-sm transition-colors" />}
                      {section.key === 'spec' && <FileTextOutlined className="text-green-600 group-hover:text-white text-sm transition-colors" />}
                      {section.key === 'seedling' && <SafetyCertificateOutlined className="text-green-600 group-hover:text-white text-sm transition-colors" />}
                      {section.key === 'sugar' && <ExperimentOutlined className="text-green-600 group-hover:text-white text-sm transition-colors" />}
                      {section.key === 'trace' && <ScanOutlined className="text-green-600 group-hover:text-white text-sm transition-colors" />}
                    </div>
                    <h3 className="font-bold text-slate-800 group-hover:text-green-700 transition-colors">
                      {section.header}
                    </h3>
                  </div>

                  <div className="text-sm leading-relaxed">{section.content}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== 7. 底部 CTA ========== */}
        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 text-center"
          >
            {/* 装饰 */}
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-green-500/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative z-10">
              <ScanOutlined className="text-4xl text-green-300 mb-5" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                扫码溯源功能即将上线
              </h2>
              <p className="text-white/70 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                每颗地瓜都将拥有唯一的溯源二维码，
                <br />
                产地、等级、糖化周期，一扫即知。
              </p>
              <button
                onClick={scrollToAI}
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

export default Grading;
