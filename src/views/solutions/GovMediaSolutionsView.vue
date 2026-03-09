<script setup lang="ts">

import { ref } from 'vue'

import * as newApi from "@/api/newApi/index";

const employees = [

  {

    role: 'AI 公文写作智能助手',

    desc: '深度学习体制内公文范式与语言风格，实现提纲扩写、文风自动校对与合规性审查，大幅提升各类公文、简报、讲话稿的起草效率',

    skills: ['公文风格模拟', '合规性智能审核', '长文本秒级润色'],

    icon: 'fas fa-pen-nib',

    color: '#EC4899'

  },

  {

    role: '融媒AI 视频生产工厂',

    desc: '打破传统制播瓶颈，输入文稿即可自动匹配海量素材并联动数字人主播，分钟级产出具备专业级别的政务宣传与新闻短视频',

    skills: ['文稿一键转视频', '数字人主播一站式生成', '多平台分发格式自适应'],

    icon: 'fas fa-clapperboard',

    color: '#8B5CF6'

  },

  {

    role: '政策法规数字化解读',

    desc: '精准拆解复杂的政策条文，通过 AI 将其转化为通俗易懂的解读报告、问答手册或图解大纲，辅助公文写作中的政策引用',

    skills: ['条文原子化拆解', '政策关联度分析', '智能生成解读长图'],

    icon: 'fas fa-file-contract',

    color: '#3B82F6'

  },

  {

    role: '政务/企业知识资产库',

    desc: '通过大模型技术激活静默沉淀的历史文档、档案与制度文件，构建随时可被写作助手调用的知识中枢，确保存档数据发挥最大价值',

    skills: ['历史文档结构化', '知识点语义检索', '跨部门资料共享共建'],

    icon: 'fas fa-database',

    color: '#10B981'

  }

]



const form = ref({

  company: '',

  contact: '',

  phone: '',

  demand: ''

})



const submitting = ref(false)

const submitted = ref(false)



const handleSubmit = async () => {

    if (!form.value.contact || !form.value.phone) return alert('请填写联系人与手机号')

    

    submitting.value = true
    try {
        const solutionName = document.querySelector('h1')?.innerText || '未知解决方案'
        const res = newApi.apiAdmSolutionRequests(
      JSON.stringify({ ...form.value, solutionName })
    );
        const data = await res
        if (data.success) {
            submitted.value = true
            form.value = { company: '', contact: '', phone: '', demand: '' }
        } else {
            alert(data.message)
        }
    } catch (e) {
        alert('提交失败，请重试')
    } finally {
        submitting.value = false
    }


}



const scrollToForm = () => {

  const el = document.getElementById('consult-form')

  if (el) el.scrollIntoView({ behavior: 'smooth' })

}

</script>



