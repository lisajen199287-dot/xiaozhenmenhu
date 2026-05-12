<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUser } from '@/utils/userStore'
import { apiAgUserGet, apiUpdateProfile, apiUploadFile } from '@/api/newApi'

const { user, updateUserField } = useUser()
const fileInput = ref<HTMLInputElement | null>(null)

const userInfo = ref<any>(null)
const editingNickname = ref(false)
const nicknameInput = ref('')
const uploading = ref(false)
const saving = ref(false)

const loadUserInfo = async () => {
  try {
    const res = await apiAgUserGet()
    userInfo.value = res
  } catch {
    ElMessage.error('获取用户信息失败')
  }
}

onMounted(() => {
  loadUserInfo()
})

// -- 昵称编辑 --
const startEditNickname = () => {
  nicknameInput.value = userInfo.value?.nickname || ''
  editingNickname.value = true
}

const cancelEditNickname = () => {
  editingNickname.value = false
}

const saveNickname = async () => {
  const trimmed = nicknameInput.value.trim()
  if (!trimmed) {
    ElMessage.warning('昵称不能为空')
    return
  }
  if (trimmed.length < 2 || trimmed.length > 20) {
    ElMessage.warning('昵称长度为 2-20 个字符')
    return
  }
  saving.value = true
  try {
    await apiUpdateProfile({ nickname: trimmed })
    ElMessage.success('昵称修改成功')
    editingNickname.value = false
    await loadUserInfo()
    if (user.value) {
      updateUserField({ nickname: trimmed })
    }
  } catch {
    ElMessage.error('修改失败')
  } finally {
    saving.value = false
  }
}

// -- 头像上传 --
const triggerUpload = () => {
  fileInput.value?.click()
}

const handleAvatarUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    ElMessage.warning('仅支持 JPG/PNG 格式')
    return
  }
  if (file.size > 2 * 1024 * 1024) {
    ElMessage.warning('图片大小不能超过 2MB')
    return
  }

  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    const url = await apiUploadFile(formData)
    await apiUpdateProfile({ avatar: url })
    ElMessage.success('头像更新成功')
    await loadUserInfo()
    if (user.value) {
      updateUserField({ avatar: url })
    }
  } catch {
    ElMessage.error('头像上传失败')
  } finally {
    uploading.value = false
    input.value = ''
  }
}

