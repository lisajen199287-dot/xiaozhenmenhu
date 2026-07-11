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
const showCertificationForm = ref(false)
const certSubmitting = ref(false)
const certForm = ref({
  companyName: '福州某某科技有限公司',
  creditCode: '91350104MA8CSIT2026',
  companyType: '数字服务企业',
  parkName: '仓山区互联网小镇',
  legalPerson: '林某某',
  contactPhone: '138****2026',
  licenseFile: '营业执照扫描件.pdf'
})

const certificationInfo = ref({
  applyNo: 'CERT-20260618-0018',
  companyName: '福州某某科技有限公司',
  creditCode: '91350104MA8CSIT2026',
  companyType: '数字服务企业',
  parkName: '仓山区互联网小镇',
  legalPerson: '林某某',
  contactPhone: '138****2026',
  licenseFile: '营业执照扫描件.pdf',
  legalFile: '法人身份证明.pdf',
  submitTime: '2026-06-18 10:24:36',
  status: '认证完成'
})

const auditLogs = ref([
  { time: '2026-06-18 10:24', title: '提交资料', desc: '企业基础信息与资质附件已提交' },
  { time: '2026-06-18 10:28', title: '自动校验', desc: '统一社会信用代码与营业执照格式校验通过' },
  { time: '2026-06-19 09:30', title: '人工复核', desc: '运营专员正在核验企业真实性与园区入驻身份' }
])

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

const startNewCertification = () => {
  showCertificationForm.value = true
}

const cancelCertification = () => {
  showCertificationForm.value = false
}

const submitCertification = () => {
  const required = [
    certForm.value.companyName,
    certForm.value.creditCode,
    certForm.value.companyType,
    certForm.value.parkName,
    certForm.value.legalPerson,
    certForm.value.contactPhone
  ]
  if (required.some(item => !String(item).trim())) {
    ElMessage.warning('请完整填写企业认证信息')
    return
  }

  certSubmitting.value = true
  window.setTimeout(() => {
    certificationInfo.value = {
      applyNo: `CERT-${Date.now().toString().slice(-10)}`,
      companyName: certForm.value.companyName,
      creditCode: certForm.value.creditCode,
      companyType: certForm.value.companyType,
      parkName: certForm.value.parkName,
      legalPerson: certForm.value.legalPerson,
      contactPhone: certForm.value.contactPhone,
      licenseFile: certForm.value.licenseFile || '营业执照扫描件.pdf',
      legalFile: '法人身份证明.pdf',
      submitTime: '2026-07-10 15:30:00',
      status: '已提交，等待自动校验'
    }
    auditLogs.value.unshift({
      time: '2026-07-10 15:30',
      title: '发起新的认证审核',
      desc: `${certForm.value.companyName} 的认证申请已提交，等待系统自动校验`
    })
    certSubmitting.value = false
    showCertificationForm.value = false
    ElMessage.success('新的企业认证审核已发起')
  }, 500)
}
</script>

