<script setup lang="ts">

import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { useUser } from '@/utils/userStore'



const router = useRouter()
const { login } = useUser()
const regMethod = ref<'wechat' | 'phone' | 'account'>('account')

const phoneNumber = ref('')

const verifyCode = ref('')

const username = ref('')

const password = ref('')

const confirmPassword = ref('')

const isSending = ref(false)

const countdown = ref(0)

const agreed = ref(false)

const showAgreementError = ref(false)
const regError = ref('')



const startCountdown = () => {

  if (isSending.value) return

  isSending.value = true

  countdown.value = 60

  const timer = setInterval(() => {

    countdown.value--

    if (countdown.value <= 0) {

      clearInterval(timer)

      isSending.value = false

    }

  }, 1000)

}



const handleRegister = async () => {
  if (!agreed.value) {
    showAgreementError.value = true
    setTimeout(() => { showAgreementError.value = false }, 3000)
    return
  }

  regError.value = ''

  if (regMethod.value === 'account') {
      if (!username.value || !password.value) {
          regError.value = '请输入邮箱与密码'
          return
      }
      if (password.value !== confirmPassword.value) {
          regError.value = '两次输入的密码不一致'
          return
      }

      try {
          const res = await fetch('/api/identity/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: username.value, password: password.value })
          })

          if (res.ok) {
              const data = await res.json()
              await login(data.user) // Cache credentials in frontend store
              alert('注册并登录成功！送您 50 算力体验服务!')
              window.location.href = '/console.html'
          } else {
              const err = await res.json()
              regError.value = err.msg || '注册失败，请检查输入'
          }
      } catch (e) {
          regError.value = '服务器连接失败，请稍后重试'
      }
  } else {
      // Mock for Phone/Wechat
      alert('演示环境：第三方/手机号注册敬请期待功能补全。请使用账号(邮箱)注册。')
  }
}

</script>



<template>

  <div class="split-auth-page">

    <div class="auth-visual-side">

      <div class="visual-gradient"></div>

      <div class="visual-content">

        <div class="logo-white" @click="router.push('/')">

          <span>仓山区互联网小镇数智化服务平台</span>

        </div>

        <div class="hero-quote">

          <h2 class="animate-up">仓山区互联网小镇数智化服务平台</h2>

          <p class="animate-up delay-1">开启您的全天候智能服务之旅</p>

        </div>

        <div class="shape shape-1"></div>

        <div class="shape shape-2"></div>

      </div>

    </div>



    <div class="auth-form-side">

      <div class="auth-card-v2">

        <div class="brand-header">

           <div class="mini-logo">

              <span>仓山区互联网小镇数智化服务平台</span>

           </div>

           <h1>创建平台账号</h1>

        </div>



        <div class="auth-tabs-v2">

          <button :class="['tab-btn-v2', { active: regMethod === 'wechat' }]" @click="regMethod = 'wechat'">从微信注册</button>

          <button :class="['tab-btn-v2', { active: regMethod === 'phone' }]" @click="regMethod = 'phone'">手机号注册</button>

          <button :class="['tab-btn-v2', { active: regMethod === 'account' }]" @click="regMethod = 'account'">账号注册</button>

        </div>



        <div class="auth-body-v2">

          <div v-if="regMethod === 'wechat'" class="tab-content-v2 fade-in">

            <div class="qr-wrapper">

              <div class="qr-inner">

                <i class="fab fa-weixin"></i>

                <div class="agreement-mask" v-if="!agreed">

                  <p>请先同意并勾选<br/>许可协议和隐私政策</p>

                </div>

              </div>

              <p class="qr-text-hint">关注并扫码注册账号</p>

            </div>

          </div>



          <div v-if="regMethod === 'phone'" class="tab-content-v2 fade-in">

            <div class="input-field-v2"><input type="text" v-model="phoneNumber" placeholder="请输入手机号" maxlength="11" /></div>

            <div class="input-field-v2 code-row">

              <input type="text" v-model="verifyCode" placeholder="短信验证码" maxlength="6" />

              <button class="send-btn-v2" :disabled="isSending" @click="startCountdown">{{ isSending ? `${countdown}s` : '获取验证码' }}</button>

            </div>

            <button class="submit-btn-v2" @click="handleRegister">立即注册</button>

          </div>



          <div v-if="regMethod === 'account'" class="tab-content-v2 fade-in">

            <div class="input-field-v2"><input type="text" v-model="username" placeholder="设置用户名" /></div>

            <div class="input-field-v2"><input type="password" v-model="password" placeholder="设置登录密码" /></div>

            <div class="input-field-v2"><input type="password" v-model="confirmPassword" placeholder="确认登录密码" @keyup.enter="handleRegister" /></div>
            
            <div v-if="regError" class="login-error-msg">{{ regError }}</div>

            <button class="submit-btn-v2" @click="handleRegister">创建账号</button>

          </div>

        </div>



        <div class="agreement-footer-v2">

          <label class="checkbox-label">

            <input type="checkbox" v-model="agreed" />

            <span class="checkmark"></span>

            <div class="agreement-text-group">

              <span class="agreement-main">

                我已阅读并同意<RouterLink to="/legal">用户服务协议</RouterLink> <RouterLink to="/privacy">隐私政策</RouterLink>

              </span>

            </div>

          </label>

        </div>



        <div class="auth-footer-v2">

          <span>已有账号</span>

          <RouterLink to="/login">立即登录</RouterLink>

        </div>



        <transition name="toast">

          <div v-if="showAgreementError" class="agreement-toast">请先同意并勾选上述协议</div>

        </transition>

      </div>

    </div>

  </div>

