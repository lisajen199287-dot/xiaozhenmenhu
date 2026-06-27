<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const { push } = useRouter();
import { ElInput, ElButton, ElMessage } from "element-plus";

import { useUser } from "@/utils/userStore";
import * as LoginApi from "@/api/login/index";
import * as authUtil from "@/utils/auth";
import { getFirstTouchData } from "@/utils/tracker";

const router = useRouter();
const route = useRoute();

const { login } = useUser();

const redirect = ref<string>((route.query.redirect as string) || "");

// ========== 二维码相关变量 ==========
const qrCodeUrl = ref("");
const wxToken = ref("");
const qrcodeToken = ref("");

// ========== 🆕 Session ID 用于后端缓存复用 ==========
const qrSessionId = ref<string>("");

const pollingTimer = ref<number | null>(null);
const pollingCount = ref(0);
const isQrCodeExpired = ref(false);

const ProcessStatus = ref("login");
const isCounting = ref(false);

const loginType = ref("2");

// ========== 🆕 智能切换登录类型（带缓存判断）==========
const switchLoginType = (type: string) => {
  loginType.value = type;
  if (type == "2") {
    if (pollingTimer.value) {
      clearTimeout(pollingTimer.value);
    }
    
    // 🧠 智能判断：有有效二维码就直接恢复轮询，不重新生成
    if (!isQrCodeExpired.value && qrCodeUrl.value && wxToken.value) {
      pollingCount.value = 0;
      getWxStatus();  // 继续轮询旧二维码
      console.log('♻️ 复用已有二维码');
    } else {
      getWxCode();    // 需要新生成
      console.log('🔄 生成新二维码');
    }
  } else {
    if (pollingTimer.value) {
      clearTimeout(pollingTimer.value);
    }
  }
};

const phoneForm = ref({
  phone: "",
  code: "",
  companyName: "",
  promotionType: "",
});

const loginMethod = ref<"wechat" | "phone" | "account">("wechat");

const phoneNumber = ref("");

const verifyCode = ref("");

const username = ref("");

const password = ref("");

const isSending = ref(false);

const countdown = ref(60);

const agreed = ref(false);

const showAgreementError = ref(false);

const loginError = ref("");

const startCountdown = () => {
  if (isSending.value) return;

  isSending.value = true;

  countdown.value = 60;

  const timer = setInterval(() => {
    countdown.value--;

    if (countdown.value <= 0) {
      clearInterval(timer);
      isSending.value = false;
    }
  }, 1000);
};

const handleLogin = async () => {
  if (!agreed.value) {
    showAgreementError.value = true;
    setTimeout(() => {
      showAgreementError.value = false;
    }, 3000);
    return;
  }

  loginError.value = "";

  if (loginMethod.value === "account") {
    try {
      const res = await fetch("/api/identity/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username.value,
          password: password.value,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        await login(data.user);

        if (!redirect.value) {
          redirect.value = "/";
        }
        await push({ path: redirect.value });
      } else {
        const err = await res.json();
        loginError.value = err.msg || "登录失败，请检查账号密码";
      }
    } catch (e) {
      loginError.value = "服务器连接失败";
    }
  } else {
    await login({
      id: 10001,
      username: "MockUser",
      nickname: "演示用户",
      role: "user",
    });

    if (!redirect.value) {
      redirect.value = "/";
    }
    await push({ path: redirect.value });
  }
};

const getCode = async () => {
  if (!phoneForm.value.phone) {
    ElMessage.warning("请输入手机号");
    return;
  }

  if (!/^1[3-9]\d{9}$/.test(phoneForm.value.phone)) {
    ElMessage.warning("请输入正确的手机号");
    return;
  }
  
  await LoginApi.captcha({
    mobile: phoneForm.value.phone,
  });
  
  isCounting.value = true;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      countdown.value = 60;
      isCounting.value = false;
    }
  }, 1000);

  ElMessage.success("验证码已发送");
};

