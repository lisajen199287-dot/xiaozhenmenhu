<script setup lang="ts">

import { useUser } from '@/utils/userStore'

import { ElMessage } from 'element-plus'



const { user } = useUser()



const copyUserNo = () => {

    if (user.value?.userNo) {

        navigator.clipboard.writeText(user.value.userNo)

        ElMessage.success('用户号已复制到剪贴板')

    }

}



const handleSave = () => {

    ElMessage.success('设置已保存（演示模式）')
}

</script>



<template>

  <div class="settings-view">

    <div class="page-header">

      <div class="header-text">

        <h2>账号设置</h2>

        <p>个人资料、安全详情及通知偏好管理</p>

      </div>

      <button class="btn-secondary">安全审计日志</button>

    </div>



    <div class="settings-grid">

      <div class="content-card">

        <div class="card-header"><h3>个人资料</h3></div>

        <div class="card-body">

          <div class="form-group">
            <label>用户号（公开 ID）</label>
            <div class="user-no-row">
              <input type="text" :value="user?.userNo || '生成中...'" disabled class="user-no-input" />
              <button class="copy-btn" @click="copyUserNo" title="复制用户号">
                <i class="fas fa-copy"></i>
              </button>
            </div>
            <p class="field-tip">向客服提供此用户号，可用于快速查询您的账户</p>
          </div>
          <div class="form-group">
            <label>用户名 / 手机号</label>
            <input type="text" :value="user?.username" disabled />
          </div>
          <div class="form-group">
            <label>显示昵称</label>
            <input type="text" :value="user?.nickname || user?.username" />
          </div>
          <div class="form-group">
            <label>绑定邮箱</label>
            <input type="email" :value="user?.email" />
          </div>
          <div class="form-group">
            <label>所属机构 / 企业</label>
            <input type="text" :value="user?.companyName" placeholder="尚未绑定企业" />
          </div>

          <div class="form-actions">

            <button class="btn-primary" @click="handleSave">保存修改</button>

          </div>

        </div>

      </div>



      <div class="content-card">

        <div class="card-header"><h3>安全设置</h3></div>

        <div class="card-body">

          <div class="toggle-row">

            <div class="toggle-info">

              <span class="label">短信双重验证 (2FA)</span>

              <p class="desc">登录时需要输入手机验证码</p>

            </div>

            <el-switch :model-value="false" />

          </div>

          <div class="toggle-row">

            <div class="toggle-info">
              <span class="label">额度耗尽报警</span>
              <p class="desc">当 Token 余量低于 10% 时发送邮件提醒</p>
            </div>

            <el-switch :model-value="true" />

          </div>

        </div>

      </div>

    </div>

  </div>

</template>



<style scoped>

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }

.header-text h2 { font-size: 1.8rem; font-weight: 850; color: #0f172a; margin-bottom: 8px; }

.header-text p { color: #64748b; }

.btn-secondary { background: white; border: 1px solid #e2e8f0; color: #475569; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; }



.settings-grid { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 600px; }

.content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }

.card-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }

.card-header h3 { font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0; }

.card-body { padding: 24px; }

.form-group { margin-bottom: 20px; }

.form-group label { display: block; font-size: 0.9rem; font-weight: 700; color: #475569; margin-bottom: 8px; }

.form-group input { width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.95rem; color: #0f172a; outline: none; transition: border-color 0.2s; }

.form-group input:disabled { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }

.form-group input:focus { border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }

.form-actions { display: flex; justify-content: flex-end; margin-top: 32px; }

.btn-primary { background: #0f172a; color: white; border: none; padding: 12px 32px; border-radius: 6px; font-weight: 800; cursor: pointer; }



.toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid #f1f5f9; }

.toggle-row:last-child { border-bottom: none; }

.toggle-info .label { display: block; font-weight: 700; color: #0f172a; margin-bottom: 4px; }

.toggle-info .desc { font-size: 0.85rem; color: #64748b; }

</style>