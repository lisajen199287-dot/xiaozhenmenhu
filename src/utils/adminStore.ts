import { ref, watch } from 'vue'

import * as newApi from "@/api/newApi/index";


export interface Article {

    id: number;

    title: string;

    author: string;

    category: string;

    date: string;

    status: string;

    content?: string;

    image?: string;
    startTime?: string;
    endTime?: string;
    linkType?: 'INTERNAL_RICH_TEXT' | 'EXTERNAL_LANDING';
    externalLink?: string;
    pushToNav?: boolean;
    pushToHero?: boolean;
    heroBgImage?: string;
}



export interface Event {

    id: number;

    title: string;

    category: string;

    registrations: number;

    status: string;

    desc?: string;

    tag?: string;

    deadline?: string;

    location?: string;

    duration?: string;

    icon?: string;

    badge?: string;

}



export interface CaseStudy {
    id: number;
    industry: string;
    subIndustry?: string;
    client: string;
    logo: string;
    bigTitle: string;
    painPoint?: string;
    desc: string;
    backgroundImage: string;
    mobileBackgroundImage?: string; // Opt for mobile
    stats: { value: string; label: string; }[];
    tag: string;
    category: string;
    content?: string; // HTML content for detail page
}



export interface User {

    id: number;

    name: string;

    email: string;

    role: string;

    status: string;

}



export interface Admin {

    id: number;

    username: string;

    realName: string;

    role: string;

    lastLogin: string;

    password?: string;

    twoFactorEnabled?: boolean;

    phone?: string;

}



export interface LoginResult {

    success: boolean;

    code: number;

    msg: string;

    token?: string;

    role?: string;

    two_factor_required?: boolean;

}



export interface Role {

    id: number;

    name: string;

    description: string;

    permissions: string[]; // e.g. ['users:read', 'users:write']

}



const getStorage = <T>(key: string, defaultValue: T): T => {

    const stored = localStorage.getItem(key)

    return stored ? JSON.parse(stored) : defaultValue

}



const defaultIntro = `福州市仓山区人工智能公共服务平台是仓山区为贯彻落实国家“数字中国”“数字福建”战略，加快建设“数字福州”，推动人工智能与实体经济深度融合而重点打造的公共服务基础设施项目。平台由福州市仓山区产业投资集团有限公司牵头建设，旨在通过构建统一的算力底座、智能应用支撑体系和行业解决方案，助力仓山区打造人工智能产业集聚区和应用示范区。



平台以“算力共享、资源开放、场景驱动、生态共建”为建设理念，采用集约化建设模式，依托智能产业园机房，建设约50P FP16级别的智能算力集群，提供通用与高性能算力服务。平台围绕制造业、医疗健康、数字化营销与跨境电商、园区管理等重点领域，打造自然语言处理、图像识别、智能推荐、数据分析等人工智能应用，形成一批具有标杆效应的示范案例。



在技术架构上，平台构建包括操作系统、大数据治理平台、大模型智能体在内的PaaS应用支撑能力，支持企业低成本、快速部署人工智能业务。同时，平台提供开放的API与低代码开发环境，为开发者和企业用户打造大模型训练、应用开发、测试验证的一体化环境，降低人工智能应用门槛。



在产业生态方面，平台立足仓山区“两园四镇”产业布局，聚焦智能制造、智慧教育、智慧医疗、智慧社区等应用场景，集聚龙头企业、独角兽企业与中小创新企业，推动上下游协同发展。通过公共服务平台建设，仓山区将有效解决中小企业算力不足、应用落地难等痛点，助力企业实现降本增效与智能化升级。



未来，福州市仓山区人工智能公共服务平台将成为全省乃至全国人工智能产业发展的重要支撑平台，既是推动“数字仓山”建设的重要抓手，也是加快形成新质生产力、引领区域经济高质量发展的核心引擎。`