const Improve = async () => {
  await LoginApi.updateName({
    companyName: phoneForm.value.companyName,
    promotionType: phoneForm.value.promotionType,
  });
  if (!redirect.value) {
    redirect.value = "/";
  }
  await push({ path: redirect.value });
};

const Skip = async () => {
  if (!redirect.value) {
    redirect.value = "/";
  }
  await push({ path: redirect.value });
};

// ========== 🆕 改进后的获取微信二维码 ==========
const getWxCode = async () => {
  try {
    // 1️⃣ 先从 sessionStorage 恢复或生成 sessionId
    if (!qrSessionId.value) {
      const savedSessionId = sessionStorage.getItem('wx_qr_session_id');
      
      if (savedSessionId) {
        // 有缓存的 sessionId，先检查是否还有效
        qrSessionId.value = savedSessionId;
        console.log('♻️ 从sessionStorage恢复sessionId:', savedSessionId);
      } else {
        // 首次访问，生成新的
        qrSessionId.value = 'qr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
        sessionStorage.setItem('wx_qr_session_id', qrSessionId.value);
        console.log('🆕 生成新sessionId并存入sessionStorage:', qrSessionId.value);
      }
    }
    
    // 2️⃣ 调用后端接口
    const params = { sessionId: qrSessionId.value };
    let res = await LoginApi.wxCode(params);
    
    qrCodeUrl.value = res.qrCodeUrl;
    wxToken.value = res.token;
    pollingCount.value = 0;
    isQrCodeExpired.value = false;

    if (pollingTimer.value) clearTimeout(pollingTimer.value);
    getWxStatus();
    console.log(`✅ 二维码已获取 (session: ${qrSessionId.value.substring(0,16)}...)`);
    
  } catch (error) {
    console.error('❌ 获取二维码失败:', error);
    ElMessage.error('获取二维码失败，请点击刷新重试');
  }
};


// ========== ✅ 修复后的轮询方法 ==========
const getWxStatus = async () => {
  if (!wxToken.value) return;

  try {
    // 🎯 用 let 声明（虽然只赋值一次，但保险）
    const res = await LoginApi.wxCodeStatus({ token: wxToken.value });
    
    if (res.status == "scanned") {
      // ===== 扫码成功 =====
      if (pollingTimer.value) {
        clearTimeout(pollingTimer.value);
        pollingTimer.value = null;  // ← 这里可以赋值，因为是 .value
      }
      
      pollingCount.value = 0;
      isQrCodeExpired.value = false;
      qrcodeToken.value = res.token;
      
      // 清除 sessionStorage（下次打开是新会话）
      sessionStorage.removeItem('wx_qr_session_id');
      qrSessionId.value = '';
      
      console.log('✅ 用户已扫码');
      
      if (res.isBand == "Y") {
        lLogin();  // 已绑定 → 登录
      } else {
        ProcessStatus.value = "bind";  // 未绑定 → 绑定手机号页
      }
      
    } else if (res.status == "waiting") {
      // ===== 等待扫码，继续轮询 =====
      pollingCount.value++;
      
      if (pollingCount.value >= 30) {
        // ===== 超时处理（60秒） =====
        if (pollingTimer.value) {
          clearTimeout(pollingTimer.value);
          pollingTimer.value = null;
        }
        
        isQrCodeExpired.value = true;
        pollingCount.value = 0;
        
        // 清除 sessionId（让用户点击刷新时生成新的）
        sessionStorage.removeItem('wx_qr_session_id');
        qrSessionId.value = '';
        
        console.log('⏰ 二维码超时失效');
        
      } else {
        // ⏳ 继续轮询（2秒后）
        pollingTimer.value = window.setTimeout(() => {
          getWxStatus();
        }, 2000);
      }
    }
    
  } catch (error: any) {
    console.error('❌ 查询扫码状态失败:', error?.message || error);
    
    // 出错后延迟重试（3秒），避免频繁请求
    pollingTimer.value = window.setTimeout(() => {
      getWxStatus();
    }, 3000);
  }
};



