<script setup lang="ts">
import { withBase } from "vitepress";
import { computed, onMounted, onUnmounted, ref } from "vue";

import CCDailyQuote from "./CCDailyQuote.vue";

interface ChapterItem {
  num: string;
  title: string;
  group:
    | "cell_molecular"
    | "genetics_evolution"
    | "homeostasis_regulation"
    | "ecology_environment"
    | "biotechnology_engineering"
    | "experiments";
  volume: "必修第一册" | "必修第二册" | "选必第一册" | "选必第二册" | "选必第三册" | "实验专题";
  volumeTag: "bx1" | "bx2" | "xb1" | "xb2" | "xb3" | "exp";
  fileCount: number;
  desc: string;
  focusTitle: string;
  focusLink: string;
  keywords: string[];
  link: string;
}

interface SpecialItem {
  title: string;
  badge: string;
  tagClass: "blue" | "yellow" | "red";
  desc: string;
  link: string;
  actionText: string;
  iconSvg: string;
}

const chapters: ChapterItem[] = [
  {
    num: "01",
    title: "走进细胞与组成细胞的分子",
    group: "cell_molecular",
    volume: "必修第一册",
    volumeTag: "bx1",
    fileCount: 6,
    desc: "细胞学说、原核与真核微观对比、水与无机盐抗逆平衡、糖脂代谢、蛋白质脱水缩合与核酸计算",
    focusTitle: "蛋白质脱水缩合与原子守恒计算模型",
    focusLink: "/01%20走进细胞与组成细胞的分子/05%20蛋白质是生命活动的主要承担者",
    keywords: [
      "细胞学说",
      "原核真核对比",
      "自由水结合水",
      "还原糖鉴定",
      "还原糖斐林试剂鉴定",
      "蛋白质双缩脲试剂",
      "核酸多样性与DNA/RNA",
      "脱水缩合计算",
      "原子守恒",
      "核酸多样性",
    ],
    link: "/01%20走进细胞与组成细胞的分子/index",
  },
  {
    num: "02",
    title: "细胞的基本结构与物质跨膜运输",
    group: "cell_molecular",
    volume: "必修第一册",
    volumeTag: "bx1",
    fileCount: 4,
    desc: "流动镶嵌模型、八大细胞器微区室分工、分泌蛋白膜面积演化、质壁分离与物质跨膜动力学",
    focusTitle: "物质跨膜运输方式与动力学曲线模型",
    focusLink: "/02%20细胞的基本结构与物质跨膜运输/04%20物质跨膜运输的实例与方式（被动与主动运输）",
    keywords: [
      "流动镶嵌模型",
      "生物膜系统",
      "分泌蛋白示踪",
      "核孔选择性",
      "质壁分离复原",
      "主动运输",
      "被动与主动运输",
      "自由扩散协助扩散",
      "囊泡胞吞胞吐",
    ],
    link: "/02%20细胞的基本结构与物质跨膜运输/index",
  },
  {
    num: "03",
    title: "细胞代谢与能量供应（酶、ATP与呼吸光合）",
    group: "cell_molecular",
    volume: "必修第一册",
    volumeTag: "bx1",
    fileCount: 5,
    desc: "降低活化能机理、ATP能量货币、有氧呼吸三阶段与液滴RQ模型、光反应碳反应与光照/CO2突变矩阵",
    focusTitle: "光合呼吸综合曲线与环境因子调控模型",
    focusLink:
      "/03%20细胞代谢与能量供应（酶、ATP与呼吸光合）/05%20光合呼吸综合曲线与环境因子调控模型",
    keywords: [
      "光合作用微观机理",
      "光合与细胞呼吸综合",
      "有氧呼吸与无氧呼吸",
      "酶降低活化能",
      "ATP能量偶联",
      "有氧呼吸三阶段",
      "液滴移动与RQ",
      "光合瞬时突变",
      "光补偿点饱和点",
      "光合午休机理",
    ],
    link: "/03%20细胞代谢与能量供应（酶、ATP与呼吸光合）/index",
  },
  {
    num: "04",
    title: "细胞的生命历程（增殖、分化、衰老与凋亡）",
    group: "cell_molecular",
    volume: "必修第一册",
    volumeTag: "bx1",
    fileCount: 4,
    desc: "细胞周期、动植物有丝分裂、减数分裂精卵形成差异、三看识别决策树、基因选择性表达与细胞衰老凋亡",
    focusTitle: "减数分裂与受精作用图像识别决策树",
    focusLink: "/04%20细胞的生命历程（增殖、分化、衰老与凋亡）/02%20减数分裂与受精作用（核心模型）",
    keywords: [
      "细胞周期",
      "有丝分裂曲线",
      "有丝分裂与减数分裂",
      "洋葱根尖有丝分裂实验",
      "减数分裂联会",
      "精卵形成差异",
      "三看识别法",
      "基因选择性表达",
      "细胞全能性与干细胞",
      "细胞凋亡自噬",
    ],
    link: "/04%20细胞的生命历程（增殖、分化、衰老与凋亡）/index",
  },
  {
    num: "05",
    title: "孟德尔遗传规律与伴性遗传",
    group: "genetics_evolution",
    volume: "必修第二册",
    volumeTag: "bx2",
    fileCount: 3,
    desc: "分离定律假说演绎法、配子概率法、自由组合16格棋盘、9:3:3:1变式全景矩阵、致死模型与遗传系谱图排查",
    focusTitle: "两对相对性状与9331变式全景矩阵",
    focusLink:
      "/05%20孟德尔遗传规律与伴性遗传/02%20两对相对性状杂交实验与9331变式全景矩阵（自由组合定律）",
    keywords: [
      "假说演绎法",
      "分离定律配子法",
      "自由组合实质",
      "自由组合9331变式矩阵",
      "致死突变模型",
      "伴性遗传区段",
      "系谱图三步排查",
      "伴性遗传与遗传系谱图",
    ],
    link: "/05%20孟德尔遗传规律与伴性遗传/index",
  },
  {
    num: "06",
    title: "基因的本质与中心法则（复制、转录与翻译）",
    group: "genetics_evolution",
    volume: "必修第二册",
    volumeTag: "bx2",
    fileCount: 3,
    desc: "探索遗传物质经典实验、减法原理、DNA双螺旋反向平行、半保留复制定量守恒模型、中心法则与表观遗传",
    focusTitle: "DNA 半保留复制定量数学模型与离心条带",
    focusLink:
      "/06%20基因的本质与中心法则（复制、转录与翻译）/02%20DNA%20的双螺旋结构与半保留复制计算模型",
    keywords: [
      "探索遗传物质实验",
      "噬菌体侵染示踪",
      "双螺旋反向平行",
      "半保留复制模型",
      "DNA半保留复制计算模型",
      "同位素离心条带",
      "中心法则与RNA转录翻译",
      "中心法则五向流",
      "表观遗传DNA甲基化",
    ],
    link: "/06%20基因的本质与中心法则（复制、转录与翻译）/index",
  },
  {
    num: "07",
    title: "生物的变异、育种与现代生物进化理论",
    group: "genetics_evolution",
    volume: "必修第二册",
    volumeTag: "bx2",
    fileCount: 3,
    desc: "基因突变与重组微观机理、染色体结构与数目变异、五大现代育种方案对比、哈代-温伯格平衡与基因频率计算",
    focusTitle: "染色体变异与现代育种方案全景对比",
    focusLink: "/07%20生物的变异、育种与现代生物进化理论/02%20染色体变异与现代育种方案全景",
    keywords: [
      "碱基增添替换缺失",
      "基因突变与基因重组",
      "染色体结构变异",
      "染色体变异与现代育种",
      "单倍体多倍体育种",
      "杂交诱变育种",
      "哈迪温伯格平衡",
      "哈代-温伯格平衡哈迪温伯格",
      "基因频率计算",
    ],
    link: "/07%20生物的变异、育种与现代生物进化理论/index",
  },
  {
    num: "08",
    title: "人体内环境与稳态",
    group: "homeostasis_regulation",
    volume: "选必第一册",
    volumeTag: "xb1",
    fileCount: 2,
    desc: "体液各组分划分、血浆-组织液-淋巴液动态水力学、内环境理化性质、pH缓冲机制与组织水肿五大诱因模型",
    focusTitle: "内环境稳态调节机制与组织水肿成因全景",
    focusLink: "/08%20人体内环境与稳态/02%20内环境稳态的调节机制与组织水肿成因全景",
    keywords: [
      "体液金三角",
      "内环境成分四看",
      "渗透压与酸碱缓冲",
      "稳态调节机制",
      "内环境稳态调节机制",
      "组织水肿成因",
      "组织水肿五大诱因模型",
      "跨膜层数计算",
    ],
    link: "/08%20人体内环境与稳态/index",
  },
  {
    num: "09",
    title: "动物生命活动的神经、体液与免疫调节",
    group: "homeostasis_regulation",
    volume: "选必第一册",
    volumeTag: "xb1",
    fileCount: 4,
    desc: "反射弧与膜电位、突触单向传递、血糖与下丘脑调控枢纽、体液与细胞特异性免疫防御网络及免疫失调病理",
    focusTitle: "神经调节微观机理与膜电位电流计分析模型",
    focusLink: "/09%20动物生命活动的神经、体液与免疫调节/01%20神经调节微观机理与膜电位分析模型",
    keywords: [
      "静息电位与动作电位",
      "神经调节与膜电位分析",
      "突触单向传递",
      "双极电流计偏转",
      "下丘脑调节枢纽",
      "体液免疫双信号",
      "特异性体液免疫与细胞免疫",
      "细胞毒性T细胞",
      "二次免疫应答",
    ],
    link: "/09%20动物生命活动的神经、体液与免疫调节/index",
  },
  {
    num: "10",
    title: "植物生命活动的激素调节",
    group: "homeostasis_regulation",
    volume: "选必第一册",
    volumeTag: "xb1",
    fileCount: 2,
    desc: "生长素发现史、PIN蛋白极性运输、根芽茎两重性敏感度曲线、五大植物激素协同拮抗网络与光敏色素环境信号",
    focusTitle: "生长素极性运输与根芽茎两重性作用模型",
    focusLink: "/10%20植物生命活动的激素调节/01%20生长素的发现、极性运输与两重性作用模型",
    keywords: [
      "生长素经典实验",
      "极性运输机理",
      "生长素两重性模型",
      "两重性敏感曲线",
      "生长素极性运输与根芽茎敏感度",
      "顶端优势根向重力",
      "五大植物激素协同",
      "光敏色素信号转导",
    ],
    link: "/10%20植物生命活动的激素调节/index",
  },
  {
    num: "11",
    title: "种群、群落与生态系统结构功能",
    group: "ecology_environment",
    volume: "选必第二册",
    volumeTag: "xb2",
    fileCount: 3,
    desc: "种群数量特征、J型与S型增长模型、K值与K/2渔业实践、群落演替动力学、生态系统能量流动收支方程与碳循环",
    focusTitle: "生态系统能量流动收支平衡与最值定量计算",
    focusLink: "/11%20种群、群落与生态系统结构功能/03%20生态系统结构、能量流动与物质循环定量模型",
    keywords: [
      "种群密度调查误差",
      "J型与S型增长方程",
      "种群增长J型S型方程与K值",
      "K值与K/2实践决策",
      "群落演替动力学",
      "生态位分化",
      "能量同化摄入方程",
      "生态系统能量流动收支最值",
      "碳循环与生态稳定性",
    ],
    link: "/11%20种群、群落与生态系统结构功能/index",
  },
  {
    num: "12",
    title: "人与环境及生态工程",
    group: "ecology_environment",
    volume: "选必第二册",
    volumeTag: "xb2",
    fileCount: 2,
    desc: "生态足迹六大维度、全球性生态问题、生物多样性三重价值与保护决策、生态工程四大原理与立体循环农业",
    focusTitle: "生态工程四大基本原理与典型应用案例",
    focusLink: "/12%20人与环境及生态工程/02%20生态工程基本原理与典型应用案例",
    keywords: [
      "生态足迹核算",
      "生态足迹核算与全球生态问题",
      "全球性生态问题",
      "生物多样性三价值",
      "生物多样性三价值与就地保护",
      "就地与易地保护",
      "生态工程四大原理",
      "生态工程四大基本原理",
      "桑基鱼塘循环",
      "能量利用率提高",
    ],
    link: "/12%20人与环境及生态工程/index",
  },
  {
    num: "13",
    title: "传统发酵技术与微生物培养应用",
    group: "biotechnology_engineering",
    volume: "选必第三册",
    volumeTag: "xb3",
    fileCount: 2,
    desc: "果酒果醋泡菜发酵机理、气体与杂菌控制、消毒灭菌决策树、平板划线与稀释涂布活菌计数模型",
    focusTitle: "微生物培养纯化与活菌计数定量模型",
    focusLink:
      "/13%20传统发酵技术与微生物培养应用/02%20微生物培养与纯化技术（无菌操作、接种与计数模型）",
    keywords: [
      "传统发酵三大菌种",
      "果酒果醋泡菜机理",
      "传统发酵果酒果醋泡菜",
      "亚硝酸盐消长曲线",
      "选择与鉴别培养基",
      "消毒与灭菌决策树",
      "平板划线稀释涂布",
      "活菌计数数学模型",
      "稀释涂布与活菌计数定量模型",
    ],
    link: "/13%20传统发酵技术与微生物培养应用/index",
  },
  {
    num: "14",
    title: "细胞工程（植物与动物细胞工程）",
    group: "biotechnology_engineering",
    volume: "选必第三册",
    volumeTag: "xb3",
    fileCount: 3,
    desc: "植物组培与脱毒苗、原生质体融合、动物细胞培养条件、体细胞核移植克隆、单克隆抗体二次筛选与胚胎工程",
    focusTitle: "单克隆抗体制备工艺与两次关键筛选",
    focusLink:
      "/14%20细胞工程（植物与动物细胞工程）/02%20动物细胞工程（细胞培养、核移植克隆与单克隆抗体制备）",
    keywords: [
      "植物组织培养脱毒",
      "植物组织培养脱毒与体细胞杂交",
      "植物体细胞杂交",
      "动物细胞贴壁接触抑制",
      "动物细胞培养核移植克隆",
      "核移植重构胚克隆",
      "HAT筛选杂交瘤",
      "单克隆抗体生物导弹",
      "单克隆抗体制备二次筛选",
      "胚胎移植与均等分割",
    ],
    link: "/14%20细胞工程（植物与动物细胞工程）/index",
  },
  {
    num: "15",
    title: "基因工程与生物技术安全性与伦理",
    group: "biotechnology_engineering",
    volume: "选必第三册",
    volumeTag: "xb3",
    fileCount: 2,
    desc: "限制酶连接酶质粒、PCR热循环与定量模型、基因表达载体构建、四级分子检测金标准与蛋白质工程逆向思维",
    focusTitle: "基因工程工具与 PCR 热循环定量模型",
    focusLink:
      "/15%20基因工程与生物技术安全性与伦理/01%20基因工程工具、PCR%20定量模型与表达载体构建",
    keywords: [
      "限制酶连接酶",
      "限制酶与DNA连接酶质粒载体",
      "PCR定量",
      "PCR扩增定量",
      "PCR定量与热循环倍增模型",
      "质粒表达载体构建",
      "农杆菌转化法",
      "四级分子检测",
      "蛋白质工程逆向思维",
      "生物技术安全伦理",
    ],
    link: "/15%20基因工程与生物技术安全性与伦理/index",
  },
  {
    num: "16",
    title: "高中生物经典实验专题与科学探究方法",
    group: "experiments",
    volume: "实验专题",
    volumeTag: "exp",
    fileCount: 2,
    desc: "统摄必修与选择性必修全套教材经典必做实验，涵盖试剂显色矩阵、微观装片制作、单一变量控制及高考实验设计满分答题模板",
    focusTitle: "高考实验设计原则、对照方法与满分答题模板",
    focusLink:
      "/16%20高中生物经典实验专题与科学探究方法/02%20高考实验设计原则、对照方法与满分答题模板",
    keywords: [
      "试剂显色矩阵",
      "显微镜使用与装片制作",
      "洋葱质壁分离复原引流法",
      "还原糖双缩脲脂肪",
      "斐林试剂双缩脲苏丹Ⅲ显色矩阵",
      "质壁分离引流法",
      "根尖有丝分裂解离漂洗",
      "色素提取层析四带",
      "绿叶色素提取纸层析四带",
      "单一变量与四大对照",
      "实验设计四步法",
      "实验设计满分答题模板",
    ],
    link: "/16%20高中生物经典实验专题与科学探究方法/index",
  },
];

