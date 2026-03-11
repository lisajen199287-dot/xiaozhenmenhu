<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import { Plus, Edit, Delete } from '@element-plus/icons-vue'



interface Application {

    id?: number

    appKey: string

    name: string

    nameEn: string

    description: string

    icon: string

    coverImage: string

    url: string

    entryType: 'iframe' | 'redirect' | 'vue'

    status: 'active' | 'inactive' | 'maintenance'

    isPublic: boolean

    requireLogin: boolean

    requirePayment: boolean

    freeQuota: number

    priceConfig: string

    ssoEnabled: boolean

    ssoConfig: string

    sortOrder: number
    category: string
    categoryIcon: string
    categoryDescription: string
    syncEnabled: boolean

    syncEndpoint: string

    syncSecret: string

    customDomain: string

}



const apps = ref<Application[]>([])

const loading = ref(false)

const dialogVisible = ref(false)

const isEdit = ref(false)

const form = ref<Application>({

    appKey: '',

    name: '',

    nameEn: '',

    description: '',

    icon: '',

    coverImage: '',

    url: '',

    entryType: 'iframe',

    status: 'active',

    isPublic: false,

    requireLogin: true,

    requirePayment: false,

    freeQuota: 0,

    priceConfig: '{}',
    ssoEnabled: true,
    ssoConfig: '{}',

    sortOrder: 0,
    category: '',
    categoryIcon: '',
    categoryDescription: '',
    syncEnabled: false,

    syncEndpoint: '',

    syncSecret: '',

    customDomain: ''

})



const fetchApps = async () => {

    loading.value = true

    try {

        const res = await fetch('/api/applications')

        if (res.ok) {

            apps.value = await res.json()

        }

    } catch (e) {

        ElMessage.error('获取应用列表失败')

    } finally {

        loading.value = false

    }

}



const handleAdd = () => {

    isEdit.value = false

    form.value = {

        appKey: '',

        name: '',

        nameEn: '',

        description: '',

        icon: '',

        coverImage: '',

        url: '',

        entryType: 'iframe',

        status: 'active',

        isPublic: false,

        requireLogin: true,

        requirePayment: false,

        freeQuota: 0,

        priceConfig: '{}',
        ssoEnabled: true,
        ssoConfig: '{}',

        sortOrder: 0,
        category: '',
        categoryIcon: '',
        categoryDescription: '',
        syncEnabled: false,

        syncEndpoint: '',

        syncSecret: '',

        customDomain: ''

    }

    dialogVisible.value = true

}



const handleEdit = (row: Application) => {

    isEdit.value = true

    form.value = { ...row }

    dialogVisible.value = true

}



const handleDelete = async () => {

    if (!form.value.appKey) return

    try {

        const result = await ElMessageBox.prompt('此操作将永久删除该应用及其所有配置，请确认', '安全验证', {

            confirmButtonText: '确认删除',

            cancelButtonText: '取消',

            inputType: 'password',

            inputPlaceholder: '请输入管理员密码以执行删除操作项',

            inputValidator: (val) => {

                if (!val) return '密码不能为空'

                // 为了演示，这里前端校??"admin"，实际应由后端校??

                if (val !== 'admin') return '密码错误，请联系系统管理员'

                return true

            }

        }) as any

        

        const password = result.value

        

        if (password === 'admin') {

            const res = await fetch(`/api/applications/${form.value.appKey}`, { method: 'DELETE' })

            if (res.ok) {

                ElMessage.success('应用已彻底移除')

                dialogVisible.value = false

                fetchApps()

            }

        }

    } catch (e) {

        // Cancelled

    }

}



const save = async () => {

    const method = isEdit.value ? 'PUT' : 'POST'

    const url = isEdit.value ? `/api/applications/${form.value.appKey}` : '/api/applications'

    

    try {

        const res = await fetch(url, {

            method,

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(form.value)

        })

        if (res.ok) {

            ElMessage.success('保存成功')

            dialogVisible.value = false

            fetchApps()

        }

    } catch (e) {

        ElMessage.error('保存失败')

    }

}



onMounted(() => {

    fetchApps()

})

</script>