const lLogin = async (type?: string) => {
  if (type == "phone") {
    if (!agreed.value) {
      showAgreementError.value = true;
      setTimeout(() => {
        showAgreementError.value = false;
      }, 3000);
      return;
    }
  }
  
  const firstTouch = getFirstTouchData();
  const params = {
    mobile: phoneForm.value.phone || "",
    captcha: phoneForm.value.code || "",
    loginType: loginType.value,
    wxToken: loginType.value == "2" ? qrcodeToken.value : "",
    ...firstTouch,
  };
  
  try {
    let res = await LoginApi.validateCaptcha(params);
    localStorage.setItem("token", res.accessToken);
    
    let res1 = await LoginApi.getFrontUserInfo();
    const item = res;
    item.nickname = res1.nickname;
    item.avatar = res1.userAvatar;
    
    // 存储用户信息
    await login(item);
    
    if (!redirect.value) {
      redirect.value = "/";
    }

    ElMessage.success(`登录成功!`);

    setTimeout(async () => {
      await push({ path: redirect.value });
    }, 1500);
    
  } catch (error) {
    console.error('登录失败:', error);
    ElMessage.error('登录失败，请重试');
  }
};

onMounted(() => {
  console.log('📱 登录页加载完成，初始化二维码...');
  getWxCode();
});
</script>