const specialCards: SpecialItem[] = [
  {
    title: "50 大黄金结论与核心数量关系",
    badge: "秒杀定理矩阵",
    tagClass: "yellow",
    desc: "聚合细胞代谢、分离比与自由组合变式、中心法则数量关系、光合呼吸净量毛量代换与秒杀定理速查，高考考前压轴提分利器。",
    link: "/golden-conclusions",
    actionText: "速查结论",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
  {
    title: "全专题防踩坑排雷白皮书",
    badge: "考前避坑指南",
    tagClass: "red",
    desc: "系统梳理 16 大专题高频概念陷阱、实验单一变量控制漏洞、内环境管腔混淆与考场长句答题雷区，考前 1 小时速通排雷。",
    link: "/warning-cheatsheet",
    actionText: "查阅排雷",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  },
  {
    title: "16 款微观生命动态仿真模型",
    badge: "交互探究空间",
    tagClass: "blue",
    desc: "覆盖光合碳反应动力学、呼吸熵液滴移动、动作电位示波器、减数分裂、哈温平衡与PCR热循环等 16 大微观动态生命探究模型，支持全景调参实验。",
    link: "/interactive",
    actionText: "进入空间",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m3.6 9 16.8 6"/><path d="m3.6 15 16.8-6"/></svg>`,
  },
];

// 高频热门搜索词推荐
const hotSearchKeywords = [
  "光合呼吸",
  "减数分裂",
  "9331变式",
  "伴性遗传",
  "半保留复制",
  "动作电位",
  "体液免疫",
  "生长素两重性",
  "PCR定量",
];

// 交互状态
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchQuery = ref("");
const activeGroup = ref<string>("all");
const activeVolume = ref<string>("all");

// 分组配置与计数值
const groupTabs = [
  { key: "all", label: "全部专题", count: 16 },
  { key: "cell_molecular", label: "分子与细胞", count: 4 },
  { key: "genetics_evolution", label: "遗传与进化", count: 3 },
  { key: "homeostasis_regulation", label: "稳态与调节", count: 3 },
  { key: "ecology_environment", label: "生态与环境", count: 2 },
  { key: "biotechnology_engineering", label: "生物工程", count: 3 },
  { key: "experiments", label: "实验专题", count: 1 },
];

const volumeTabs = [
  { key: "all", label: "全部教材" },
  { key: "bx1", label: "必修一 (01-04)" },
  { key: "bx2", label: "必修二 (05-07)" },
  { key: "xb1", label: "选必一 (08-10)" },
  { key: "xb2", label: "选必二 (11-12)" },
  { key: "xb3", label: "选必三 (13-15)" },
  { key: "exp", label: "实验专题 (16)" },
];

const setGroup = (key: string) => {
  activeGroup.value = key;
  activeVolume.value = "all";
};

const setVolume = (key: string) => {
  activeVolume.value = key;
  activeGroup.value = "all";
};

const applyKeyword = (kw: string) => {
  if (searchQuery.value === kw) {
    searchQuery.value = "";
  } else {
    searchQuery.value = kw;
  }
  activeGroup.value = "all";
  activeVolume.value = "all";
  if (searchInputRef.value) {
    searchInputRef.value.focus();
  }
};

const clearFilters = () => {
  searchQuery.value = "";
  activeGroup.value = "all";
  activeVolume.value = "all";
};

// 键盘监听：按 / 聚焦搜索框，按 Esc 清空
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "/" && document.activeElement !== searchInputRef.value) {
    e.preventDefault();
    searchInputRef.value?.focus();
  } else if (e.key === "Escape" && document.activeElement === searchInputRef.value) {
    searchQuery.value = "";
    searchInputRef.value?.blur();
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("keydown", handleKeydown);
  }
});