export const useAdminStore = () => {

    // 默认文章包含更多字段，用于前台展

    const defaultArticles: Article[] = [

        {

            id: 1,

            title: '2026 AI 趋势预测：从多模态到全链路重',

            author: '系统管理',

            category: '行业动态',

            date: '2026-02-09',

            status: '已发布',

            content: '随着人工智能技术的飞速发展，2026年将是AI从单一模态向多模态全面融合的关键之年。本文将深入探讨未来一年的五大核心趋势...',

            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600'

        },

        {

            id: 2,

            title: '如何利用 Lumi Vision 高速生成高质量电商素材',

            author: '应用专家',

            category: '技术教研',

            date: '2026-02-08',

            status: '已发布',

            content: '在电商领域，高质量的视觉素材是提升转化率的关键。Lumi Vision 凭借其强大的生成能力，能够帮助商家快速产出专业级商品...',

            image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&q=80&w=600'

        },

        {

            id: 3,

            title: '平台关于算力补贴申请的最新通知',

            author: '运营中心',

            category: '最新公告',

            date: '2026-02-05',

            status: '已发布',

            content: '为进一步降低中小企业使用智能算力的成本，平台现推出新一轮算力补贴计划。符合条件的企业可享受最0%的费用减...',

            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600'

        },

        {

            id: 4,

            title: '《仓山区加快 AI 产业发展若干政策》',

            author: '政策研究',

            category: '政府政策',

            date: '2026-01-15',

            status: '已发布',

            content: '为贯彻落实国家人工智能发展战略，加快我区人工智能产业集聚发展，特制定本政策。政策涵盖企业落户奖励、研发投入补贴、人才引进支持等多个方面...',

            image: ''

        },

        {

            id: 5,

            title: '《中小企AI 赋能专项奖补金细则》',

            author: '产业服务',

            category: '产业扶持',

            date: '2026-02-01',

            status: '已发布',

            content: '本细则旨在明确中小企业申AI 赋能专项奖补金的具体流程和标准。重点支持中小企业在生产、管理、销售等环节应用人工智能技术..',

            image: ''

        },

        {

            id: 6,

            title: '《园区数智化转型入驻优惠实施办法》',

            author: '园区管委',

            category: '园区服务',

            date: '2025-12-20',

            status: '已发布',

            content: '为吸引优质数字经济企业入驻，园区推出房租减免、装修补贴、云资源赠送等一揽子优惠措施。详情请...',

            image: ''

        }

    ]



    let storedArticles = getStorage('admin_articles', defaultArticles)



    // Auto-Migrate: Ensure new policy default articles exist in storage if missing

    // 检ID 4, 5, 6 的政策文章是否已存在

    const necessaryIds = [4, 5, 6]

    const missingArticles = defaultArticles.filter(d => necessaryIds.includes(d.id) && !storedArticles.find(s => s.id === d.id))



    if (missingArticles.length > 0) {

        // add to front or back? depending on sort. Default usually front for newness, but these are pinned policies.

        // Let's add them to the list.'

        storedArticles = [...storedArticles, ...missingArticles]

        // Update storage immediately to persist fix

        localStorage.setItem('admin_articles', JSON.stringify(storedArticles))

    }



    const articles = ref<Article[]>(storedArticles)



    // 默认活动包含更多详情字段

    const defaultEvents: Event[] = [

        {

            id: 1,

            title: 'AI 普惠“四大权益”包',

            category: '促销活动',

            registrations: 450,

            status: '进行中',

            desc: '涵盖模型调用、算力折扣、专家咨询及技术支持，全方位降低企AI 准入门槛。',

            tag: '限时申请',

            deadline: '2026-03-31',

            icon: 'fas fa-tags',

            badge: 'Limited Time'

        },

        {

            id: 2,

            title: '赋能·创变：AI+跨境电商闭门研讨会',

            category: '市场活动',

            registrations: 85,

            status: '进行中',

            desc: '特邀海外营销专家，深度解AI 如何重塑跨境电商视频生成与多语种客服流程',

            tag: '线下沙龙',

            location: '仓山区橘园洲创意园 3F',

            icon: 'fas fa-microphone-alt',

            badge: 'Networking'

        },

        {

            id: 3,

            title: '首席 AI 架构师专项培训课',

            category: '培训活动',

            registrations: 120,

            status: '报名中',

            desc: '面向企业骨干研发，深入解析大模型 RAG 架构、Prompt 工程及多 Agent 协作系统。',

            tag: '开发者专',

            duration: '3 周周末',

            icon: 'fas fa-graduation-cap',

            badge: 'Learning'

        },

        {

            id: 4,

            title: '全市 AI 创新成果巡展（仓山站',

            category: '市场活动',

            registrations: 310,

            status: '筹备中',

            desc: '集中展示本地 AI + 工业、AI + 民生服务30+ 典型落地案例，开启智变未来之旅',

            tag: '成果展示',

            location: '仓山万达 102 报告厅',

            icon: 'fas fa-project-diagram',

            badge: 'Exhibition'

        }

    ]



    const events = ref<Event[]>(getStorage('admin_events', defaultEvents))



    const users = ref<User[]>(getStorage('admin_users', [
        { id: 1001, name: '张大伟', email: 'zhang.dw@example.com', role: '超级管理员', status: '活跃' },
        { id: 1002, name: '李晓明', email: 'li.xm@example.com', role: '内容编辑', status: '活跃' }
    ]))



    const admins = ref<Admin[]>(getStorage('admin_list', [
        { id: 1, username: 'admin', realName: '系统总管', role: '超级管理员', lastLogin: '2026-02-09 10:00:00' }
    ]))



    const defaultRoles: Role[] = [

        { id: 1, name: '超级管理员', description: '拥有系统所有权限', permissions: ['all'] },

        { id: 2, name: '普通管理员', description: '拥有基础管理权限，无法管理其他管理员', permissions: ['users:read', 'articles:manage'] },

        { id: 3, name: '内容编辑', description: '仅能发布和管理内容', permissions: ['articles:manage'] }

    ]



    const roles = ref<Role[]>(getStorage('admin_roles', defaultRoles))



    const defaultCases: CaseStudy[] = [
        {
            id: 1,
            industry: '游戏互娱',
            category: '游戏',
            client: '某头部游戏公司',
            logo: 'fas fa-gamepad',
            bigTitle: 'AI 客服知识库 × 混合云 CDN',
            painPoint: '打造智能客服与全球内容分发体系，让游戏服务与运营效率全面升级',
            desc: '接入企业客服知识库与 AI 语义检索能力，实现玩家问题自动解答与工单智能分流；同时结合混合云 CDN 架构，优化全球游戏下载与更新分发效率。',
            backgroundImage: '/static/images/cases/webp/game.webp',
            mobileBackgroundImage: '/static/images/cases/webp/game_mobile.webp',
            stats: [
                { value: '提升 75%', label: '客服响应效率' },
                { value: '降低 40%', label: '网络延迟' },
                { value: '提升 90%', label: '玩家满意度' }
            ],
            tag: '知识检索',
            content: `
                <h2>项目背景</h2>
                <p>该客户为全球领先的出海游戏企业，旗下拥有数款百万级 DAU 的重度 RPG 及竞技类游戏。随着全球化进度的加速，玩家数量激增，传统的工单式人工客服体系在应对多国语言、全天候高频咨询时显得力不从心，人力成本高企且响应时效差，直接影响了玩家留存率。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>响应延迟：</b> 人工客服高峰期排队时间超过 15 分钟，且无法做到跨时区 24/7 覆盖。</li>
                    <li><b>语言障碍：</b> 玩家来自全球 40 多个国家，小语种客服招募及培训成本极高。</li>
                    <li><b>运维复杂度：</b> 全球各区域网络质量不一，游戏大版本更新时的分发与访问稳定性是保障运营的关键。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>我们为其构建了基于 LLM（大语言模型）的私有知识库智能客服系统，方案核心包括：</p>
                <ul>
                    <li><b>语义化 RAG 引擎：</b> 整合过往 10 万+ 客服语料及游戏百科，通过语义向量检索技术，实现高达 95% 的问题自动解决率。</li>
                    <li><b>多语言即时转化：</b> 内置实时翻译层，支持 24 种语言自动适配与应答，彻底消除跨国服务门槛。</li>
                    <li><b>混合云 CDN 联调：</b> 结合自研的分布式分发架构，实现游戏资源“就近拉取”，在 AI 智能扩缩容算法的支撑下，保证大版本更新时的业务零中断。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>系统上线三个月后，助力该企业实现了服务体系的彻底重构：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>75%</h4><p>客服响应效率提升</p></div>
                    <div class="result-item"><h4>40%</h4><p>动态资源下载延迟降低</p></div>
                    <div class="result-item"><h4>90%</h4><p>玩家社区正面评价率</p></div>
                </div>
            `
        },
        {
            id: 2,
            industry: '食品工业',
            category: '助手',
            client: '某冷冻食品工厂',
            logo: 'fas fa-utensils',
            bigTitle: 'AI 销售陪练系统',
            painPoint: 'AI 赋能，打造“金牌销冠”数字化导师',
            desc: '基于企业产品资料与销售话术，沉淀顶尖销售话术模型，打造 AI 语音陪练与情景对话训练系统，通过模拟对练加速一线人员成长。',
            backgroundImage: '/static/images/cases/webp/food.webp',
            mobileBackgroundImage: '/static/images/cases/webp/food_mobile.webp',
            stats: [
                { value: '缩短 60%', label: '新人培训周期' },
                { value: '提升 30%', label: '订单转化率' },
                { value: '100%', label: '核心话术覆盖' }
            ],
            tag: '智能助手',
            content: `
                <h2>项目背景</h2>
                <p>该企业是国内领先的冷冻食品生产商，拥有过万名一线销售人员，服务全国数十万家商超及零售终端。对于快消行业而言，销售人员的话术功底、产品卖点拆解能力直接决定了单笔成交额（AOV）和客户忠诚度。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>“销冠”经验难复刻：</b> 顶尖业务员的经验碎片化，难以在大规模团队中快速标准化。</li>
                    <li><b>培训周期长：</b> 每一个新人从入职到独立跑单通常需要 2 个月以上的导师带岗。</li>
                    <li><b>执行偏差：</b> 总部推出的新营销活动，在一线落地时往往因为话术不到位而打折扣。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>我们为其提供了一套基于语音交互的 AI 销售陪练系统：</p>
                <ul>
                    <li><b>话术大模型化：</b> 将品牌历史上的“销冠”录音与话术库投喂给 AI，生成具备高度专业感知与同理心的虚拟客户。</li>
                    <li><b>情景模拟训练：</b> 销售员可通过手机端与 AI 进行各种高难度、突发场景的“实战演练”，AI 会根据拒绝理由、话术闭环等指标实时点评。</li>
                    <li><b>实时话术导航：</b> 在真实的业务场景中，AI 可根据对话流向实时提示策略，成为销售员口袋里的“数字导师”。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>该系统在该工厂华东区试点后，取得了显著的效能跃迁：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>60%</h4><p>新人入职培训周期缩短</p></div>
                    <div class="result-item"><h4>30%</h4><p>单店订单转化率提升</p></div>
                    <div class="result-item"><h4>100%</h4><p>品牌核心价值传递点覆盖率</p></div>
                </div>
            `
        },
        {
            id: 3,
            industry: '跨境贸易',
            category: '电商',
            client: '某跨境大卖',
            logo: 'fas fa-shopping-bag',
            bigTitle: 'AI 电商视频生成',
            painPoint: '构建 AI 商品视频生产体系，让商品内容规模化出海',
            desc: '基于商品图片与卖点信息，自动生成多语言商品讲解视频、场景展示视频与社媒短视频，适配 Amazon、TikTok、独立站等跨境渠道。',
            backgroundImage: '/static/images/cases/webp/biz.webp',
            mobileBackgroundImage: '/static/images/cases/webp/biz_mobile.webp',
            stats: [
                { value: '降低 90%', label: '视频制作成本' },
                { value: '提升 10x', label: '内容产出效率' },
                { value: '提升 25%', label: '广告点击率' }
            ],
            tag: '营销出海',
            content: `
                <h2>项目背景</h2>
                <p>该客户是亚马逊、TikTok 等平台排名前三的顶级跨境电商运营商，产品类别跨度大且更迭速度极快，目前已触达全球超过 50 个国家。在全球视觉营销时代，高质量、高频次的商品视频内容是获取低价流量、提升点击转换的核心密码。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>制作周期缓慢：</b> 传统实拍流程包含选模特、搭棚、剪辑，一个 SKU 的成品视频往往需要 1 周。</li>
                    <li><b>成本高企：</b> 外籍模特费用及跨境渠道适配制作费平均高达 5000+ 元/支，难以承载海量上新需求。</li>
                    <li><b>语种适配难：</b> 手工配音及翻译后的口型对齐耗时耗力，影响海外市场的多点爆发。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>通过引入 AI 电商视频生产体系（AIGC）：</p>
                <ul>
                    <li><b>图转视频 (I2V) 技术：</b> 仅需上传 3-5 张商品正面图，AI 即可根据商品类目自动生成符合本土审美的场景视频和讲解视频。</li>
                    <li><b>多国语言音画同步：</b> 采用 TTS 技术与实时人脸驱动，自动匹配 15 种精准语种配音，并实现毫无违和感的数字人口型对齐。</li>
                    <li><b>针对性渠道优化：</b> 内置 TikTok、FB Ads、Reels 等多种平台风格算法，一键生成符合渠道热度的快节奏素材。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>方案在企业内部上线后，营销部门实现了质的飞跃：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>90%</h4><p>单支视频综合制作成本降低</p></div>
                    <div class="result-item"><h4>10 倍</h4><p>素材单位产量效率提升</p></div>
                    <div class="result-item"><h4>25%</h4><p>全球广告投放点击率均值提升</p></div>
                </div>
            `
        },
        {
            id: 4,
            industry: '连锁新茶饮',
            category: '品牌',
            client: '某连锁茶饮品牌',
            logo: 'fas fa-coffee',
            bigTitle: '客户扫码定制包装',
            painPoint: '打造用户共创包装与互动营销新体验',
            desc: '消费者扫码进入 AI 图案生成系统，自主生成个性化杯身图案或祝福语，门店即时生成电子包装，实现品牌互动传播与社交分享裂变。',
            backgroundImage: '/static/images/cases/webp/drink.webp',
            mobileBackgroundImage: '/static/images/cases/webp/drink_mobile.webp',
            stats: [
                { value: '提升 50%', label: '门店二次复购' },
                { value: '增长 120%', label: '社交媒体曝光' },
                { value: '秒级', label: '图案解析响应' }
            ],
            tag: '创意引擎',
            content: `
                <h2>项目背景</h2>
                <p>该客户是国内知名连锁新茶饮品牌，在全国拥有超过 3000 家门店。在品牌年轻化与社交化营销的趋势下，如何让一杯奶茶不仅好喝，还能成为用户展现个性的“社交货币”，是提升品牌粘性的关键。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>同质化严重：</b> 茶饮行业包装大同小异，缺乏让消费者眼前一亮的互动点。</li>
                    <li><b>UGC 门槛高：</b> 虽然想做用户共创，但传统的征集、筛选、落地流程太慢，无法满足即时互动的快节奏。</li>
                    <li><b>数字化程度不足：</b> 线下消费与线上社交链路断裂，门店自然流量难以直接转化为私域曝光。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>我们为其提供了一套基于在线 Stable Diffusion 的 AIGC 定制包装方案：</p>
                <ul>
                    <li><b>“扫码即创”体验：</b> 用户扫描杯身二维码，输入简单的关键词或选择艺术风格（如国潮、赛博朋克），AI 在 5 秒内生成专属的电子杯套图案。</li>
                    <li><b>社交裂变机制：</b> 生成的个性化图案自带品牌 LOGO 和分享海报，一键转发至小红书、朋友圈即可获得积分或抵扣券。</li>
                    <li><b>数字化闭环：</b> 系统实时统计生成的热门关键词，为总部的下一季新品包装设计提供真实的用户偏好数据支持。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>该活动上线一个月内，便在社交媒体上引发了现象级讨论：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>50%</h4><p>门店二次复购率提升</p></div>
                    <div class="result-item"><h4>120%</h4><p>社交媒体自发曝光增长</p></div>
                    <div class="result-item"><h4>秒级</h4><p>高并发图案解析响应</p></div>
                </div>
            `
        },
        {
            id: 5,
            industry: '服装制造',
            category: '时尚',
            client: '某国际运动品牌',
            logo: 'fas fa-tshirt',
            bigTitle: '电商内容流水线',
            painPoint: '构建 AI 电商内容生产中台，让素材生产规模化工业化',
            desc: '通过 AI 模特生成、商品图重构、场景图生成与短视频生成，实现详情页素材、广告素材一站式批量生产，支撑全球电商营销。',
            backgroundImage: '/static/images/cases/webp/sport.webp',
            mobileBackgroundImage: '/static/images/cases/webp/sport_mobile.webp',
            stats: [
                { value: '缩短 80%', label: '新品上市周期' },
                { value: '提升 65%', label: '素材利用率' },
                { value: '降低 50%', label: '运营投入成本' }
            ],
            tag: '工业质检',
            content: `
                <h2>项目背景</h2>
                <p>该客户为某国际一线运动装备品牌，其电商部门每月需上线数百款新品。传统电商素材产出依赖极其庞大的摄影团队和后期团队，这种“手工作坊式”的模式已无法支撑全渠道、全球化的营销需求。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>拍摄成本巨大：</b> 涉及外籍模特、外景搭建、高昂的摄影器材，平均单个 SKU 的拍摄成本过万。</li>
                    <li><b>季节局限：</b> 想要在夏天拍摄雪地场景或跨季节拍摄，往往需要远赴海外，极大地拖慢了新品上架节奏。</li>
                    <li><b>素材利用率低：</b> 实拍图一旦成片，很难再修改服装颜色、更换背景或模特表情，导致二次创作受阻。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>我们为其构建了基于 AI 的电商内容生产“工业流水线”：</p>
                <ul>
                    <li><b>AI 模特替换：</b> 通过高精度人脸重构技术，可将国内拍摄的图快速替换为欧美、非裔等多肤色模特，实现“一拍多用”。</li>
                    <li><b>智能场景合成：</b> 利用 AI 扩图与背景生成，一键将内景图切换为山系、滑雪场或潮流街头，省去异地实拍费用。</li>
                    <li><b>短视频自动化生成：</b> 提取静态图中的商品特征，结合动态滤镜与 3D 转换技术，批量生成适合详情页展示的 15s 短视频。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>该流水线在品牌方的全球创意中心落地后，显著优化了资产管理：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>80%</h4><p>新品全渠道上线周期缩短</p></div>
                    <div class="result-item"><h4>65%</h4><p>历史素材二次挖掘利用率</p></div>
                    <div class="result-item"><h4>50%</h4><p>年度视觉运营投入成本降低</p></div>
                </div>
            `
        },
        {
            id: 6,
            industry: '汽车科技',
            category: '汽车',
            client: '某大型新能源汽车品牌',
            logo: 'fas fa-car',
            bigTitle: 'AI 销售训练 × 数字人视频',
            painPoint: '打造 AI 汽车销售与视频内容体系，让营销与培训全面数字化',
            desc: '在虚拟环境中实现高难度场景创意复现，通过数字分身赋能终端销售，解决门店销售能力不均问题，实现总部内容统一输出。',
            backgroundImage: '/static/images/cases/webp/car.webp',
            mobileBackgroundImage: '/static/images/cases/webp/car_mobile.webp',
            stats: [
                { value: '降低 70%', label: '广告拍摄成本' },
                { value: '提升 85%', label: '终端获客效率' },
                { value: '全天候', label: '数字人直播支持' }
            ],
            tag: '视频接口',
            content: `
                <h2>项目背景</h2>
                <p>该品牌是国内排名前三的新能源汽车厂商。由于新车型更迭快、卖点多（自动驾驶、电池技术、智驾座舱等），传统的销售培训和用户内容传播面临着“记忆难、成本高、形式老”的问题。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>销售素质不均：</b> 全国几百家门店，销售员对复杂新技术的讲解水平差异巨大。</li>
                    <li><b>拍摄难度大：</b> 展示智能驾驶辅助等功能涉及道路安全，实拍风险高且后期制作流程复杂。</li>
                    <li><b>视频生产力瓶颈：</b> 传统的剪辑团队无法满足每日上百条针对区域市场的视频分发需求。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>我们通过 AI 视频与数字人技术，为其打造了全方位的智能营销体系：</p>
                <ul>
                    <li><b>AI 数字人金牌讲师：</b> 克隆品牌首席技术官或明星销售的形象与声音，自动生成专业的技术讲解视频，下发至各门店进行标准化对客展示。</li>
                    <li><b>3D 虚拟场景复现：</b> 结合 Unreal Engine 5 与 AI 生成技术，在虚拟环境中完美还原极端天气、复杂路况下的智驾表现，成本仅为实拍的 30%。</li>
                    <li><b>自动化切片工具：</b> 自动收集各社交平台热议点，将长篇评测精准切割为多条带字幕、带特效的 1 分钟短视频，提升转化效率。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>该方案不仅降低了成本，更实现了品牌的区域深度渗透：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>70%</h4><p>全系车型广告视频拍摄成本降低</p></div>
                    <div class="result-item"><h4>85%</h4><p>终端销售线索转化与获客效率</p></div>
                    <div class="result-item"><h4>24/7</h4><p>数字分身赋能的视频直播支持</p></div>
                </div>
            `
        },
        {
            id: 7,
            industry: '园区服务',
            category: '政务',
            client: '某产业园管委会',
            logo: 'fas fa-city',
            bigTitle: '园区企业经营分析与政策匹配',
            painPoint: '构建 AI 园区运营大脑，让企业服务精准高效',
            desc: '整合园区 6000+ 企业经营数据与政策库，自动生成企业分析，实现政策扶持与企业需求的精准匹配，提升运营与招商能力。',
            backgroundImage: '/static/images/cases/webp/park.webp',
            mobileBackgroundImage: '/static/images/cases/webp/park_mobile.webp',
            stats: [
                { value: '100%', label: '企业画像覆盖' },
                { value: '提升 95%', label: '政策推送精准度' },
                { value: '缩短 40%', label: '政务办理周期' }
            ],
            tag: '政务办公',
            content: `
                <h2>项目背景</h2>
                <p>某高新区产业园管委会负责管理区内 6000 余家科技型企业。随着国家及地方政策的出台频率加快，如何将纷繁复杂的政策精准、及时地送达到每一家符合条件的企业手中，成为提升营商环境的关键挑战。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>政策匹配工作量大：</b> 每年产出的各级政策文件上千份，仅靠人工梳理极易造成疏漏。</li>
                    <li><b>企业画像模糊：</b> 管委会对企业经营动态、研发进度缺乏实时掌握，导致“政策寻人”效率低。</li>
                    <li><b>申报门槛高：</b> 企业往往不知道自己符合哪项政策，或因为申报流程繁琐而放弃。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>我们为其构建了“智慧园区 AI 运营大脑”：</p>
                <ul>
                    <li><b>政策知识图谱化：</b> 利用 NLP 技术自动解析政策原文，提取申报条件、扶持金额、截止日期等关键要素，形成标准化政策库。</li>
                    <li><b>企业经营大数据建模：</b> 整合纳税、知识产权、人才规模等多维数据，为每家企业自动生成动态画像。</li>
                    <li><b>智能匹配与一键推送：</b> AI 每日自动对比政策库与企业画像，一旦发现匹配，通过“数字政务助手”精准推送申报提醒，并自动生成部分预填表单。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>系统运行半年以来，园区政务服务实现了从“被动申请”向“主动赋能”的转变：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>100%</h4><p>园区入驻企业画像覆盖率</p></div>
                    <div class="result-item"><h4>95%</h4><p>政策精准推送与匹配成功率</p></div>
                    <div class="result-item"><h4>40%</h4><p>平均单项政务办理周期缩短</p></div>
                </div>
            `
        },
        {
            id: 8,
            industry: '金融投资',
            category: '金融',
            client: '某投资集团',
            logo: 'fas fa-file-invoice-dollar',
            bigTitle: '企业投研报告智能体',
            painPoint: '构建 AI 投研分析与报告生成体系，让投资决策更高效',
            desc: '基于公开信息、行业数据与财务数据，自动生成企业分析、行业对比报告与投资建议，辅助投资经理完成尽职调查工作。',
            backgroundImage: '/static/images/cases/webp/building.webp',
            mobileBackgroundImage: '/static/images/cases/webp/building_mobile.webp',
            stats: [
                { value: '提升 8 倍', label: '投研效率' },
                { value: '缩短 90%', label: '报告撰写时间' },
                { value: '缩短 60%', label: '项目评估周期' }
            ],
            tag: '风险风控',
            content: `
                <h2>项目背景</h2>
                <p>该客户是国内知名的大型投资集团，业务涵盖 PE/VC 及二级市场。投研团队每日需处理海量的行业研报、企业财报、新闻资讯，如何从庞杂的数据中快速提取核心增量信息，是提升投资决策质量的核心。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>信息过载：</b> 分析师每日阅读时长超过 6 小时，重复性信息提取占用了大量深度思考时间。</li>
                    <li><b>多维对比困难：</b> 在进行跨行业、跨维度的对标分析时，手动整理数据表极易出错且效率极低。</li>
                    <li><b>知识沉淀难：</b> 往期的投研观点和尽调数据散落在各处，缺乏统一的关联检索机制。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>我们为其定制了“投研分析师 AI 智能体”：</p>
                <ul>
                    <li><b>结构化阅读器：</b> AI 能在数秒内解析数百页的 PDF 研报，自动总结关键财务指标、竞争对手动态及核心风险点。</li>
                    <li><b>智能生成投研快报：</b> 每日早间根据设定的投资组合，自动生成覆盖全网信息的“决策参考”，重点突出异动点。</li>
                    <li><b>交互式尽调辅助：</b> 分析师可通过自然语言询问：“对比 A、B 两家公司在固态电池领域的专利储备及核心技术差距”，AI 实时调取数据并生成对比图表。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>该系统成为了投研团队不可或缺的“数字伙伴”：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>8 倍</h4><p>核心调研数据提取与分析效率提升</p></div>
                    <div class="result-item"><h4>90%</h4><p>初版投研报告撰写时间缩短</p></div>
                    <div class="result-item"><h4>60%</h4><p>典型项目尽职调查周期缩短</p></div>
                </div>
            `
        },
        {
            id: 9,
            industry: '数据服务',
            category: '技术',
            client: '数据服务公司',
            logo: 'fas fa-chart-line',
            bigTitle: '营销趋势洞察',
            painPoint: '打造 AI 营销洞察与趋势分析系统，让数据价值可直接决策',
            desc: '基于行业数据与营销数据，接入大模型技术，将海量非结构化数据转化为高价值商业决策参考，支撑品牌与营销决策。',
            backgroundImage: '/static/images/cases/webp/data.webp',
            mobileBackgroundImage: '/static/images/cases/webp/data_mobile.webp',
            stats: [
                { value: '提升 10 倍', label: '分析效率' },
                { value: '缩短 70%', label: '数据处理时间' },
                { value: '缩短 70%', label: '策略决策周期' }
            ],
            tag: '趋势洞察',
            content: `
                <h2>项目背景</h2>
                <p>该数据服务公司长期面向消费品牌提供市场监测数据。在海量消费数据面前，传统的 BI 报表只能告诉客户“发生了什么”，而难以回答“为什么发生”以及“未来会怎样”。</p>
                
                <h2>核心挑战</h2>
                <ul>
                    <li><b>非结构化数据难以利用：</b> 社交媒体评论、专家访谈、短视频弹幕等海量非结构化数据蕴含趋势，但传统手段极难量化。</li>
                    <li><b>洞察颗粒度粗：</b> 常规研报往往只能做到月度/季度更新，无法满足品牌方对“爆品趋势”的日级监控需求。</li>
                    <li><b>智能决策缺失：</b> 数据与业务经营动作脱节，客户拿到数据后仍不知道该如何调整营销策略。</li>
                </ul>

                <h2>AI 賦能解决方案</h2>
                <p>通过引入 AI 营销洞察与趋势分析系统：</p>
                <ul>
                    <li><b>全网语义情绪监控：</b> 实时抓包主流社媒平台，利用深度学习模型捕捉极细微的情绪转折和消费痛点变化。</li>
                    <li><b>趋势预测模型：</b> 基于历史周期数据与多模态关联因子，AI 可预判未来 2-4 周内的品类热度走势。</li>
                    <li><b>AI 策略顾问：</b> 不仅提供数据报表，更根据洞察结果自动生成 3 套可执行的营销优化策略，供品牌方决策。</li>
                </ul>

                <h2>商业价值与成果</h2>
                <p>该数字化升级方案助力其客户实现了从“数据驱动”到“洞察驱动”的跨越：</p>
                <div class="case-results-grid">
                    <div class="result-item"><h4>10 倍</h4><p>海量非结构化数据清洗与分析效率</p></div>
                    <div class="result-item"><h4>70%</h4><p>从数据收集到产出洞察的处理时间缩短</p></div>
                    <div class="result-item"><h4>70%</h4><p>品牌策略落地与纠偏决策周期缩短</p></div>
                </div>
            `
        }
    ]



    const cases = ref<CaseStudy[]>(getStorage('admin_cases_v4', defaultCases))



    const platformIntro = ref<string>(getStorage('admin_platform_intro', defaultIntro))



    watch(articles, (val) => localStorage.setItem('admin_articles', JSON.stringify(val)), { deep: true })

    watch(events, (val) => localStorage.setItem('admin_events', JSON.stringify(val)), { deep: true })

    watch(users, (val) => localStorage.setItem('admin_users', JSON.stringify(val)), { deep: true })

    watch(admins, (val) => localStorage.setItem('admin_list', JSON.stringify(val)), { deep: true })

    watch(roles, (val) => localStorage.setItem('admin_roles', JSON.stringify(val)), { deep: true })

    watch(cases, (val) => localStorage.setItem('admin_cases_v4', JSON.stringify(val)), { deep: true })

    watch(platformIntro, (val) => localStorage.setItem('admin_platform_intro', JSON.stringify(val)))



    return { articles, events, users, admins, roles, cases, platformIntro }

}



