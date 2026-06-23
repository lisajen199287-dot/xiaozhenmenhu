<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElInput, ElButton, ElMessage } from "element-plus";
import { useUser } from "@/utils/userStore";
import * as LoginApi from "@/api/login/index";

const router = useRouter();
const route = useRoute();
const { login } = useUser();

const mobile = ref("");
const password = ref("");
const loading = ref(false);

const redirect = ref<string>((route.query.redirect as string) || "/group-usage");

const handleLogin = async () => {
  if (!mobile.value || !password.value) {
    ElMessage.warning("请输入手机号和密码");
    return;
  }
  if (!/^1[3-9]\d{9}$/.test(mobile.value)) {
    ElMessage.warning("请输入正确的手机号");
    return;
  }

  loading.value = true;
  try {
    const res = await LoginApi.loginByPassword({
      mobile: mobile.value,
      password: password.value,
    });

    const token = res.data?.accessToken || res.accessToken;
    const refreshToken = res.data?.refreshToken || res.refreshToken;
    if (!token) {
      ElMessage.error("登录失败，未获取到 token");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    const userInfo = await LoginApi.getFrontUserInfo();
    await login({
      ...res.data,
      accessToken: token,
      refreshToken: refreshToken,
      userId: userInfo.id,
      nickname: userInfo.nickname,
      avatar: userInfo.userAvatar,
    });

    ElMessage.success("登录成功");
    setTimeout(() => {
      router.push(redirect.value);
    }, 800);
  } catch (error: any) {
    ElMessage.error(error?.message || "登录失败");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-password-page">
    <div class="login-card">
      <h2 class="title">手机号密码登录</h2>
      <div class="form-row">
        <div class="label">手机号码</div>
        <el-input v-model="mobile" maxlength="11" placeholder="请输入手机号" />
      </div>
      <div class="form-row">
        <div class="label">登录密码</div>
        <el-input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="handleLogin" />
      </div>
      <div class="form-row">
        <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4ff 0%, #e2e8f0 100%);
}

.login-card {
  width: 420px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.title {
  text-align: center;
  margin-bottom: 32px;
  color: #0f172a;
  font-size: 1.5rem;
  font-weight: 700;
}

.form-row {
  margin-bottom: 20px;
}

.label {
  margin-bottom: 8px;
  color: #334155;
  font-size: 0.9rem;
}

.login-btn {
  width: 100%;
  margin-top: 12px;
}

</style>