// 智能匹配词元判定辅助算法
const matchSearchToken = (tok: string, targetText: string): boolean => {
  if (targetText.includes(tok)) return true;

  // 1. 常见领域后缀剥离匹配（如 "光合作用" -> "光合", "分离定律" -> "分离", "PCR技术" -> "pcr"）
  const stripped = tok.replace(/(作用|模型|定律|实验|技术|方法)$/, "");
  if (stripped && stripped.length >= 2 && targetText.includes(stripped)) return true;

  // 2. 字母/数字与中文混合拆分（如 "PCR定量" -> "pcr" + "定量", "9331变式" -> "9331" + "变式"）
  const alphaMatch = tok.match(/[a-z0-9]+/g);
  const hanMatch = tok.match(/[\u4e00-\u9fa5]+/g);
  if (alphaMatch && hanMatch) {
    const allAlpha = alphaMatch.every((a) => targetText.includes(a));
    const allHan = hanMatch.every((h) => targetText.includes(h));
    if (allAlpha && allHan) return true;
  }

  // 3. 多字中文复合词拆分检索（如 "生长素两重性" -> "生长素" + "两重性"）
  if (tok.length >= 4) {
    const mid = Math.floor(tok.length / 2);
    const part1 = tok.slice(0, mid);
    const part2 = tok.slice(mid);
    if (targetText.includes(part1) && targetText.includes(part2)) return true;

    if (tok.length === 5) {
      const p1 = tok.slice(0, 3);
      const p2 = tok.slice(3);
      if (targetText.includes(p1) && targetText.includes(p2)) return true;
    }
  }

  return false;
};

