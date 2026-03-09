<script setup lang="ts">

import { ref } from 'vue'

import { ElMessage } from 'element-plus'



const adminInfo = ref({

  username: 'admin',

  nickname: '系统管理员',

  role: '超级管理员',

  email: 'admin@cii-group.com',

  lastLogin: new Date().toLocaleString()

})



const passwordForm = ref({

  oldPassword: '',

  newPassword: '',

  confirmPassword: ''

})



const handleUpdateProfile = () => {

  ElMessage.success('个人信息更新成功 (演示)')

}



const handleChangePassword = () => {

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {

    return ElMessage.error('两次输入的密码不一致')

  }

  ElMessage.success('密码修改成功')

  passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }

}

</script>



<template>

  <div class="profile-view">

    <div class="page-header">

      <h2>个人中心</h2>

      <p class="sub-title">管理您的管理员账号信息与安全设置</p>

    </div>



    <div class="profile-grid">

      <div class="card basic-info">

        <div class="card-header">

          <h3>基本信息</h3>

        </div>

        <div class="card-body">

          <div class="info-item">

            <label>账号名称</label>

            <span>{{ adminInfo.username }}</span>

          </div>

          <div class="info-item">

            <label>当前角色</label>

            <el-tag type="danger" effect="dark">{{ adminInfo.role }}</el-tag>

          </div>

          <div class="info-item">

            <label>显示昵称</label>

            <el-input v-model="adminInfo.nickname" />

          </div>

          <div class="info-item">

            <label>电子邮箱</label>

            <el-input v-model="adminInfo.email" />

          </div>

          <div class="info-item">

            <label>最后登录</label>

            <span class="text-muted">{{ adminInfo.lastLogin }}</span>

          </div>

          <div class="actions">

            <el-button type="primary" @click="handleUpdateProfile">更新基本资料</el-button>

          </div>

        </div>

      </div>



      <div class="card security-settings">

        <div class="card-header">

          <h3>安全设置</h3>

        </div>

        <div class="card-body">

          <h4>修改登录密码</h4>

          <el-form label-position="top">

            <el-form-item label="原密码">

              <el-input v-model="passwordForm.oldPassword" type="password" show-password />

            </el-form-item>

            <el-form-item label="新密码">

              <el-input v-model="passwordForm.newPassword" type="password" show-password />

            </el-form-item>

            <el-form-item label="确认新密码">

              <el-input v-model="passwordForm.confirmPassword" type="password" show-password />

            </el-form-item>

            <el-button type="warning" @click="handleChangePassword" style="width: 100%">修改密码</el-button>

          </el-form>

        </div>

      </div>

    </div>

  </div>

</template>



<style scoped>

.page-header { margin-bottom: 32px; }

.page-header h2 { font-size: 1.85rem; font-weight: 850; color: #0f172a; margin-bottom: 8px; }

.sub-title { color: #94a3b8; font-size: 0.95rem; }



.profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }



.card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

.card-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; background: #f8fafc; }

.card-header h3 { font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0; }



.card-body { padding: 32px; }



.info-item { margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px; }

.info-item label { font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }

.info-item span { font-weight: 600; color: #1e293b; }



.text-muted { color: #94a3b8 !important; font-size: 0.9rem; }



h4 { margin: 0 0 20px; font-size: 1rem; color: #1e293b; font-weight: 800; }



.actions { margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 24px; }

</style>