<template>
  <div class="split-auth-page">
    <div class="auth-visual-side">
      <div class="visual-gradient"></div>
      <div class="visual-content">
        <div class="logo-white" @click="router.push('/')">
          <span>福州市仓山区人工智能公共服务平台</span>
        </div>
        <div class="hero-quote">
          <h2 class="animate-up">欢迎回来</h2>
          <p class="animate-up delay-1">继续您的智能创新之旅</p>
        </div>
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
      </div>
    </div>

    <div class="auth-form-side">
      <div class="auth-card-v2">
        
        <!-- ========== 主登录界面 ========== -->
        <div class="login" v-if="ProcessStatus === 'login'">
          <!-- 切换标签 -->
          <div class="login_type">
            <div
              class="type_name"
              :class="{ type_name_on: loginType === '2' }"
              @click="switchLoginType('2')"
            >
              微信登录
            </div>
            <div
              class="type_name"
              :class="{ type_name_on: loginType === '1' }"
              @click="switchLoginType('1')"
            >
              手机登录
            </div>
          </div>
          
          <!-- 微信二维码区域 -->
          <div class="QCode" v-if="loginType === '2'">
            <div class="img" v-if="!isQrCodeExpired">
              <img :src="qrCodeUrl" class="img" alt="" v-if="qrCodeUrl" />
            </div>
            
            <!-- 过期提示 -->
            <div class="img expired" @click="getWxCode" v-else>
              <div class="expired-content">
                <div class="icon">
                  <el-icon color="#e37318" size="44">
                    <Warning />
                  </el-icon>
                </div>
                <div class="text">二维码已失效</div>
                <div class="refresh">点击刷新</div>
              </div>
            </div>
          </div>
          
          <!-- 手机号登录表单 -->
          <div class="phone" v-else>
            <div class="row">
              <div class="row_title">手机号码</div>
              <div class="input-box">
                <el-input
                  class="input-i"
                  v-model="phoneForm.phone"
                  maxlength="11"
                  placeholder="请输入手机号"
                />
              </div>
            </div>
            <div class="row">
              <div class="row_title">短信验证码</div>
              <div class="input-box">
                <el-input
                  class="input-i"
                  v-model="phoneForm.code"
                  maxlength="6"
                  placeholder="请输入验证码"
                />
                <div
                  class="htn-code"
                  :class="{ disabled: isCounting }"
                  @click="getCode"
                  :disabled="isCounting"
                >
                  {{ isCounting ? `${countdown}s` : "获取验证码" }}
                </div>
              </div>
            </div>
            <div class="btn">
              <el-button
                type="primary"
                class="btn-login"
                :disabled="!phoneForm.phone || !phoneForm.code"
                @click="lLogin('phone')"
              >
                登录/注册
              </el-button>
            </div>
          </div>
          
          <div class="tips">
            {{
              loginType === "2"
                ? "打开微信扫一扫，快速登录/注册"
                : "未注册手机号登录即自动注册"
            }}
          </div>
          
          <!-- 协议勾选 -->
          <div class="agreement">
            <div class="agreement-footer-v2">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="agreed"
                  v-if="loginType === '1'"
                />
                <span class="checkmark" v-if="loginType === '1'"></span>
                
                <div class="agreement-text-group">
                  <span class="agreement-main">
                    {{
                      loginType === "2"
                        ? "扫码即表示已阅读并接受 "
                        : "我已阅读并同意"
                    }}
                    <RouterLink to="/legal">《用户服务协议》</RouterLink>
                    <RouterLink to="/privacy">《隐私政策》</RouterLink>
                  </span>
                </div>
                
                <transition name="toast">
                  <div v-if="showAgreementError" class="agreement-toast">
                    请先同意并勾选上述协议
                  </div>
                </transition>
              </label>
            </div>
          </div>
        </div>
        
        <!-- ========== 绑定手机号界面 ========== -->
        <div class="login bind" v-if="ProcessStatus === 'bind'">
          <div class="login_type">
            <div class="type_name">绑定手机号</div>
          </div>
          <div class="phone">
            <div class="row">
              <div class="row_title">手机号码</div>
              <div class="input-box">
                <el-input
                  class="input-i"
                  v-model="phoneForm.phone"
                  maxlength="11"
                  placeholder="请输入手机号"
                />
              </div>
            </div>
            <div class="row">
              <div class="row_title">短信验证码</div>
              <div class="input-box">
                <el-input
                  class="input-i"
                  v-model="phoneForm.code"
                  maxlength="6"
                  placeholder="请输入验证码"
                />
                <div
                  class="htn-code"
                  :class="{ disabled: isCounting }"
                  @click="getCode"
                  :disabled="isCounting"
                >
                  {{ isCounting ? `${countdown}s` : "获取验证码" }}
                </div>
              </div>
            </div>
            <div class="btn">
              <el-button
                type="primary"
                class="btn-login"
                :disabled="!phoneForm.phone || !phoneForm.code"
                @click="lLogin('bind')"
              >
                下一步
              </el-button>
            </div>
          </div>
        </div>
        
        <!-- ========== 完善信息界面 ========== -->
        <div class="login edit" v-if="ProcessStatus === 'edit'">
          <div class="Skip" @click="Skip">跳过</div>
          <div class="login_type">
            <div class="type_name">完善个人信息</div>
          </div>
          <div class="phone">
            <div class="row">
              <div class="row_title">公司名称（选填）</div>
              <div class="input-box">
                <el-input
                  class="input-i"
                  v-model="phoneForm.companyName"
                  maxlength="50"
                  placeholder="请输入您的公司名称"
                />
              </div>
            </div>
            <div class="row">
              <div class="row_title">请选择您了解到平台的渠道（选填）</div>
              <div class="input-box">
                <el-radio-group v-model="phoneForm.promotionType">
                  <el-radio value="1" size="large">线上</el-radio>
                  <el-radio value="2" size="large">线下</el-radio>
                  <el-radio value="3" size="large">朋友推荐</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="btn">
              <el-button type="primary" class="btn-login" @click="Improve">
                完成注册
              </el-button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.split-auth-page {
  display: flex;
  min-height: 100vh;
  background: white;
  overflow: hidden;
}

.auth-visual-side {
  width: 45%;
  position: relative;
  background: #eff6ff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 60px;
}

.visual-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 70% 30%, #dcfce7 0%, transparent 60%),
    radial-gradient(circle at 20% 80%, #dbeafe 0%, transparent 50%);
  opacity: 0.6;
}