// 智能多词检索与学科分类过滤计算属性
const filteredChapters = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return chapters.filter((item) => {
    if (activeGroup.value !== "all" && item.group !== activeGroup.value) {
      return false;
    }
    if (activeVolume.value !== "all" && item.volumeTag !== activeVolume.value) {
      return false;
    }
    if (query) {
      const tokens = query.split(/\s+/).filter(Boolean);
      const targetText = [
        item.num,
        item.title,
        item.desc,
        item.focusTitle,
        item.volume,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return tokens.every((tok) => matchSearchToken(tok, targetText));
    }
    return true;
  });
});

const regularChapters = computed(() => {
  return filteredChapters.value.filter((ch) => ch.num !== "16");
});

const experimentChapter = computed(() => {
  return filteredChapters.value.find((ch) => ch.num === "16");
});
</script>

<template>
  <div class="ci-master-container">
    <!-- ============================================================
         1. Master Index Hero Header (顶级学术总索引巨幕)
         ============================================================ -->
    <header class="ci-hero-section">
      <div class="ci-hero-aura" aria-hidden="true" />

      <!-- 顶部发布胶囊 -->
      <div class="ci-pill-badge">
        <span class="ci-pill-dot" aria-hidden="true" />
        <span class="ci-pill-text">人教版新课标 5 册教材深度重构 · 2026 高考生物知识库</span>
        <span class="ci-pill-arrow">→</span>
      </div>

      <!-- 宏大主标题 -->
      <h1 class="ci-hero-title">
        <span class="ci-hero-title-main">高考生物知识库</span>
        <span class="ci-hero-title-tag">Yulaoshizuikeai's Biology Note</span>
      </h1>

      <!-- 核心定位导言 -->
      <p class="ci-hero-tagline">
        融合中国普通高中生物教科书（人教版必修 1-2 与选必 1-3 全套 5 册）与现代生命科学前沿思维。
        涵盖 <strong>16 大体系板块</strong>、<strong>48+ 幅自研高清矢量图解</strong> 与
        <strong>50 大核心黄金结论</strong
        >，助你建立贯通微观分子与宏观生态的完整生命图景，告别死记硬背与答题踩坑。
      </p>

      <!-- 核心快捷入口按钮组 -->
      <div class="ci-actions-group">
        <a :href="withBase('/00%20说明/Readme')" class="ci-btn ci-btn-primary">
          <svg
            class="ci-btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span>立即开始研读</span>
          <span class="ci-btn-arrow">→</span>
        </a>

        <a :href="withBase('/golden-conclusions')" class="ci-btn ci-btn-secondary">
          <svg
            class="ci-btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
          <span>50 大黄金结论速查</span>
        </a>

        <a :href="withBase('/warning-cheatsheet')" class="ci-btn ci-btn-ghost">
          <svg
            class="ci-btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>防踩坑排雷</span>
        </a>

        <a :href="withBase('/interactive')" class="ci-btn ci-btn-ghost">
          <svg
            class="ci-btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="m3.6 9 16.8 6" />
            <path d="m3.6 15 16.8-6" />
          </svg>
          <span>交互探究空间</span>
        </a>
      </div>

      <!-- 极简通透数据指标条 -->
      <div class="ci-stats-strip">
        <div class="ci-stat-col">
          <div class="ci-stat-number">16</div>
          <div class="ci-stat-title">大体系专题板块</div>
        </div>
        <div class="ci-stat-divider" aria-hidden="true" />
        <div class="ci-stat-col">
          <div class="ci-stat-number">48+</div>
          <div class="ci-stat-title">幅自研矢量图解</div>
        </div>
        <div class="ci-stat-divider" aria-hidden="true" />
        <div class="ci-stat-col">
          <div class="ci-stat-number">50</div>
          <div class="ci-stat-title">大核心黄金结论</div>
        </div>
        <div class="ci-stat-divider" aria-hidden="true" />
        <div class="ci-stat-col">
          <div class="ci-stat-number">100%</div>
          <div class="ci-stat-title">离线自托管可用</div>
        </div>
      </div>

      <!-- 考点微速记播报栏 -->
      <div class="ci-flash-bar">
        <ClientOnly>
          <CCDailyQuote />
        </ClientOnly>
      </div>
    </header>

    <!-- ============================================================
         2. Quick Chapter Directory (全新优化快捷章节索引系统)
         ============================================================ -->
    <section id="chapter-directory" class="ci-directory-section">
      <!-- 索引区域标题与说明 -->
      <div class="ci-directory-head">
        <div class="ci-head-left">
          <div class="ci-directory-tag-group">
            <span class="ci-directory-tag">CHAPTER DIRECTORY</span>
            <span class="ci-shortcut-tip">按 <kbd class="ci-kbd">/</kbd> 快速检索</span>
          </div>
          <h2 class="ci-directory-title">快捷章节索引</h2>
          <p class="ci-directory-sub">
            点击章节标题进入全景概览，或点击卡片内
            <strong>【🔥 核心模型】</strong> 快速攻克典型题型模型。
          </p>
        </div>
        <div class="ci-head-count">
          <span
            >匹配 <strong class="ci-highlight">{{ filteredChapters.length }}</strong> / 16
            个专题</span
          >
          <button
            v-if="searchQuery || activeGroup !== 'all' || activeVolume !== 'all'"
            type="button"
            class="ci-reset-pill"
            title="还原为展示全部 16 个专题"
            @click="clearFilters"
          >
            重置筛选
          </button>
        </div>
      </div>

      <!-- 现代化控制台中枢：搜索框 + 热门考点快速检索 + 多维筛选 -->
      <div class="ci-control-panel">
        <!-- 搜索框 -->
        <div class="ci-search-box">
          <svg class="ci-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <circle cx="8.5" cy="8.5" r="5.5" stroke-width="1.8" />
            <path d="M12.5 12.5L16.5 16.5" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            class="ci-search-input"
            placeholder="检索章节、模型或关键词（按 / 激活，按 Esc 清空）..."
            aria-label="快速检索章节"
          />
          <div class="ci-search-actions">
            <span v-if="!searchQuery" class="ci-search-hint">快捷键 /</span>
            <button
              v-else
              type="button"
              class="ci-search-clear"
              title="清除搜索 (Esc)"
              @click="searchQuery = ''"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- 热门高频考点点击直搜推荐条 -->
        <div class="ci-hot-row">
          <span class="ci-hot-label">🔥 热门考点:</span>
          <div class="ci-hot-chips">
            <button
              v-for="kw in hotSearchKeywords"
              :key="kw"
              type="button"
              class="ci-hot-chip"
              :class="{ 'is-active': searchQuery === kw }"
              @click="applyKeyword(kw)"
            >
              {{ kw }}
            </button>
          </div>
        </div>

        <!-- 体系与教材分类控制器 -->
        <div class="ci-filters-container">
          <!-- 学科体系主标签 -->
          <div class="ci-filter-row">
            <div class="ci-filter-label">知识体系:</div>
            <div class="ci-filter-tabs">
              <button
                v-for="tab in groupTabs"
                :key="tab.key"
                type="button"
                class="ci-tab-btn"
                :class="{ 'is-active': activeGroup === tab.key && activeVolume === 'all' }"
                @click="setGroup(tab.key)"
              >
                <span>{{ tab.label }}</span>
                <span class="ci-tab-count">{{ tab.count }}</span>
              </button>
            </div>
          </div>

          <!-- 教材版本细筛标签 -->
          <div class="ci-filter-row ci-filter-row--sub">
            <div class="ci-filter-label">人教教材:</div>
            <div class="ci-filter-pills">
              <button
                v-for="v in volumeTabs"
                :key="v.key"
                type="button"
                class="ci-pill-btn"
                :class="{ 'is-active': activeVolume === v.key }"
                @click="setVolume(v.key)"
              >
                {{ v.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 章节网格区域 (前 15 章节为标准网格，第 16 实验专题为专属全景大卡片) -->
      <div v-if="filteredChapters.length > 0" class="ci-chapters-wrapper">
        <!-- 1~15 章节 3 列网格 -->
        <div v-if="regularChapters.length > 0" class="ci-chapter-grid">
          <div v-for="ch in regularChapters" :key="ch.num" class="ci-chapter-card">
            <!-- 顶部序号、教材徽章与文章篇数 -->
            <div class="ci-card-header">
              <div class="ci-card-header-left">
                <span class="ci-card-num">{{ ch.num }}</span>
                <span class="ci-card-vol-badge" :class="`vol-${ch.volumeTag}`">{{
                  ch.volume
                }}</span>
              </div>
              <span class="ci-card-meta">共 {{ ch.fileCount }} 篇</span>
            </div>

            <!-- 章节标题 (点击进入概览) -->
            <h3 class="ci-card-title">
              <a :href="withBase(ch.link)" class="ci-title-link">
                {{ ch.title }}
              </a>
            </h3>

            <!-- 章节概述 -->
            <p class="ci-card-desc">{{ ch.desc }}</p>

            <!-- 核心考点直达通道 (Highlight Focus Link) -->
            <a
              :href="withBase(ch.focusLink)"
              class="ci-focus-jump"
              title="直接研读本章核心考点模型"
            >
              <span class="ci-focus-tag">🔥 核心模型</span>
              <span class="ci-focus-title">{{ ch.focusTitle }}</span>
              <span class="ci-focus-arrow">→</span>
            </a>

            <!-- 核心关键词标签提炼 (点击即可快速二次检索) -->
            <div class="ci-card-keywords">
              <button
                v-for="(kw, idx) in ch.keywords.slice(0, 4)"
                :key="idx"
                type="button"
                class="ci-keyword-tag"
                :class="{ 'is-active': searchQuery === kw }"
                :title="`快速按「${kw}」过滤章节`"
                @click.prevent.stop="applyKeyword(kw)"
              >
                {{ kw }}
              </button>
            </div>

            <!-- 底部全景导读直达链接 -->
            <div class="ci-card-footer">
              <a :href="withBase(ch.link)" class="ci-card-action">
                <span>进入本章全景目录</span>
                <svg class="ci-card-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                  <path
                    d="M6 12l4-4-4-4"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- 16 生物经典实验专题：全景通栏核心卡片 (提供 4 大实验维度直接导航) -->
        <div v-if="experimentChapter" class="ci-pano-wrap">
          <div class="ci-chapter-card ci-chapter-card--pano">
            <div class="ci-pano-grid">
              <!-- 左侧主信息 -->
              <div class="ci-pano-main">
                <div class="ci-card-header">
                  <div class="ci-pano-header-left">
                    <span class="ci-card-num ci-card-num--pano">{{ experimentChapter.num }}</span>
                    <span class="ci-card-vol-badge vol-exp">高考压轴实验专题</span>
                  </div>
                  <span class="ci-pano-indicator">全面攻克 12-15 分主观实验大题</span>
                </div>

                <h3 class="ci-card-title ci-card-title--pano">
                  <a :href="withBase(experimentChapter.link)" class="ci-title-link">
                    {{ experimentChapter.title }}
                  </a>
                </h3>

                <p class="ci-card-desc ci-card-desc--pano">
                  统摄必修与选择性必修全套教材经典必做实验，涵盖四大有机物显色矩阵、经典显微装片制作、单一变量控制及高考实验设计满分答题模板。
                </p>

                <!-- 实验压轴考点直达 -->
                <a
                  :href="withBase(experimentChapter.focusLink)"
                  class="ci-focus-jump ci-focus-jump--pano"
                  title="直接研读实验设计与满分答题模板"
                >
                  <span class="ci-focus-tag">🔥 压轴设计</span>
                  <span class="ci-focus-title">{{ experimentChapter.focusTitle }}</span>
                  <span class="ci-focus-arrow">→</span>
                </a>

                <div class="ci-card-footer ci-card-footer--pano">
                  <a :href="withBase(experimentChapter.link)" class="ci-card-action">
                    <span>研读实验完整体系与设计规范 →</span>
                  </a>
                </div>
              </div>

              <!-- 右侧四大实验板块直达导航 (2x2 网格) -->
              <div class="ci-pano-subtopics">
                <a
                  :href="
                    withBase(
                      '/16%20高中生物经典实验专题与科学探究方法/01%20高中生物教材必做实验全景速查与试剂显色矩阵#一-第一性原理高中生物核心化学试剂与显色反应矩阵',
                    )
                  "
                  class="ci-pano-subcard"
                >
                  <div class="ci-subcard-title">
                    <span class="ci-subcard-bullet bullet-blue" />
                    试剂鉴定与显色反应
                  </div>
                  <p class="ci-subcard-desc">
                    斐林试剂测还原糖、双缩脲测蛋白质、苏丹Ⅲ测脂肪、二苯胺沸水浴测DNA
                  </p>
                </a>

                <a
                  :href="
                    withBase(
                      '/16%20高中生物经典实验专题与科学探究方法/01%20高中生物教材必做实验全景速查与试剂显色矩阵#二-细胞学显微观察类实验深度解构',
                    )
                  "
                  class="ci-pano-subcard"
                >
                  <div class="ci-subcard-title">
                    <span class="ci-subcard-bullet bullet-green" />
                    显微观察与装片制作
                  </div>
                  <p class="ci-subcard-desc">
                    紫色洋葱质壁分离及自动复原、根尖分生区有丝分裂解离漂洗制片规范
                  </p>
                </a>

                <a
                  :href="
                    withBase(
                      '/16%20高中生物经典实验专题与科学探究方法/01%20高中生物教材必做实验全景速查与试剂显色矩阵#四-生理与生化定量实验核心考点',
                    )
                  "
                  class="ci-pano-subcard"
                >
                  <div class="ci-subcard-title">
                    <span class="ci-subcard-bullet bullet-purple" />
                    生理生化定量探究
                  </div>
                  <p class="ci-subcard-desc">
                    绿叶中色素提取与纸层析四带分离、酵母菌细胞呼吸方式对比探究
                  </p>
                </a>

                <a
                  :href="
                    withBase(
                      '/16%20高中生物经典实验专题与科学探究方法/02%20高考实验设计原则、对照方法与满分答题模板#四-实验设计标准四步法解题模板',
                    )
                  "
                  class="ci-pano-subcard"
                >
                  <div class="ci-subcard-title">
                    <span class="ci-subcard-bullet bullet-orange" />
                    实验设计与长句模板
                  </div>
                  <p class="ci-subcard-desc">
                    自变量与因变量控制、四大对照模式、标准四步法与探究性结论分类讨论
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 无搜索结果时友好回退 -->
      <div v-else class="ci-empty-state">
        <div class="ci-empty-icon">🔍</div>
        <h4 class="ci-empty-title">未找到匹配的生物章节</h4>
        <p class="ci-empty-desc">
          没有与 “{{ searchQuery }}” 相关的知识板块，请尝试换一个关键词或重置筛选。
        </p>
        <button type="button" class="ci-empty-reset" @click="clearFilters">重置所有筛选条件</button>
      </div>
    </section>

    <!-- ============================================================
         3. Special Highlights Section (考前必看三大特刊)
         ============================================================ -->
    <section class="ci-specials-section">
      <div class="ci-specials-head">
        <span class="ci-specials-tag">SPECIAL ARCHIVES</span>
        <h2 class="ci-specials-title">考前专项突破特刊</h2>
      </div>

      <div class="ci-specials-grid">
        <a
          v-for="item in specialCards"
          :key="item.title"
          :href="withBase(item.link)"
          class="ci-special-card"
          :class="`is-${item.tagClass}`"
        >
          <div class="ci-special-top">
            <span class="ci-special-badge" :class="`badge-${item.tagClass}`">{{ item.badge }}</span>
            <div class="ci-special-icon" v-html="item.iconSvg" />
          </div>
          <h3 class="ci-special-name">{{ item.title }}</h3>
          <p class="ci-special-desc">{{ item.desc }}</p>
          <div class="ci-special-action">
            <span>{{ item.actionText }}</span>
            <svg class="ci-special-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor">
              <path
                d="M6 12l4-4-4-4"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ============================================================
   Master Container & Global Spacing
   ============================================================ */
.ci-master-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 4rem;
  box-sizing: border-box;
}

/* ============================================================
   1. Master Index Hero Header
   ============================================================ */
.ci-hero-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 0 3.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 3.2rem;
  overflow: visible;
}