<template>

  <div class="ecommerce-page">

    <!-- Hero -->

    <header class="eco-hero">

        <div class="hero-bg"></div>

        <div class="wrapper hero-content">

            <span class="badge">Gov & Media Solution</span>

            <h1>政务与融媒体解决方案</h1>

            <p>基于前沿AI大模型，以极速智能夯实政务传播纵深与舆情风控重器</p>

            <button class="btn-hero" @click="scrollToForm">

                免费定制方案

            </button>

        </div>

    </header>



    <!-- Problem & Solution -->

    <section class="section-intro wrapper">

        <div class="intro-grid">

            <div class="intro-text">

                <h2>内容起草慢？制播成本高？</h2>

                <div class="pain-point-list">

                    <div class="pain-item">

                        <i class="fas fa-times-circle"></i>

                        <span><strong>深度公文写作耗时</strong>公文起草需要极高严谨度，人工从拟草到多轮校对耗时巨大，文字生产力难以释放</span>

                    </div>

                    <div class="pain-item">

                        <i class="fas fa-times-circle"></i>

                        <span><strong>视频新闻生产滞后</strong>传统剪辑模式无法满足突发事件及高频宣传的分钟级制播需求，人力物力消耗极高</span>

                    </div>

                    <div class="pain-item">

                        <i class="fas fa-times-circle"></i>

                        <span><strong>政策引用与解读工作量大：</strong>撰写高规格公文需引用海量政策制度，人工查阅与解读周期长，极易发生引用偏差</span>

                    </div>

                </div>

            </div>

            <div class="intro-highlight">

                <h3>AI 赋能 · 打造数字化内容中枢</h3>

                <p>以“大模型写作助手”为核心，通过“政策解读助手”提供准确引用，利用“知识资产库”激活历史数据，并最终借助“视频生产工厂”实现全媒体爆发，构建起一套从文字起草到视频宣传的高效内容治理体系</p>

            </div>

        </div>

    </section>



    <!-- Digital Employee Roles -->

    <section class="section-roles">

        <div class="wrapper">

            <div class="section-title">

                <h2>内容生产与知识治理引擎</h2>

                <p>从精准公文起草到多模态内容产出，构建机关企事业单位高效办公新范式</p>

            </div>

            

            <div class="roles-grid">

                <div v-for="emp in employees" :key="emp.role" class="role-card">

                    <div class="role-icon" :style="{ background: emp.color + '15', color: emp.color }">

                        <i :class="emp.icon"></i>

                    </div>

                    <h3>{{ emp.role }}</h3>

                    <p class="role-desc">{{ emp.desc }}</p>

                    <div class="role-skills">

                        <span v-for="skill in emp.skills" :key="skill" class="skill-tag">

                            <i class="fas fa-check" :style="{ color: emp.color }"></i> {{ skill }}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    </section>



    <!-- Consultation Form -->

    <section id="consult-form" class="section-form">

        <div class="wrapper form-wrapper">

            <div class="form-content-left">

                <h2>与行业专家 <br><span class="highlight-text">1V1</span> 深度对谈</h2>

                <p class="form-lead">我们深知每个跨境品牌的业务基因都不相同 <br>不仅提供工具，更提供战略破局点</p>

                

                <div class="trust-features">

                    <div class="trust-feat-item">

                        <i class="fas fa-search-dollar"></i>

                        <div>

                            <h4>全面痛点诊断</h4>

                            <p>从选品、流量到履约，深度剖析您的核心卡点</p>

                        </div>

                    </div>

                    <div class="trust-feat-item">

                        <i class="fas fa-drafting-compass"></i>

                        <div>

                            <h4>定制化系统方案</h4>

                            <p>由资深架构师量身定制软硬件结合的 AI 构建计划</p>

                        </div>

                    </div>

                    <div class="trust-feat-item">

                        <i class="fas fa-user-lock"></i>

                        <div>

                            <h4>严格商业保密</h4>

                            <p>签署数据隐私协议，确保所有企业信息与选品策略绝对安全</p>

                        </div>

                    </div>

                </div>



            </div>



            <div class="form-container-right">

                <div v-if="submitted" class="success-message">

                    <i class="fas fa-check-circle"></i>

                    <h3>提交成功</h3>

                    <p>我们已收到您的诉求卷宗，<br>架构师将火速与您联系</p>

                    <button class="btn-reset" @click="submitted = false">再次咨询</button>

                </div>



                <form v-else class="consult-form" @submit.prevent="handleSubmit">

                    <div class="form-header-minimal">

                        <h3>免费获取专属方案</h3>

                        <p>请留下您的联系方式</p>

                    </div>



                    <div class="form-group">

                        <label>企业/品牌名称</label>

                        <input v-model="form.company" type="text" placeholder="输入企业主体或独立站名称">

                    </div>



                    <div class="form-row">

                        <div class="form-group">

                            <label>您的姓名 <span class="required">*</span></label>

                            <input v-model="form.contact" type="text" placeholder="怎么称呼" required>

                        </div>

                        <div class="form-group">

                            <label>联系电话 <span class="required">*</span></label>

                            <input v-model="form.phone" type="text" placeholder="用于接收方案" required>

                        </div>

                    </div>



                    <div class="form-group">

                        <label>核心诉求描述</label>

                        <textarea v-model="form.demand" rows="3" placeholder="例如：我们需要批量生TikTok 英语带货视频，目前人工成本极高等..."></textarea>

                    </div>



                    <button type="submit" class="btn-submit" :disabled="submitting">

                        {{ submitting ? '信息加密上传..' : '提交需求' }}

                    </button>

                    <p class="privacy-note"><i class="fas fa-lock"></i> 信息已采用端到端加密保护</p>

                </form>

            </div>

        </div>

    </section>

  </div>