<template>

  <div class="admin-apps">

    <div class="page-header">

      <div class="header-info">

        <h2>应用中心管理</h2>

        <p class="sub-title">定义、配置及管理平台开放的各类 AI 业务子系统</p>
      </div>
      <el-button type="primary" :icon="Plus" @click="handleAdd">创建开放应用</el-button>

    </div>



    <el-card shadow="never" class="table-card">

      <el-table :data="apps" v-loading="loading" border stripe>

        <el-table-column label="应用信息" min-width="220">

          <template #default="{ row }">

            <div class="app-info-cell">

              <div class="app-icon-box"><i :class="row.icon"></i></div>

              <div class="app-text">

                <div class="app-name">{{ row.name }} <span class="app-key">#{{ row.appKey }}</span></div>

                <div class="app-url">{{ row.customDomain || row.url }}</div>

              </div>

            </div>

          </template>

        </el-table-column>



        <el-table-column label="接入方式" width="120">

          <template #default="{ row }">

            <el-tag size="small" :type="row.entryType === 'iframe' ? '' : 'warning'">{{ row.entryType.toUpperCase() }}</el-tag>

          </template>

        </el-table-column>



        <el-table-column label="状态" width="100">

          <template #default="scope">

            <el-tag :type="scope.row.status === 'active' ? 'success' : 'warning'">

              {{ scope.row.status === 'active' ? '已上线' : '维护中' }}

            </el-tag>

          </template>

        </el-table-column>



        <el-table-column label="核心能力配置" width="240">

          <template #default="scope">

            <div class="config-tags">

              <el-tooltip content="SSO 统一身份认证" placement="top">

                <span class="capability-tag" :class="scope.row.ssoEnabled ? 'cap-active' : 'cap-off'">

                  <i class="fas fa-shield-alt"></i> SSO

                </span>

              </el-tooltip>

              <el-tooltip content="用户数据实时同步" placement="top">

                <span class="capability-tag" :class="scope.row.syncEnabled ? 'cap-active' : 'cap-off'">

                  <i class="fas fa-sync-alt"></i> SYNC

                </span>

              </el-tooltip>

              <el-tooltip content="独立域名跳转" placement="top">

                <span class="capability-tag" :class="scope.row.customDomain ? 'cap-domain' : 'cap-off'">

                  <i class="fas fa-link"></i> DOMAIN

                </span>

              </el-tooltip>

            </div>

          </template>

        </el-table-column>



        <el-table-column label="操作" width="100" fixed="right" align="center">

          <template #default="scope">

            <el-button size="small" :icon="Edit" @click="handleEdit(scope.row)">配置</el-button>

          </template>

        </el-table-column>

      </el-table>

    </el-card>



    <el-dialog v-model="dialogVisible" :title="isEdit ? '配置应用: ' + form.name : '注册新开放应用'" width="800px">

      <el-form :model="form" label-width="120px" label-position="top">

        <el-tabs type="border-card">

          <el-tab-pane label="基本定义">

            <el-row :gutter="20">

              <el-col :span="12">

                <el-form-item label="应用唯一标识 (AppKey)">

                  <el-input v-input-auto-focus v-model="form.appKey" :disabled="isEdit" placeholder="?? code-copilot" />

                </el-form-item>

              </el-col>

              <el-col :span="12">

                <el-form-item label="应用显示名称">
                  <el-input v-model="form.name" placeholder="应用中心显示的标题" />
                </el-form-item>

              </el-col>

            </el-row>

            <el-row :gutter="20">

              <el-col :span="12">

                <el-form-item label="FontAwesome 图标">

                  <el-input v-model="form.icon" placeholder="?? fas fa-robot" />

                </el-form-item>

              </el-col>

              <el-col :span="12">

                <el-form-item label="封面图片路径">

                  <el-input v-model="form.coverImage" placeholder="/images/apps/default.png" />

                </el-form-item>

              </el-col>

            </el-row>

            <el-form-item label="应用简介">
              <el-input v-model="form.description" type="textarea" :rows="3" placeholder="描述该应用的核心价值" />
            </el-form-item>

            <el-divider content-position="left">分类展示配置</el-divider>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属分类">
                  <el-input v-model="form.category" placeholder="如：内容与营销" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="分类图标 (FA)">
                  <el-input v-model="form.categoryIcon" placeholder="如：fas fa-bullhorn" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="分类描述">
              <el-input v-model="form.categoryDescription" type="textarea" :rows="2" placeholder="显示在分类标题下方的描述文字" />
            </el-form-item>

          </el-tab-pane>



          <el-tab-pane label="访问控制 & 域名">

            <el-row :gutter="20">

              <el-col :span="12">

                <el-form-item label="接入技术类型">
                  <el-select v-model="form.entryType" style="width: 100%">
                    <el-option label="Iframe 嵌入 (Portal 内部模式)" value="iframe" />
                    <el-option label="独立域名跳转 (SSO 模式)" value="redirect" />
                    <el-option label="本地 Vue 组件 (扩展模式)" value="vue" />
                  </el-select>
                </el-form-item>

              </el-col>

              <el-col :span="12">

                <el-form-item label="运行状态">
                  <el-radio-group v-model="form.status">
                    <el-radio label="active">运行中</el-radio>
                    <el-radio label="maintenance">停机维护</el-radio>
                  </el-radio-group>
                </el-form-item>

              </el-col>

            </el-row>

            <el-form-item label="默认访问地址 (Internal URL)">

              <el-input v-model="form.url" placeholder="http://internal-app:8080" />

            </el-form-item>

            <el-form-item label="外部访问域名 (Custom Domain / Subdomain)">

              <el-input v-model="form.customDomain" placeholder="https://app1.cii-ai.com 或独立域" >

                <template #prepend>DNS</template>

              </el-input>

              <p class="form-tip">配置后用户点击将跳转至该域名，而非 iframe 嵌入。</p>

            </el-form-item>

            <el-row :gutter="20">

               <el-col :span="8"><el-switch v-model="form.isPublic" active-text="公开展示" /></el-col>

               <el-col :span="8"><el-switch v-model="form.requireLogin" active-text="强制登录" /></el-col>

               <el-col :span="8"><el-switch v-model="form.requirePayment" active-text="需要付费" /></el-col>

            </el-row>

          </el-tab-pane>



          <el-tab-pane label="数据同步 & 身份">

            <div class="config-section">

              <h4>SSO 身份认证配置</h4>

              <el-switch v-model="form.ssoEnabled" active-text="开启 SSO 登录" style="margin-bottom: 15px;" />

              <el-form-item label="SSO 策略配置 (JSON)">

                <el-input v-model="form.ssoConfig" type="textarea" :rows="4" placeholder='{"clientId": "...", "clientSecret": "..."}' />

              </el-form-item>

            </div>



            <div class="config-section" style="margin-top: 20px; padding-top: 20px; border-top: 1px dashed #e2e8f0;">

              <h4>用户数据回传 (User Sync)</h4>

              <el-switch v-model="form.syncEnabled" active-text="开启实时账户同步" style="margin-bottom: 15px;" />

              <el-form-item label="同步端点 (Webhook URL)">

                <el-input v-model="form.syncEndpoint" placeholder="https://app-api.com/v1/sync-user" />

              </el-form-item>

              <el-form-item label="同步校验密钥 (Sync Secret)">

                <el-input v-model="form.syncSecret" placeholder="用于对同步请求进行签名校验的密钥" />

              </el-form-item>

              <p class="form-tip">开启后，平台用户资料变更、配额更新将自动通过 Webhook 同步至子系统。</p>

            </div>

          </el-tab-pane>



          <el-tab-pane label="配额 & 价格">

            <el-form-item label="免费额度 (Tokens/次数)">

              <el-input-number v-model="form.freeQuota" :min="0" />

            </el-form-item>

            <el-form-item label="定价方案配置 (JSON)">

              <el-input v-model="form.priceConfig" type="textarea" :rows="8" />

            </el-form-item>

          </el-tab-pane>

        </el-tabs>

      </el-form>

      <template #footer>

        <div class="dialog-footer">

          <div class="footer-left">

            <el-button v-if="isEdit" type="danger" plain :icon="Delete" @click="handleDelete">删除应用</el-button>

          </div>

          <div class="footer-right">

            <el-button @click="dialogVisible = false">取消</el-button>

            <el-button type="primary" @click="save">保存配置</el-button>

          </div>

        </div>

      </template>

    </el-dialog>

  </div>