/* 柔和背景光晕 */
.ci-hero-aura {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 380px;
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent) 0%,
    color-mix(in srgb, var(--vp-c-brand-1) 3%, transparent) 45%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
  filter: blur(40px);
}

/* 顶部发布胶囊 */
.ci-pill-badge {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-elv));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 22%, var(--vp-c-border));
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 550;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.ci-pill-badge:hover {
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, var(--vp-c-bg-elv));
  transform: translateY(-1px);
}

.ci-pill-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent);
}

.ci-pill-arrow {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

/* 宏伟主标题 */
.ci-hero-title {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 1.25rem 0;
  border: none !important;
  padding: 0 !important;
}

.ci-hero-title-main {
  font-family: var(--vp-font-family-serif);
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #1b4332;
  background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark .ci-hero-title-main {
  color: #52b788;
  background: linear-gradient(135deg, #52b788 0%, #74c69d 50%, #95d5b2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ci-hero-title-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
}

/* 核心导言 */
.ci-hero-tagline {
  position: relative;
  z-index: 1;
  max-width: 820px;
  font-size: 1.06rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  margin: 0 0 2rem 0;
}

.ci-hero-tagline strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

/* 快捷行动按钮组 */
.ci-actions-group {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 2.2rem;
}

.ci-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.ci-btn-primary {
  background: var(--vp-c-brand-1);
  color: #ffffff !important;
  border: 1px solid var(--vp-c-brand-1);
  box-shadow: 0 4px 14px rgba(45, 106, 79, 0.3);
}

.ci-btn-primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(45, 106, 79, 0.42);
}

.ci-btn-arrow {
  transition: transform 0.2s ease;
}

.ci-btn-primary:hover .ci-btn-arrow {
  transform: translateX(3px);
}

.ci-btn-secondary {
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-elv));
  color: var(--vp-c-brand-1) !important;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 24%, var(--vp-c-border));
  box-shadow: var(--vp-shadow-1);
}