</template>



<style scoped>

.ecommerce-page {

    background: #F8FAFC;

}



.eco-hero {

    position: relative;

    padding: 180px 0 120px; /* Matched AppCenterView height */

    background: linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.55)), url('@/assets/images/media-bg.png');

    background-size: cover;

    background-position: center;

    color: white;

    text-align: center;

    overflow: hidden;

}







.hero-content {

    position: relative;

    z-index: 10;

    max-width: 800px;

    margin: 0 auto;

}



.badge {

    display: inline-block;

    padding: 6px 16px;

    background: rgba(255, 255, 255, 0.1);

    border: 1px solid rgba(255, 255, 255, 0.2);

    border-radius: 20px;

    font-size: 0.75rem;

    font-weight: 800;

    letter-spacing: 0.1em;

    text-transform: uppercase;

    margin-bottom: 24px;

    color: #A5B4FC;

    backdrop-filter: blur(4px);

}



.eco-hero h1 {

    font-size: 3.5rem;

    font-weight: 900;

    margin-bottom: 24px;

    letter-spacing: -0.02em;

    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);

}



.eco-hero p {

    font-size: 1.25rem;

    color: rgba(255, 255, 255, 0.95);

    margin-bottom: 40px;

    font-weight: 600;

    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

}



.btn-hero {

    padding: 16px 48px;

    background: white;

    color: #0F172A;

    border: none;

    border-radius: 50px;

    font-size: 1.1rem;

    font-weight: 800;

    cursor: pointer;

    transition: all 0.2s;

}



.btn-hero:hover {

    transform: translateY(-2px);

    box-shadow: 0 10px 20px rgba(0,0,0,0.2);

}





/* Intro Section */

.section-intro {

    margin-top: -80px;

    position: relative;

    z-index: 20;

    margin-bottom: 80px;

}



.intro-grid {

    display: grid;

    grid-template-columns: 1.2fr 0.8fr;

    gap: 40px;

}



.intro-text, .intro-highlight {

    background: white;

    border-radius: 20px;

    padding: 40px;

    box-shadow: 0 4px 20px rgba(0,0,0,0.05);

}



.intro-text h2 {

    font-size: 1.8rem;

    color: #1E293B;

    margin-bottom: 32px;

}



.pain-point-list {

    display: flex;

    flex-direction: column;

    gap: 20px;

}



.pain-item {

    display: flex;

    gap: 16px;

    align-items: flex-start;

}



.pain-item i {

    color: #EF4444;

    font-size: 1.2rem;

    margin-top: 4px;

}



.pain-item span {

    color: #475569;

    line-height: 1.6;

}



.intro-highlight {

    background: #4F46E5;

    color: white;

    display: flex;

    flex-direction: column;

    justify-content: center;

}



.intro-highlight h3 {

    font-size: 2rem;

    margin-bottom: 20px;

}



.intro-highlight p {

    line-height: 1.8;

    color: rgba(255,255,255,0.9);

    font-size: 1.1rem;

}



/* Roles Section */

.section-roles {

    padding: 80px 0;

}



.section-title {

    text-align: center;

    margin-bottom: 60px;

}



.section-title h2 {

    font-size: 2.5rem;

    color: #0F172A;

    margin-bottom: 16px;

    font-weight: 800;

}



.section-title p {

    color: #64748B;

    font-size: 1.2rem;

}



.roles-grid {

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 32px;

}



.role-card {

    background: white;

    padding: 40px;

    border-radius: 24px;

    border: 1px solid #E2E8F0;

    transition: all 0.3s;

}



.role-card:hover {

    transform: translateY(-8px);

    box-shadow: 0 20px 40px rgba(0,0,0,0.05);

    border-color: #A5B4FC;

}