</template>



<style scoped>

/* Reusing the same consolidated styles from LoginView for perfect alignment */

.split-auth-page { display: flex; min-height: 100vh; background: white; overflow: hidden; }

.auth-visual-side { width: 45%; position: relative; background: #eff6ff; overflow: hidden; display: flex; flex-direction: column; padding: 60px; }

.visual-gradient { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 70% 30%, #dcfce7 0%, transparent 60%), radial-gradient(circle at 20% 80%, #dbeafe 0%, transparent 50%); opacity: 0.6; }

.visual-content { position: relative; z-index: 5; height: 100%; display: flex; flex-direction: column; }

.logo-white { display: flex; align-items: center; gap: 12px; font-size: 1.5rem; font-weight: 800; color: #3b82f6; cursor: pointer; }

.hero-quote { margin-top: auto; margin-bottom: 40px; }

.hero-quote h2 { font-size: 2.8rem; color: #1e293b; font-weight: 800; margin-bottom: 12px; }

.hero-quote p { font-size: 1.25rem; color: #64748b; }

.shape { position: absolute; border-radius: 50%; filter: blur(80px); z-index: 1; }

.shape-1 { width: 400px; height: 400px; background: linear-gradient(135deg, #3b82f6, #06b6d4); top: 10%; left: -10%; opacity: 0.3; }

.shape-2 { width: 300px; height: 300px; background: linear-gradient(135deg, #10b981, #3b82f6); bottom: 0%; right: -5%; opacity: 0.2; }

.auth-form-side { width: 55%; display: flex; align-items: center; justify-content: center; background: #f8fafc; }

.auth-card-v2 { width: 100%; max-width: 520px; background: white; padding: 40px 60px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); position: relative; }

.brand-header { margin-bottom: 40px; }

.mini-logo { display: flex; align-items: center; gap: 8px; color: #3b82f6; font-weight: 700; font-size: 1.2rem; margin-bottom: 16px; }

.brand-header h1 { font-size: 2rem; color: #0f172a; font-weight: 700; }

.auth-tabs-v2 { display: flex; gap: 32px; margin-bottom: 40px; border-bottom: 1px solid #f1f5f9; }

.tab-btn-v2 { padding: 12px 0; background: none; border: none; font-size: 1rem; font-weight: 600; color: #64748b; cursor: pointer; position: relative; }

.tab-btn-v2.active { color: #0f172a; }

.tab-btn-v2.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: #3b82f6; }

.tab-content-v2 { min-height: 240px; }

.qr-wrapper { display: flex; flex-direction: column; align-items: center; gap: 24px; }

.qr-inner { position: relative; width: 200px; height: 200px; background: white; border: 1px solid #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 10px; }

.qr-inner i { font-size: 8rem; color: #07c160; opacity: 0.1; }

.qr-inner::before { content: ''; position: absolute; width: 160px; height: 160px; background-image: repeating-linear-gradient(45deg, #f1f5f9 0, #f1f5f9 2px, transparent 2px, transparent 10px); z-index: 1; }

.agreement-mask { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.85); display: flex; align-items: center; justify-content: center; text-align: center; z-index: 10; border-radius: 8px; }

.agreement-mask p { color: #1e293b; font-size: 0.95rem; line-height: 1.6; font-weight: 600; }

.qr-text-hint { color: #475569; font-size: 0.95rem; }

.input-field-v2 { margin-bottom: 20px; }

.input-field-v2 input { width: 100%; height: 52px; padding: 0 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; font-size: 1rem; transition: all 0.2s; }

.input-field-v2 input:focus { border-color: #3b82f6; background: white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }

.code-row { display: flex; gap: 12px; }

.send-btn-v2 { white-space: nowrap; padding: 0 20px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; color: #64748b; font-weight: 600; cursor: pointer; }

.submit-btn-v2 { width: 100%; height: 52px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 600; margin-top: 10px; cursor: pointer; }

.agreement-footer-v2 { display: flex; margin-bottom: 24px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #f8fafc; }

.checkbox-label { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; }

.checkbox-label input { display: none; }

.checkmark { width: 16px; height: 16px; border: 1.5px solid #cbd5e1; border-radius: 4px; margin-top: 2px; position: relative; transition: all 0.2s; flex-shrink: 0; }

.checkbox-label input:checked ~ .checkmark { background: #3b82f6; border-color: #3b82f6; }

.checkmark::after { content: ''; position: absolute; display: none; left: 4.5px; top: 1px; width: 4px; height: 8px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }

.checkbox-label input:checked ~ .checkmark::after { display: block; }

.agreement-text-group { display: flex; flex-direction: column; gap: 4px; }

.agreement-main { font-size: 0.85rem; color: #64748b; line-height: 1.5; }

.agreement-main a { color: #3b82f6; font-weight: 600; text-decoration: none; }

.auth-footer-v2 { text-align: center; color: #64748b; margin-top: 24px; }

.auth-footer-v2 a { color: #3b82f6; font-weight: 600; text-decoration: none; }

.agreement-toast { position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%); background: #334155; color: white; padding: 12px 24px; border-radius: 4px; font-size: 0.9rem; z-index: 100; }

.fade-in { animation: fadeIn 0.4s ease-out; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.animate-up { animation: upSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

.delay-1 { animation-delay: 0.2s; }

@keyframes upSlide { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) { .auth-visual-side { display: none; } .auth-form-side { width: 100%; } }

</style>