.ci-btn-secondary:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, var(--vp-c-bg-elv));
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
  box-shadow: var(--vp-shadow-2);
}

.ci-btn-ghost {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-2) !important;
  border: 1px solid var(--vp-c-border);
  box-shadow: var(--vp-shadow-1);
}

.ci-btn-ghost:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
  transform: translateY(-1px);
}

.ci-btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* 通透学术指标条 */
.ci-stats-strip {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
}

.ci-stat-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.ci-stat-number {
  font-family: var(--vp-font-family-mono);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1.15;
}

.ci-stat-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  letter-spacing: 0.02em;
}

.ci-stat-divider {
  width: 1px;
  height: 28px;
  background: var(--vp-c-divider);
}

/* 每日速记微电台嵌入栏 */
.ci-flash-bar {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}

/* ============================================================
   2. Quick Chapter Directory (优化后的现代化章节索引系统)
   ============================================================ */
.ci-directory-section {
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 1.5rem);
  margin-bottom: 4rem;
}

.ci-directory-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.ci-directory-tag-group {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0.35rem;
}

.ci-directory-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.ci-shortcut-tip {
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.ci-kbd {
  display: inline-block;
  padding: 1px 5px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
}

.ci-directory-title {
  font-family: var(--vp-font-family-serif);
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem 0;
  border: none !important;
  padding: 0 !important;
}

.ci-directory-sub {
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.ci-directory-sub strong {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.ci-head-count {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.ci-reset-pill {
  font-family: var(--vp-font-family-base);
  font-size: 0.72rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 9999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
  cursor: pointer;
  transition: all 0.16s ease;
}

.ci-reset-pill:hover {
  color: #ef4444;
  border-color: #ef4444;
  background: color-mix(in srgb, #ef4444 8%, var(--vp-c-bg-soft));
}

.ci-highlight {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

/* 控制台整体容器 */
.ci-control-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1.4rem;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  box-shadow: var(--vp-shadow-1);
  margin-bottom: 2rem;
}

/* 搜索框与热键提示 */
.ci-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.ci-search-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.ci-search-input {
  width: 100%;
  min-height: 48px;
  padding: 10px 80px 10px 42px;
  font-size: 0.92rem;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  transition: all 0.2s ease;
}

.ci-search-input:focus {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-elv);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent);
}

.ci-search-actions {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.ci-search-hint {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.ci-search-clear {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.16s ease;
}

.ci-search-clear:hover {
  background: var(--vp-c-gutter);
  color: var(--vp-c-text-1);
}

/* 热门高频考点快速直搜标签 */
.ci-hot-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ci-hot-label {
  font-size: 0.78rem;
  font-weight: 650;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.ci-hot-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.ci-hot-chip {
  padding: 3px 8px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.ci-hot-chip:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-soft));
}

.ci-hot-chip.is-active {
  color: #ffffff;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

/* 筛选分类组合 */
.ci-filters-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.6rem;
  border-top: 1px dashed var(--vp-c-divider);
}

.ci-filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.ci-filter-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  width: 62px;
  flex-shrink: 0;
}

.ci-filter-tabs,
.ci-filter-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.ci-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 6px 13px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.ci-tab-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
}

.ci-tab-btn.is-active {
  color: #ffffff;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(45, 106, 79, 0.25);
}

.ci-tab-count {
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  opacity: 0.85;
}

.ci-pill-btn {
  min-height: 28px;
  padding: 3px 10px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.ci-pill-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-border);
}

.ci-pill-btn.is-active {
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  border-color: var(--vp-c-brand-1);
  font-weight: 600;
}

/* ============================================================
   1~15 章节卡片 3 列网格 (高信息密度与重点考点直达)
   ============================================================ */
.ci-chapters-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.ci-chapter-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.ci-chapter-card {
  display: flex;
  flex-direction: column;
  padding: 1.35rem 1.4rem;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  color: var(--vp-c-text-1);
  box-shadow: var(--vp-shadow-card, 0 1px 3px rgba(0, 0, 0, 0.04));
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.ci-chapter-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-3);
}