<template>
  <div class="basic-info-view">
    <div class="page-header">
      <div class="header-text">
        <h2>用户中心</h2>
        <p>管理用户资料、认证企业与企业审核信息</p>
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

    <div class="content-card enterprise-card">
      <div class="enterprise-title">
        <div>
          <span class="enterprise-icon">企</span>
          <div class="enterprise-heading">
            <h3>福州某某科技有限公司</h3>
            <p>已认证企业</p>
          </div>
        </div>
        <span class="review-tag review-tag-success">认证完成</span>
      </div>
      <div class="enterprise-grid">
        <div><span>统一社会信用代码</span><strong>91350104MA8CSIT2026</strong></div>
        <div><span>企业类型</span><strong>数字服务企业</strong></div>
        <div><span>所属园区</span><strong>仓山区互联网小镇</strong></div>
        <div><span>认证时间</span><strong>2026-06-18</strong></div>
      </div>
    </div>

    <div class="content-card verify-card">
      <div class="enterprise-title">
        <div><i class="fas fa-shield-check"></i><div><h3>企业认证与审核</h3><p>查看已提交认证信息，或发起新的企业认证审核流程</p></div></div>
        <span class="review-tag">审核进度 75%</span>
      </div>
      <div class="verify-progress"><span></span></div>
      <div class="verify-steps">
        <div class="done"><i class="fas fa-check"></i><span>提交资料</span></div>
        <div class="done"><i class="fas fa-check"></i><span>自动校验</span></div>
        <div class="active"><i class="fas fa-user-check"></i><span>人工复核</span></div>
        <div><i class="fas fa-award"></i><span>认证完成</span></div>
      </div>

      <div class="cert-section">
        <div class="cert-section-title">
          <h4>已提交认证信息</h4>
          <span>{{ certificationInfo.status }}</span>
        </div>
        <div class="cert-info-grid">
          <div><span>认证申请编号</span><strong>{{ certificationInfo.applyNo }}</strong></div>
          <div><span>企业名称</span><strong>{{ certificationInfo.companyName }}</strong></div>
          <div><span>统一社会信用代码</span><strong>{{ certificationInfo.creditCode }}</strong></div>
          <div><span>企业类型</span><strong>{{ certificationInfo.companyType }}</strong></div>
          <div><span>所属园区</span><strong>{{ certificationInfo.parkName }}</strong></div>
          <div><span>法定代表人</span><strong>{{ certificationInfo.legalPerson }}</strong></div>
          <div><span>联系电话</span><strong>{{ certificationInfo.contactPhone }}</strong></div>
          <div><span>提交时间</span><strong>{{ certificationInfo.submitTime }}</strong></div>
        </div>
        <div class="cert-files">
          <span><i class="fas fa-file-pdf"></i>{{ certificationInfo.licenseFile }}</span>
          <span><i class="fas fa-id-card"></i>{{ certificationInfo.legalFile }}</span>
        </div>
      </div>

      <div class="cert-section">
        <div class="cert-section-title">
          <h4>审核记录</h4>
          <span>实时跟踪</span>
        </div>
        <div class="audit-timeline">
          <div v-for="log in auditLogs" :key="`${log.time}-${log.title}`" class="audit-item">
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>{{ log.title }}</strong>
              <p>{{ log.desc }}</p>
            </div>
            <time>{{ log.time }}</time>
          </div>
        </div>
      </div>

    </div>

    <div class="content-card new-cert-card">
      <div class="enterprise-title">
        <div>
          <i class="fas fa-file-signature"></i>
          <div>
            <h3>新的企业认证审核</h3>
            <p>发起新的企业认证申请，支持认证多个企业主体</p>
          </div>
        </div>
    </div>

    <div v-if="!showCertificationForm" class="new-cert-empty">
      <div>
        <strong>暂无正在填写的新认证申请</strong>
        <p>点击下方“立即发起”，填写企业基础信息和资质附件后提交审核。</p>
      </div>
        <button @click="startNewCertification">立即发起</button>
      </div>

      <div v-else class="cert-form-panel">
        <div class="cert-section-title">
          <h4>填写企业认证信息</h4>
          <span>前端模拟提交</span>
        </div>
        <div class="cert-form-grid">
          <label><span>企业名称</span><input v-model="certForm.companyName" /></label>
          <label><span>统一社会信用代码</span><input v-model="certForm.creditCode" /></label>
          <label><span>企业类型</span><input v-model="certForm.companyType" /></label>
          <label><span>所属园区</span><input v-model="certForm.parkName" /></label>
          <label><span>法定代表人</span><input v-model="certForm.legalPerson" /></label>
          <label><span>联系电话</span><input v-model="certForm.contactPhone" /></label>
          <label class="full"><span>资质附件</span><input v-model="certForm.licenseFile" placeholder="例如：营业执照扫描件.pdf" /></label>
        </div>
        <div class="cert-form-actions">
          <button class="btn-cancel-form" @click="cancelCertification">取消</button>
          <button class="btn-submit-form" :disabled="certSubmitting" @click="submitCertification">
            {{ certSubmitting ? '提交中...' : '提交审核' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basic-info-view {
  max-width: 1100px;
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

.enterprise-card,.verify-card,.new-cert-card{margin-top:24px}.enterprise-title,.enterprise-title>div{display:flex;align-items:center;justify-content:space-between;gap:14px}.enterprise-title h3{margin:0 0 5px;color:#0f172a}.enterprise-title p{margin:0;color:#64748b}.enterprise-heading h3{font-size:22px;font-weight:850;line-height:1.25}.enterprise-heading p{font-size:13px;color:#94a3b8;font-weight:700}.enterprise-icon{display:grid;place-items:center;width:48px;height:48px;border-radius:10px;background:linear-gradient(135deg,#4f46e5,#3b82f6);color:#fff;font-weight:850}.review-tag{padding:6px 11px;border-radius:18px;background:#fff7ed;color:#c2410c;font-size:12px;font-weight:700}.review-tag-success{background:#ecfdf5;color:#047857}.enterprise-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:24px}.enterprise-grid>div{padding:16px;border-radius:8px;background:#f8fafc}.enterprise-grid span,.enterprise-grid strong{display:block}.enterprise-grid span{margin-bottom:8px;color:#94a3b8;font-size:12px}.enterprise-grid strong{color:#334155;font-size:14px}.verify-card{background:linear-gradient(180deg,#f8fbff,#fff);border-color:#bfdbfe}.verify-card .enterprise-title>div>i,.new-cert-card .enterprise-title>div>i{color:#4f46e5;font-size:32px}.btn-primary-soft{border:1px solid #bfdbfe;background:#eff6ff;color:#2563eb;border-radius:18px;padding:7px 12px;font-size:12px;font-weight:800;cursor:pointer}.btn-primary-soft:hover{background:#dbeafe}.verify-progress{height:7px;margin:28px 0 20px;border-radius:5px;background:#e2e8f0;overflow:hidden}.verify-progress span{display:block;width:75%;height:100%;background:linear-gradient(90deg,#4f46e5,#3b82f6)}.verify-steps{display:grid;grid-template-columns:repeat(4,1fr);padding-bottom:22px;border-bottom:1px solid #e2e8f0}.verify-steps div{display:flex;align-items:center;gap:8px;color:#94a3b8;font-size:13px}.verify-steps .done,.verify-steps .active{color:#4f46e5}.cert-section{margin-top:22px;padding:20px;border:1px solid #e2e8f0;border-radius:12px;background:#fff}.cert-section-title{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.cert-section-title h4{margin:0;color:#0f172a;font-size:16px}.cert-section-title span{padding:4px 10px;border-radius:999px;background:#f1f5f9;color:#64748b;font-size:12px;font-weight:800}.cert-info-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.cert-info-grid>div{min-height:76px;padding:14px;border-radius:10px;background:#f8fafc}.cert-info-grid span,.cert-info-grid strong{display:block}.cert-info-grid span{margin-bottom:8px;color:#94a3b8;font-size:12px}.cert-info-grid strong{color:#334155;font-size:13px;line-height:1.45;word-break:break-all}.cert-files{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.cert-files span{display:inline-flex;align-items:center;gap:8px;padding:9px 12px;border-radius:10px;background:#eff6ff;color:#2563eb;font-size:13px;font-weight:800}.audit-timeline{display:grid;gap:12px}.audit-item{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:start;padding:14px;border-radius:10px;background:#f8fafc}.audit-item>i{color:#4f46e5;margin-top:2px}.audit-item strong{display:block;color:#0f172a;margin-bottom:5px}.audit-item p{margin:0;color:#64748b;font-size:13px;line-height:1.5}.audit-item time{color:#94a3b8;font-size:12px;white-space:nowrap}.new-cert-card{border-style:dashed}.new-cert-empty{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:22px;padding:22px;border-radius:12px;background:#f8fafc}.new-cert-empty strong{display:block;margin-bottom:6px;color:#0f172a}.new-cert-empty p{margin:0;color:#64748b;font-size:13px}.new-cert-empty button{border:0;border-radius:10px;background:linear-gradient(135deg,#4f46e5,#3b82f6);color:#fff;padding:10px 18px;font-weight:800;cursor:pointer;white-space:nowrap}.cert-form-panel{margin-top:22px;padding:20px;border:1px solid #bfdbfe;border-radius:12px;background:linear-gradient(180deg,#eff6ff,#fff)}.cert-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.cert-form-grid label{display:grid;gap:7px}.cert-form-grid label.full{grid-column:1/-1}.cert-form-grid span{color:#64748b;font-size:13px;font-weight:800}.cert-form-grid input{height:40px;border:1px solid #dbeafe;border-radius:8px;padding:0 12px;color:#0f172a;outline:none;background:#fff}.cert-form-grid input:focus{border-color:#4f46e5;box-shadow:0 0 0 3px rgba(79,70,229,.1)}.cert-form-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:16px}.btn-cancel-form,.btn-submit-form{height:38px;border-radius:8px;padding:0 18px;font-weight:800;cursor:pointer}.btn-cancel-form{border:1px solid #e2e8f0;background:#fff;color:#475569}.btn-submit-form{border:0;background:linear-gradient(135deg,#4f46e5,#3b82f6);color:#fff}.btn-submit-form:disabled{opacity:.65;cursor:not-allowed}@media(max-width:900px){.cert-info-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:760px){.enterprise-grid{grid-template-columns:1fr 1fr}.verify-steps{grid-template-columns:1fr 1fr;gap:14px}.audit-item{grid-template-columns:auto 1fr}.audit-item time{grid-column:2}.cert-form-grid{grid-template-columns:1fr}.new-cert-empty{align-items:flex-start;flex-direction:column}}@media(max-width:480px){.enterprise-grid,.cert-info-grid{grid-template-columns:1fr}.enterprise-title{align-items:flex-start;flex-direction:column}}

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