.role-icon {

    width: 64px;

    height: 64px;

    border-radius: 16px;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 2rem;

    margin-bottom: 24px;

}



.role-card h3 {

    font-size: 1.5rem;

    margin-bottom: 12px;

    color: #1E293B;

}



.role-desc {

    color: #64748B;

    line-height: 1.6;

    margin-bottom: 24px;

}



.role-skills {

    display: flex;

    gap: 12px;

    flex-wrap: wrap;

}



.skill-tag {

    background: #F8FAFC;

    padding: 6px 12px;

    border-radius: 8px;

    font-size: 0.85rem;

    font-weight: 600;

    color: #475569;

}



/* Form Section */

.section-form {

    padding: 80px 0 120px;

}



.form-wrapper {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 80px;

    align-items: center;

}



/* Form Left Content */

.form-content-left h2 {

    font-size: 2.8rem;

    color: #0F172A;

    line-height: 1.2;

    margin-bottom: 24px;

    font-weight: 800;

}



.highlight-text {

    color: #4F46E5;

}



.form-lead {

    font-size: 1.25rem;

    color: #475569;

    line-height: 1.7;

    margin-bottom: 48px;

}



.trust-features {

    display: flex;

    flex-direction: column;

    gap: 32px;

}



.trust-feat-item {

    display: flex;

    gap: 20px;

    align-items: flex-start;

}



.trust-feat-item i {

    font-size: 1.8rem;

    color: #4F46E5;

    background: #EEF2FF;

    padding: 16px;

    border-radius: 16px;

}



.trust-feat-item h4 {

    font-size: 1.2rem;

    color: #1E293B;

    margin-bottom: 8px;

    font-weight: 700;

}



.trust-feat-item p {

    color: #64748B;

    line-height: 1.6;

}



/* Form Right Container */

.form-container-right {

    background: white;

    border-radius: 24px;

    padding: 48px;

    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04);

}



.form-header-minimal {

    margin-bottom: 32px;

}



.form-header-minimal h3 {

    font-size: 1.6rem;

    color: #0F172A;

    margin-bottom: 8px;

    font-weight: 800;

}



.form-header-minimal p {

    color: #64748B;

}



.consult-form {

    padding: 0; /* Resetting padding since container has it */

}



.success-message {

    text-align: center;

    padding: 60px 0;

}



.form-row {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 24px;

}



.form-group {

    margin-bottom: 24px;

}



.form-group label {

    display: block;

    font-weight: 700;

    color: #334155;

    margin-bottom: 8px;

}



.required { color: #EF4444; }



.form-group input, .form-group textarea {

    width: 100%;

    padding: 12px;

    border: 1px solid #E2E8F0;

    border-radius: 8px;

    font-size: 1rem;

    outline: none;

    transition: all 0.2s;

}



.form-group input:focus, .form-group textarea:focus {

    border-color: #4F46E5;

    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);

}



.btn-submit {

    width: 100%;

    padding: 18px;

    background: linear-gradient(135deg, #4F46E5, #3B82F6);

    color: white;

    border: none;

    border-radius: 12px;

    font-size: 1.15rem;

    font-weight: 800;

    cursor: pointer;

    transition: all 0.3s;

    box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);

}



.btn-submit:hover:not(:disabled) {

    transform: translateY(-2px);

    box-shadow: 0 12px 24px rgba(79, 70, 229, 0.3);

}



.privacy-note {

    text-align: center;

    margin-top: 16px;

    font-size: 0.85rem;

    color: #94A3B8;

}



.privacy-note i {

    color: #10B981;

    margin-right: 4px;

}



.btn-submit:disabled {

    opacity: 0.7;

    cursor: not-allowed;

}



.btn-reset {

    margin-top: 24px;

    background: transparent;

    border: 1px solid #4F46E5;

    color: #4F46E5;

    padding: 10px 24px;

    border-radius: 6px;

    cursor: pointer;

    font-weight: 700;

}



@media (max-width: 768px) {

    .intro-grid, .roles-grid, .form-row, .form-wrapper {

        grid-template-columns: 1fr;

    }

    .eco-hero h1 { font-size: 2.5rem; }

}

</style>