.ci-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.ci-card-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ci-card-num {
  font-family: var(--vp-font-family-mono);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.ci-card-vol-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 0.72rem;
  font-weight: 600;
  border-radius: 9999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-border);
}

.vol-bx1 {
  background: var(--bio-q1-bg, #eaf5ee);
  color: var(--bio-q1-text, #246b46);
  border-color: var(--bio-q1-border, rgba(36, 107, 70, 0.2));
}

.vol-bx2 {
  background: var(--bio-q2-bg, #f6f3ec);
  color: var(--bio-q2-text, #7a6234);
  border-color: var(--bio-q2-border, rgba(122, 98, 52, 0.2));
}

.vol-xb1 {
  background: var(--bio-q3-bg, #fdf0ee);
  color: var(--bio-q3-text, #9e3e37);
  border-color: var(--bio-q3-border, rgba(158, 62, 55, 0.2));
}

.vol-xb2 {
  background: var(--bio-q4-bg, #edf4ea);
  color: var(--bio-q4-text, #34633b);
  border-color: var(--bio-q4-border, rgba(52, 99, 59, 0.2));
}

.vol-xb3 {
  background: var(--bio-q4-alt-bg, #f1effc);
  color: var(--bio-q4-alt-text, #533ea6);
  border-color: var(--bio-q4-alt-border, rgba(83, 62, 166, 0.2));
}

.vol-exp {
  background: var(--vp-custom-block-warning-bg, #fbf7ee);
  color: var(--vp-custom-block-warning-text, #7a6234);
  border-color: var(--vp-custom-block-warning-border, rgba(180, 120, 20, 0.25));
}

.ci-card-meta {
  font-family: var(--vp-font-family-mono);
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
}

.ci-card-title {
  font-size: 1.08rem;
  font-weight: 650;
  color: var(--vp-c-text-1);
  line-height: 1.35;
  margin: 0 0 0.45rem 0;
  letter-spacing: -0.015em;
}

.ci-title-link {
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  transition: color 0.18s ease;
}

.ci-title-link:hover {
  color: var(--vp-c-brand-1) !important;
}

.ci-card-desc {
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0 0 0.85rem 0;
}

/* 核心压轴考点直达通道 (Highlight Focus Jump Pill) */
.ci-focus-jump {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 7%, var(--vp-c-bg-soft));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
  border-radius: 8px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  margin-bottom: 0.85rem;
  transition: all 0.18s ease;
}

.ci-focus-jump:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, var(--vp-c-bg-soft));
  border-color: var(--vp-c-brand-1);
}

.ci-focus-tag {
  font-size: 0.7rem;
  font-weight: 700;
  color: #ea580c;
  white-space: nowrap;
}

.ci-focus-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ci-focus-arrow {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  transition: transform 0.18s ease;
}

.ci-focus-jump:hover .ci-focus-arrow {
  transform: translateX(3px);
}

/* 核心关键词标签 */
.ci-card-keywords {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 1rem;
  flex: 1;
}

.ci-keyword-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  font-size: 0.72rem;
  font-family: inherit;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  line-height: 1.4;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.16s ease;
}

.ci-keyword-tag:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, var(--vp-c-bg-soft));
}

.ci-keyword-tag.is-active {
  color: #ffffff;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

/* 卡片底栏 */
.ci-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.ci-card-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-brand-1) !important;
  text-decoration: none !important;
}

.ci-card-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.ci-chapter-card:hover .ci-card-arrow {
  transform: translateX(4px);
}

/* ============================================================
   16 实验专题：全景通栏核心大卡片
   ============================================================ */
.ci-pano-wrap {
  width: 100%;
}

.ci-chapter-card--pano {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--vp-custom-block-warning-bg, #fbf7ee) 50%, var(--vp-c-bg-elv)) 0%,
    var(--vp-c-bg-elv) 100%
  );
  border: 1px solid
    color-mix(
      in srgb,
      var(--vp-custom-block-warning-border, rgba(180, 120, 20, 0.25)) 60%,
      var(--vp-c-border)
    );
  padding: 1.6rem 1.8rem;
}

.ci-chapter-card--pano:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-3);
  transform: translateY(-2px);
}

.ci-pano-grid {
  display: grid;
  grid-template-columns: 1.15fr 1.85fr;
  gap: 2rem;
  align-items: center;
}

.ci-pano-main {
  display: flex;
  flex-direction: column;
}

.ci-pano-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ci-card-num--pano {
  font-size: 1.4rem;
}

.ci-pano-indicator {
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--vp-custom-block-warning-text, #7a6234);
  letter-spacing: 0.04em;
}

.ci-card-title--pano {
  font-size: 1.35rem;
  margin: 0.4rem 0 0.5rem 0;
}

.ci-card-desc--pano {
  font-size: 0.88rem;
  line-height: 1.6;
  margin-bottom: 0.9rem;
}

.ci-focus-jump--pano {
  margin-bottom: 1.2rem;
}

.ci-card-footer--pano {
  border: none;
  padding: 0;
}

/* 右侧四大实验板块直达通道 (2x2 对称网格) */
.ci-pano-subtopics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.ci-pano-subcard {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0.85rem 0.95rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition: all 0.2s ease;
}

.ci-pano-subcard:hover {
  background: var(--vp-c-bg-elv);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-2);
}

.ci-subcard-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.86rem;
  font-weight: 650;
  color: var(--vp-c-text-1);
}