.visual-content {
  position: relative;
  z-index: 5;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.logo-white {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 800;
  color: #3b82f6;
  cursor: pointer;
}

.hero-quote {
  margin-top: auto;
  margin-bottom: 40px;
}

.hero-quote h2 {
  font-size: 2.8rem;
  color: #1e293b;
  font-weight: 800;
  margin-bottom: 12px;
}

.hero-quote p {
  font-size: 1.25rem;
  color: #64748b;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #3b82f6, #06b6d4);
  top: 10%;
  left: -10%;
  opacity: 0.3;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  bottom: 0%;
  right: -5%;
  opacity: 0.2;
}

.auth-form-side {
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.auth-card-v2 {
  width: 100%;
  max-width: 520px;
  background: white;
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  position: relative;
  
  .login {
    .Skip {
      position: absolute;
      right: 24px;
      top: 24px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #666666;
    }

    .login_type {
      display: flex;
      justify-content: center;
      gap: 40px;

      .type_name {
        position: relative;
        font-family: PingFang SC;
        font-weight: 400;
        font-style: Bold;
        font-size: 24px;
        line-height: 32px;
      }

      .type_name_on {
        color: #0052d9;
      }

      .type_name_on::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: -12px;
        width: 100%;
        height: 2px;
        background-color: #0052d9;
        border-radius: 2px;
      }

      .type_name:hover {
        color: #0052d9;
      }
    }

    .QCode {
      margin: 80px auto;

      .img {
        margin: 0 auto;
        width: 210px;
        height: 210px;
      }

      .img.expired {
        background-color: #f5f7fa;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: #e4e7ed;
        }

        .expired-content {
          text-align: center;

          .icon {
            margin-bottom: 16px;
          }

          .text {
            font-size: 14px;
            color: #606266;
            margin-bottom: 8px;
          }

          .refresh {
            font-size: 14px;
            color: #0052d9;
            font-weight: 500;
          }
        }
      }
    }

    .phone {
      margin: 24px 24px 0;

      .row {
        margin: 0 0 32px;

        .row_title {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 8px;
        }

        .input-box {
          display: flex;
          align-items: center;

          .input-i {
            flex: 1;
            height: 52px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            outline: none;
            font-size: 1rem;
            transition: all 0.2s;
          }

          .htn-code {
            padding: 0 20px;
            width: 122px;
            height: 52px;
            border-radius: 3px;
            border: 1px solid #e2e8f0;
            font-weight: 400;
            font-size: 16px;
            line-height: 52px;
            text-align: center;
            color: #64748b;
            margin-left: 16px;
            cursor: pointer;
          }

          .htn-code:hover {
            background-color: rgba(0, 82, 217, 0.05);
          }

          .htn-code.disabled {
            border-color: #dcdfe6;
            color: #c0c4cc;
            cursor: not-allowed;
          }

          .htn-code.disabled:hover {
            background-color: transparent;
          }
        }
      }

      .btn {
        margin-bottom: 66px;
      }

      .btn-login {
        width: 100%;
        height: 52px;
      }
    }

    .tips {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #666;
    }

    .agreement {
      font-weight: 400;
      font-size: 15px;
      line-height: 24px;
      text-align: center;
      color: #999;
      margin-top: 8px;

      span {
        color: #0052d9;
      }
    }
  }
}

.agreement-footer-v2 {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f8fafc;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 1.5px solid #cbd5e1;
  border-radius: 4px;
  margin-top: 2px;
  position: relative;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox-label input:checked ~ .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkmark::after {
  content: "";
  position: absolute;
  display: none;
  left: 4.5px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label input:checked ~ .checkmark::after {
  display: block;
}

.agreement-text-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.agreement-main {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
}

.agreement-main a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
}

.agreement-toast {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #334155;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 0.9rem;
  z-index: 100;
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-up {
  animation: upSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.delay-1 {
  animation-delay: 0.2s;
}

@keyframes upSlide {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .auth-visual-side {
    display: none;
  }
  .auth-form-side {
    width: 100%;
  }
}
</style>
