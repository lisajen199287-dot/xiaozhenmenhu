<script setup lang="ts">

import { ref } from 'vue'



const showContactPanel = ref(false)

const showAIPanel = ref(false)



const toggleContact = () => {

  showContactPanel.value = !showContactPanel.value

  showAIPanel.value = false

}



const toggleAI = () => {

    showAIPanel.value = !showAIPanel.value

    showContactPanel.value = false

}

</script>



<template>

  <div class="floating-service">

    <!-- Sidebar -->

    <div class="service-sidebar">

      <div class="sidebar-item ai-btn" @click="toggleAI" :class="{ active: showAIPanel }">

        <div class="ai-icon-colorful">

            <i class="fas fa-infinity"></i>

        </div>

      </div>

      <div class="sidebar-divider"></div>

      <div class="sidebar-item" @click="toggleContact">

        <i class="far fa-smile"></i>

      </div>

      <div class="sidebar-divider"></div>

      <div class="sidebar-item" @click="toggleContact" :class="{ active: showContactPanel }">

        <i class="fas fa-phone-alt"></i>

      </div>

    </div>



    <!-- Contact Panel -->

    <Transition name="fade-slide">

      <div v-if="showContactPanel" class="service-popover contact-panel">

        <div class="popover-item">

          <div class="popover-icon"><i class="fas fa-phone-alt"></i></div>

          <div class="popover-text">

            <h4>联系销�?/h4>

            <p class="highlight-text">950808�?</p>

          </div>

        </div>

        <div class="popover-item">

          <div class="popover-icon"><i class="fas fa-headset"></i></div>

          <div class="popover-text">

            <h4>智能客服（已升级为智联Doer�?/h4>

            <p>点击右侧 <span class="ai-text-mini"><i class="fas fa-infinity"></i> 智联Doer</span>，直达AI助手</p>

          </div>

        </div>

        <div class="popover-item">

          <div class="popover-icon"><i class="far fa-edit"></i></div>

          <div class="popover-text">

            <h4>建议反馈</h4>

            <p>您的每一条建议声音，我们都认真对�?/p>

          </div>

        </div>

        <div class="popover-arrow"></div>

      </div>

    </Transition>



    <!-- AI Helper Panel (Simple Mock) -->

    <Transition name="fade-slide">

      <div v-if="showAIPanel" class="service-popover ai-helper-panel">

         <div class="ai-header">

            <h4>智联Doer AI 助手</h4>

            <span class="status-online">在线</span>

         </div>

         <div class="ai-body">

            <p>您好！我是智联Doer，您的全域智联专家。有什么可以帮您的吗？</p>

            <div class="quick-questions">

                <span>热门提问�?/span>

                <button>如何申请算力补贴�?/button>

                <button>数字员工如何聘用�?/button>

            </div>

         </div>

         <div class="popover-arrow"></div>

      </div>

    </Transition>

  </div>

</template>



<style scoped>

.floating-service {

    position: fixed;

    right: 30px;

    top: 50%;

    transform: translateY(-50%);

    z-index: 1000;

    display: flex;

    align-items: center;

}



.service-sidebar {

    background: white;

    padding: 12px 8px;

    border-radius: 40px;

    box-shadow: 0 10px 30px rgba(0,0,0,0.08);

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 8px;

    border: 1px solid #F1F5F9;

}



.sidebar-item {

    width: 44px;

    height: 44px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    cursor: pointer;

    transition: all 0.3s;

    color: #475569;

    font-size: 1.25rem;

}



.sidebar-item:hover, .sidebar-item.active {

    background: #F8FAFC;

    color: #2563EB;

}



.sidebar-divider {

    width: 24px;

    height: 1px;

    background: #F1F5F9;

}



/* AI Icon Styling */

.ai-icon-colorful {

    background: linear-gradient(135deg, #FF6B6B, #4D96FF, #6BCB77);

    -webkit-background-clip: text;

    background-clip: text;

    -webkit-text-fill-color: transparent;

    font-size: 1.5rem;

    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));

}



.ai-text-mini {

    background: linear-gradient(135deg, #FF6B6B, #4D96FF, #6BCB77);

    -webkit-background-clip: text;

    background-clip: text;

    -webkit-text-fill-color: transparent;

    font-weight: 700;

}



/* Popover Styling */

.service-popover {

    position: absolute;

    right: 70px;

    background: white;

    border-radius: 20px;

    box-shadow: 0 15px 50px rgba(0,0,0,0.12);

    padding: 30px;

    width: 380px;

    border: 1px solid #F1F5F9;

}



.contact-panel {

    display: flex;

    flex-direction: column;

    gap: 30px;

}



.popover-item {

    display: flex;

    gap: 20px;

}



.popover-icon {

    font-size: 1.5rem;

    color: #1E293B;

    padding-top: 4px;

}



.popover-text h4 {

    font-size: 1.1rem;

    font-weight: 700;

    color: #1E293B;

    margin-bottom: 8px;

}



.popover-text p {

    font-size: 0.9rem;

    color: #64748B;

    line-height: 1.5;

}



.highlight-text {

    font-size: 1.4rem !important;

    font-weight: 800;

    color: #1E293B !important;

}



.popover-arrow {

    position: absolute;

    right: -10px;

    top: 50%;

    transform: translateY(-50%) rotate(45deg);

    width: 20px;

    height: 20px;

    background: white;

    border-top: 1px solid #F1F5F9;

    border-right: 1px solid #F1F5F9;

}



/* AI Helper Specific */

.ai-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 20px;

    padding-bottom: 15px;

    border-bottom: 1px solid #F1F5F9;

}



.status-online {

    font-size: 0.75rem;

    color: #10B981;

    background: #ECFDF5;

    padding: 2px 8px;

    border-radius: 10px;

}



.quick-questions {

    margin-top: 20px;

}



.quick-questions button {

    display: block;

    width: 100%;

    text-align: left;

    background: #F8FAFC;

    border: 1px solid #E2E8F0;

    padding: 10px 15px;

    border-radius: 10px;

    margin-top: 8px;

    font-size: 0.85rem;

    cursor: pointer;

    transition: all 0.2s;

}



.quick-questions button:hover {

    background: #EFF6FF;

    border-color: #3B82F6;

    color: #2563EB;

}



/* Animations */

.fade-slide-enter-active, .fade-slide-leave-active {

    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

}



.fade-slide-enter-from, .fade-slide-leave-to {

    opacity: 0;

    transform: translateX(20px);

}

</style>
