<script setup lang="ts">
import { nextTick, ref } from 'vue'

type ChatMessage = {
  role: 'assistant' | 'user'
  text: string
}

const open = ref(false)
const input = ref('')
const messages = ref<ChatMessage[]>([
  {
    role: 'assistant',
    text: '您好，我是仓山区互联网小镇平台智能客服。可以咨询园企协同、问数系统、数字员工、控制台使用等问题。'
  }
])
const chatBodyRef = ref<HTMLElement | null>(null)

const quickQuestions = [
  '如何进入园企协同平台？',
  '问数系统怎么登录？',
  '数字员工有哪些入口？'
]

const scrollToBottom = async () => {
  await nextTick()
  if (chatBodyRef.value) {
    chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
  }
}

const getReply = (question: string) => {
  if (question.includes('园企')) {
    return '您可以在首页“核心功能模块”点击“园企协同平台”，进入平台介绍页；园企运营后台和小程序二维码都在该页面入口中。'
  }
  if (question.includes('问数')) {
    return '电商运营全链路问数系统可从首页第三个核心功能卡片进入，支持账号登录和 SSO 授权登录。'
  }
  if (question.includes('数字') || question.includes('直播')) {
    return '直播电商数字员工系统包含“电商视频生成系统”和“电商陪练系统”，可在落地页选择对应入口。'
  }
  if (question.includes('控制台')) {
    return '点击页面右上角“控制台”可进入用户中心、费用中心、工单和帮助反馈等功能。'
  }
  return '我已收到您的问题。当前为原型演示，我可以先为您定位平台入口、登录流程、模块说明和控制台使用方式。'
}

const sendMessage = async (text = input.value) => {
  const question = text.trim()
  if (!question) return

  messages.value.push({ role: 'user', text: question })
  input.value = ''
  await scrollToBottom()

  window.setTimeout(async () => {
    messages.value.push({ role: 'assistant', text: getReply(question) })
    await scrollToBottom()
  }, 260)
}

const toggleOpen = () => {
  open.value = !open.value
  if (open.value) scrollToBottom()
}
</script>

<template>
  <div class="floating-service">
    <Transition name="chat-pop">
      <section v-if="open" class="chat-panel" aria-label="智能客服对话窗口">
        <header class="chat-header">
          <div>
            <span class="online-dot"></span>
            <strong>智能客服</strong>
            <p>小镇平台服务助手</p>
          </div>
          <button aria-label="关闭智能客服" @click="open = false">
            <i class="fas fa-times"></i>
          </button>
        </header>

        <div ref="chatBodyRef" class="chat-body">
          <div
            v-for="(message, index) in messages"
            :key="`${message.role}-${index}`"
            class="message"
            :class="message.role"
          >
            <span class="avatar">
              <i v-if="message.role === 'assistant'" class="fas fa-robot"></i>
              <i v-else class="fas fa-user"></i>
            </span>
            <p>{{ message.text }}</p>
          </div>
        </div>

        <div class="quick-row">
          <button v-for="question in quickQuestions" :key="question" @click="sendMessage(question)">
            {{ question }}
          </button>
        </div>

        <form class="chat-input" @submit.prevent="sendMessage()">
          <input v-model="input" placeholder="请输入您想咨询的问题" aria-label="咨询问题" />
          <button type="submit" aria-label="发送">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </section>
    </Transition>

    <button class="service-ball" :class="{ active: open }" aria-label="打开智能客服" @click="toggleOpen">
      <i class="fas fa-comments"></i>
      <span>智能客服</span>
    </button>
  </div>
</template>

<style scoped>
.floating-service{position:fixed;right:28px;bottom:28px;z-index:1200;display:flex;flex-direction:column;align-items:flex-end;gap:14px}.service-ball{position:relative;display:flex;align-items:center;gap:9px;height:54px;padding:0 18px;border:0;border-radius:999px;background:linear-gradient(135deg,#2563eb,#06b6d4);color:#fff;font-size:15px;font-weight:900;box-shadow:0 18px 42px rgba(37,99,235,.32);cursor:pointer;transition:transform .2s ease,box-shadow .2s ease}.service-ball:before{content:"";position:absolute;inset:-5px;border-radius:999px;border:1px solid rgba(37,99,235,.18);background:rgba(37,99,235,.08);z-index:-1}.service-ball:hover,.service-ball.active{transform:translateY(-2px);box-shadow:0 22px 54px rgba(37,99,235,.4)}.service-ball i{font-size:18px}.chat-panel{width:380px;overflow:hidden;border:1px solid rgba(37,99,235,.16);border-radius:22px;background:#fff;box-shadow:0 28px 80px rgba(15,23,42,.2)}.chat-header{display:flex;align-items:flex-start;justify-content:space-between;padding:18px 18px 16px;background:linear-gradient(135deg,#0f3fbd,#0ea5e9);color:#fff}.chat-header strong{font-size:18px}.chat-header p{margin:4px 0 0;color:#dbeafe;font-size:13px;font-weight:700}.online-dot{display:inline-block;width:8px;height:8px;margin-right:8px;border-radius:50%;background:#34d399;box-shadow:0 0 0 4px rgba(52,211,153,.2)}.chat-header button{width:30px;height:30px;border:0;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;cursor:pointer}.chat-body{height:280px;padding:18px;overflow:auto;background:linear-gradient(180deg,#f8fbff,#fff)}.message{display:flex;gap:10px;margin-bottom:14px}.message.user{flex-direction:row-reverse}.avatar{flex:0 0 30px;width:30px;height:30px;display:grid;place-items:center;border-radius:50%;background:#e0f2fe;color:#2563eb}.message.user .avatar{background:#2563eb;color:#fff}.message p{max-width:260px;margin:0;padding:10px 12px;border-radius:14px;background:#eef6ff;color:#334155;font-size:14px;line-height:1.55}.message.user p{background:#2563eb;color:#fff}.quick-row{display:flex;gap:8px;overflow:auto;padding:0 18px 14px;background:#fff}.quick-row button{flex:0 0 auto;border:1px solid #bfdbfe;border-radius:999px;background:#eff6ff;color:#1d4ed8;padding:7px 10px;font-size:12px;font-weight:800;cursor:pointer}.chat-input{display:grid;grid-template-columns:1fr 42px;gap:8px;padding:14px 16px 16px;border-top:1px solid #e2e8f0;background:#fff}.chat-input input{height:42px;border:1px solid #dbeafe;border-radius:999px;padding:0 14px;outline:none;color:#0f172a}.chat-input input:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.1)}.chat-input button{width:42px;height:42px;border:0;border-radius:50%;background:linear-gradient(135deg,#2563eb,#06b6d4);color:#fff;cursor:pointer}.chat-pop-enter-active,.chat-pop-leave-active{transition:all .22s ease}.chat-pop-enter-from,.chat-pop-leave-to{opacity:0;transform:translateY(12px) scale(.96)}@media(max-width:560px){.floating-service{right:16px;bottom:18px}.chat-panel{width:calc(100vw - 32px)}.service-ball span{display:none}.service-ball{width:54px;justify-content:center;padding:0}.chat-body{height:260px}}
</style>