</template>



<style scoped>

.admin-apps { padding: 0; }

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }

.sub-title { color: #64748b; font-size: 0.9rem; margin: 4px 0 0 0; }



.table-card { border-radius: 12px; }

.app-info-cell { display: flex; align-items: center; gap: 12px; }

.app-icon-box { width: 40px; height: 40px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #4f46e5; font-size: 1.25rem; }

.app-name { font-weight: 700; color: #1e293b; }

.app-key { font-weight: 400; color: #94a3b8; font-size: 0.8rem; margin-left: 4px; }

.app-url { font-size: 0.75rem; color: #64748b; font-family: monospace; }



.config-tags { display: flex; flex-direction: row; flex-wrap: nowrap; gap: 6px; align-items: center; }



.capability-tag {

  display: inline-flex;

  align-items: center;

  gap: 4px;

  padding: 2px 8px;

  border-radius: 4px;

  font-size: 11px;

  font-weight: 700;

  white-space: nowrap;

  cursor: default;

  border: 1px solid transparent;

}

.cap-active { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }

.cap-domain { background: #fffbeb; color: #b45309; border-color: #fde68a; }

.cap-off { background: #f8fafc; color: #94a3b8; border-color: #e2e8f0; }



.form-tip { font-size: 0.8rem; color: #94a3b8; margin-top: 4px; }

.config-section h4 { margin: 0 0 12px 0; color: #1e293b; font-size: 0.95rem; }



.dialog-footer { display: flex; justify-content: space-between; align-items: center; width: 100%; }

.footer-right { display: flex; gap: 12px; }

</style>