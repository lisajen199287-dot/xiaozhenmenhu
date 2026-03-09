<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

import { useAuth } from '@/utils/adminStore'



const router = useRouter()

const { login } = useAuth()



const username = ref('admin')

const password = ref('')

const captcha = ref('')

const captchaCode = ref('')

const smsCode = ref('')

const error = ref('')

const loading = ref(false)

const showSmsStep = ref(false)



const fetchCaptcha = async () => {

    try {

        const res = await fetch('/api/auth/captcha')

        const data = await res.json()

        captchaCode.value = data.code

    } catch (e) {

        console.error('Failed to fetch captcha', e)

    }

}



onMounted(() => {

    fetchCaptcha()

})



const handleLogin = async () => {

    if (!username.value || !password.value || !captcha.value) {

        error.value = '请输入账号、密码及图形验证码'

        return

    }



    if (showSmsStep.value && !smsCode.value) {

        error.value = '请输入手机验证码'

        return

    }



    loading.value = true

    error.value = ''



    const result = await login({

        username: username.value,

        password: password.value,

        captcha: captcha.value,

        smsCode: smsCode.value

    })



    if (result.success) {

        router.push('/admin')

    } else if (result.two_factor_required) {

        showSmsStep.value = true

        error.value = '已向您的绑定手机发送验证码，请查收'

    } else {

        error.value = result.msg

        fetchCaptcha() // Refresh captcha on failure

        captcha.value = ''

    }

    loading.value = false

}

</script>



<template>

  <div class="admin-login-page">

    <div class="login-card">

      <div class="login-header">

        <i class="fas fa-shield-alt"></i>

        <h1>管理后台安全登录</h1>

        <p>仓山区人工智能公共服务平台</p>

      </div>



      <div class="login-form">

        <div v-if="!showSmsStep">

            <div class="form-group">

                <label>管理员账号</label>

                <div class="input-wrapper">

                    <i class="fas fa-user"></i>

                    <input v-model="username" type="text" placeholder="请输入管理员账号">

                </div>

            </div>



            <div class="form-group">

                <label>登录密码</label>

                <div class="input-wrapper">

                    <i class="fas fa-lock"></i>

                    <input v-model="password" type="password" placeholder="请输入登录密码">
                </div>
            </div>



            <div class="form-group">

                <label>图形验证码</label>

                <div class="captcha-row">

                    <div class="input-wrapper captcha-input">

                        <i class="fas fa-check-circle"></i>

                        <input v-model="captcha" type="text" placeholder="验证码" @keyup.enter="handleLogin">

                    </div>

                    <div class="captcha-box" @click="fetchCaptcha" title="点击更换">

                        {{ captchaCode }}

                    </div>

                </div>

            </div>

        </div>



        <div v-else class="sms-step animate-fade">

            <div class="form-group">

                <label>手机验证码(2FA)</label>

                <div class="input-wrapper">

                    <i class="fas fa-mobile-alt"></i>

                    <input v-model="smsCode" type="text" placeholder="请输入 6 位验证码" maxlength="6" @keyup.enter="handleLogin">

                </div>

                <p class="sms-tip">验证码已发送至您的加密手机，请在 5 分钟内完成验证</p>

            </div>

        </div>



        <div class="security-status" :class="{ locked: error.includes('锁定') }">

           <i class="fas" :class="error.includes('锁定') ? 'fa-user-lock' : 'fa-info-circle'"></i>

           {{ error.includes('锁定') ? '账号已锁定' : '安全等级：高 (IP 限速已开启)' }}

        </div>



        <p v-if="error" class="error-msg">{{ error }}</p>



        <button class="btn-login" :disabled="loading" @click="handleLogin">

          <i v-if="loading" class="fas fa-spinner fa-spin"></i>

          {{ loading ? '处理中...' : (showSmsStep ? '验证并进入' : '安全登录') }}

        </button>

        

        <button v-if="showSmsStep" class="btn-back" @click="showSmsStep = false; smsCode = ''">返回重新登录</button>

      </div>



      <div class="login-footer">

        <a href="/">回到平台首页</a>

      </div>

    </div>

  </div>

</template>



<style scoped>

.admin-login-page {

  height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #0f172a;

  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0);

  background-size: 40px 40px;

}



.login-card {

  width: 420px;

  background: white;

  border-radius: 12px;

  padding: 48px;

  box-shadow: 0 40px 100px rgba(0,0,0,0.5);

}



.login-header {

  text-align: center;

  margin-bottom: 40px;

}



.login-header i { font-size: 3rem; color: #4f46e5; margin-bottom: 24px; }

.login-header h1 { font-size: 1.5rem; font-weight: 850; color: #0f172a; margin-bottom: 8px; }

.login-header p { font-size: 0.9rem; color: #64748b; font-weight: 600; }



.form-group { margin-bottom: 24px; }

.form-group label { display: block; font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 8px; }



.input-wrapper { position: relative; }

.input-wrapper i { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8; }

.input-wrapper input {

  width: 100%; box-sizing: border-box; padding: 12px 16px 12px 44px;

  border: 1px solid #e2e8f0; border-radius: 6px; font-size: 1rem;

  background: #f8fafc; outline: none; transition: all 0.2s;

}

.input-wrapper input:focus { border-color: #4f46e5; background: white; box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1); }



.captcha-row { display: flex; gap: 12px; }

.captcha-input { flex: 1; }

.captcha-box {

    width: 100px; height: 46px; background: #eef2ff; border: 1px solid #e0e7ff;

    border-radius: 6px; display: flex; align-items: center; justify-content: center;

    font-family: 'Courier New', Courier, monospace; font-weight: 900; font-size: 1.4rem;

    color: #4f46e5; cursor: pointer; user-select: none; letter-spacing: 4px;

}



.sms-tip { font-size: 0.75rem; color: #64748b; margin-top: 8px; }



.security-status {

  font-size: 0.75rem; color: #059669; margin-bottom: 24px; display: flex; align-items: center;

  gap: 6px; justify-content: center; background: #ecfdf5; padding: 10px; border-radius: 6px;

}

.security-status.locked { color: #dc2626; background: #fef2f2; }



.btn-login {

  width: 100%; padding: 14px; background: #4f46e5; color: white; border: none;

  border-radius: 6px; font-size: 1rem; font-weight: 800; cursor: pointer;

  display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s;

}

.btn-login:hover:not(:disabled) { background: #4338ca; transform: translateY(-1px); }

.btn-login:disabled { opacity: 0.6; cursor: not-allowed; }



.btn-back { width: 100%; background: none; border: none; color: #64748b; font-size: 0.85rem; margin-top: 16px; cursor: pointer; }



.error-msg {

  color: #ef4444; font-size: 0.85rem; font-weight: 600; margin-bottom: 16px; text-align: center;

  background: #fef2f2; padding: 10px; border-radius: 4px; border: 1px solid #fee2e2;

}



.login-footer { margin-top: 32px; text-align: center; }

.login-footer a { color: #64748b; text-decoration: none; font-size: 0.85rem; font-weight: 600; }



.animate-fade { animation: fadeIn 0.3s ease-out; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

</style>