const getNickname = () => userInfo.value?.nickname || user.value?.nickname || ''
const getAvatar = () => userInfo.value?.avatar || user.value?.avatar || ''
const getPhoneMasked = () => userInfo.value?.mobileMasked || ''
const getWechatBound = () => userInfo.value?.wechatBound || false
const getWxOpenIdMasked = () => userInfo.value?.wxOpenIdMasked || ''
const getUserId = () => userInfo.value?.id || ''
const getCreateTime = () => {
  const t = userInfo.value?.createTime
  if (!t) return ''
  const d = new Date(t)
  if (isNaN(d.getTime())) return String(t)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const copyUserId = () => {
  const id = getUserId()
  if (id) {
    navigator.clipboard.writeText(String(id))
    ElMessage.success('用户 ID 已复制')
  }
}
</script>

<template>
  <div class="basic-info-view">
    <div class="page-header">
      <div class="header-text">
        <h2>基本信息</h2>
        <p>管理您的个人资料和账户信息</p>
      </div>
    </div>

    <div class="content-card">
      <div class="profile-layout">
        <!-- 左侧：头像区域 -->
        <div class="avatar-section">
          <div class="avatar-wrapper" @click="triggerUpload">
            <img v-if="getAvatar()" :src="getAvatar()" class="avatar-img" />
            <div v-else class="avatar-text">
              {{ (getNickname() || 'U').slice(-2).toUpperCase() }}
            </div>
            <div class="avatar-overlay">
              <i class="fas fa-camera"></i>
            </div>
            <div v-if="uploading" class="avatar-loading">
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/jpeg,image/png"
            style="display: none"
            @change="handleAvatarUpload"
          />
          <div class="avatar-tip" @click="triggerUpload">更换头像</div>
        </div>

        <!-- 右侧：信息字段 -->
        <div class="info-section">
          <!-- 昵称 -->
          <div class="info-row">
            <div class="info-label">昵称</div>
            <div class="info-value">
              <template v-if="editingNickname">
                <input
                  v-model="nicknameInput"
                  class="edit-input"
                  placeholder="请输入昵称"
                  maxlength="20"
                  @keyup.enter="saveNickname"
                />
                <button class="btn-confirm" :disabled="saving" @click="saveNickname">
                  {{ saving ? '保存中...' : '确认' }}
                </button>
                <button class="btn-cancel" @click="cancelEditNickname">取消</button>
              </template>
              <template v-else>
                <span class="value-text">{{ getNickname() || '—' }}</span>
                <button class="btn-edit" @click="startEditNickname">修改</button>
              </template>
            </div>
          </div>

          <!-- 手机号 -->
          <div class="info-row">
            <div class="info-label">手机号</div>
            <div class="info-value">
              <span class="value-text">{{ getPhoneMasked() || '—' }}</span>
              <span :class="['binding-tag', getPhoneMasked() ? 'bound' : 'unbound']">
                {{ getPhoneMasked() ? '已绑定' : '未绑定' }}
              </span>
            </div>
          </div>

          <!-- 微信 -->
          <div class="info-row">
            <div class="info-label">微信</div>
            <div class="info-value">
              <span class="value-text">{{ getWxOpenIdMasked() || '—' }}</span>
              <span :class="['binding-tag', getWechatBound() ? 'bound' : 'unbound']">
                {{ getWechatBound() ? '已绑定' : '未绑定' }}
              </span>
            </div>
          </div>

          <!-- 用户 ID -->
          <div class="info-row">
            <div class="info-label">用户 ID</div>
            <div class="info-value">
              <span class="value-text user-id-text">{{ getUserId() || '—' }}</span>
              <button class="btn-copy" @click="copyUserId" title="复制用户 ID">
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <!-- 创建时间 -->
          <div class="info-row">
            <div class="info-label">注册时间</div>
            <div class="info-value">
              <span class="value-text time-text">{{ getCreateTime() || '—' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basic-info-view {
  max-width: 700px;
}

.page-header {
  margin-bottom: 32px;
}

.header-text h2 {
  font-size: 1.8rem;
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 8px;
}

.header-text p {
  color: #64748b;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 32px;
}

.profile-layout {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* 左侧头像区域 */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 120px;
}

.avatar-wrapper {
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1, #a855f7);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.4rem;
  font-weight: 850;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.avatar-loading {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.avatar-tip {
  color: #4f46e5;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.avatar-tip:hover {
  text-decoration: underline;
}

/* 右侧信息区域 */
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-row {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  width: 80px;
  flex-shrink: 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #64748b;
}

.info-value {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.value-text {
  font-size: 0.95rem;
  color: #0f172a;
  font-weight: 600;
}

/* 绑定标签 */
.binding-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 12px;
}

.binding-tag.bound {
  background: #ecfdf5;
  color: #059669;
}

.binding-tag.unbound {
  background: #f1f5f9;
  color: #94a3b8;
}

/* 编辑按钮 */
.btn-edit {
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;
}

.btn-edit:hover {
  text-decoration: underline;
}

/* 编辑输入框 */
.edit-input {
  flex: 1;
  max-width: 240px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s;
}

.edit-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.btn-confirm {
  background: #0f172a;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background: white;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #f8fafc;
}

/* 复制按钮 */
.btn-copy {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  font-size: 0.85rem;
}

.btn-copy:hover {
  color: #4f46e5;
}

.user-id-text {
  font-family: monospace;
}

.time-text {
  color: #64748b;
  font-weight: 500;
}
</style>