.ci-pano-subcard:hover .ci-subcard-title {
  color: var(--vp-c-brand-1);
}

.ci-subcard-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.bullet-blue {
  background-color: #3b82f6;
}
.bullet-green {
  background-color: #10b981;
}
.bullet-purple {
  background-color: #8b5cf6;
}
.bullet-orange {
  background-color: #f97316;
}

.ci-subcard-desc {
  font-size: 0.76rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 空搜索状态 */
.ci-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3.5rem 1rem;
  background: var(--vp-c-bg-elv);
  border: 1px dashed var(--vp-c-border);
  border-radius: 12px;
}

.ci-empty-icon {
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
}

.ci-empty-title {
  font-size: 1.15rem;
  font-weight: 650;
  color: var(--vp-c-text-1);
  margin: 0 0 0.4rem 0;
}

.ci-empty-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin: 0 0 1.25rem 0;
}

.ci-empty-reset {
  padding: 8px 18px;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.ci-empty-reset:hover {
  background: var(--vp-c-brand-1);
  color: #ffffff;
}

/* ============================================================
   3. Special Highlights Section (考前必看三大特刊)
   ============================================================ */
.ci-specials-section {
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.ci-specials-head {
  text-align: center;
  margin-bottom: 2rem;
}

.ci-specials-tag {
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.ci-specials-title {
  font-family: var(--vp-font-family-serif);
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  letter-spacing: -0.02em;
  border: none !important;
  padding: 0 !important;
}

.ci-specials-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.ci-special-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.4rem;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  box-shadow: var(--vp-shadow-card, 0 1px 3px rgba(0, 0, 0, 0.04));
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.ci-special-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-2);
}

.ci-special-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.ci-special-icon {
  width: 22px;
  height: 22px;
  color: var(--vp-c-text-2);
}

.ci-special-card:hover .ci-special-icon {
  color: var(--vp-c-brand-1);
}

.ci-special-name {
  font-size: 1.12rem;
  font-weight: 650;
  line-height: 1.35;
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  letter-spacing: -0.015em;
}

.ci-special-desc {
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 1.25rem 0;
  flex: 1;
}

.ci-special-action {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.ci-special-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.ci-special-card:hover .ci-special-arrow {
  transform: translateX(3px);
}

.ci-special-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2em 0.65em;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 9999px;
  line-height: 1.2;
}

.badge-yellow {
  background: rgba(180, 120, 20, 0.12);
  color: #b47814;
  border: 1px solid rgba(180, 120, 20, 0.25);
}

.dark .badge-yellow {
  background: rgba(253, 230, 138, 0.15);
  color: #fde68a;
  border-color: rgba(253, 230, 138, 0.25);
}

.badge-red {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.dark .badge-red {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.25);
}

.badge-blue {
  background: rgba(45, 106, 79, 0.12);
  color: #2d6a4f;
  border: 1px solid rgba(45, 106, 79, 0.25);
}

.dark .badge-blue {
  background: rgba(82, 183, 136, 0.15);
  color: #52b788;
  border-color: rgba(82, 183, 136, 0.25);
}

/* ============================================================
   4. Responsive Breakpoints
   ============================================================ */
@media (max-width: 1024px) {
  .ci-chapter-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ci-pano-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .ci-hero-title-main {
    font-size: 2.5rem;
  }
  .ci-hero-tagline {
    font-size: 0.98rem;
  }
  .ci-stats-strip {
    gap: 14px;
  }
  .ci-stat-number {
    font-size: 1.3rem;
  }
  .ci-stat-title {
    font-size: 0.74rem;
  }
  .ci-stat-divider {
    display: none;
  }
  .ci-chapter-grid,
  .ci-specials-grid,
  .ci-pano-subtopics {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .ci-directory-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .ci-hot-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}

@media (max-width: 640px) {
  .ci-stats-strip {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .ci-hero-title-main {
    font-size: 2.15rem;
  }
  .ci-directory-title {
    font-size: 1.65rem;
  }
}
</style>