export const useAuth = () => {

    const isLoggedIn = ref(!!localStorage.getItem('admin_token'))



    const login = async (payload: { username: string, password: string, captcha: string, smsCode?: string }): Promise<LoginResult> => {

        try {
            let res = await newApi.apiAdmLogin(JSON.stringify(payload));
            // const res = await fetch('/api/auth/login', {

            //     method: 'POST',

            //     headers: { 'Content-Type': 'application/json' },

            //     body: JSON.stringify(payload)

            // })
            const data = await res
            if (data.code === 200) {

                localStorage.setItem('admin_token', data.token)

                localStorage.setItem('admin_role', data.role)

                isLoggedIn.value = true

                return { success: true, code: 200, msg: data.msg, token: data.token, role: data.role }

            } else if (data.code === 202) {

                return { success: false, code: 202, msg: data.msg, two_factor_required: true }

            } else {

                return { success: false, code: data.code, msg: data.msg }

            }

        } catch (e) {

            console.error('Backend API login failed', e)

            return { success: false, code: 500, msg: '连接服务器失败 ' }

        }

    }



    const logout = () => {

        // Optional: Call backend logout

        const token = localStorage.getItem('admin_token');

        if (token) {

            fetch('/api/auth/logout', {

                method: 'POST',

                headers: { 'Authorization': 'Bearer ' + token }

            }).catch(e => console.error(e));

        }

        localStorage.removeItem('admin_token')

        localStorage.removeItem('admin_role')

        isLoggedIn.value = false

    }



    return { isLoggedIn, login, logout }

}