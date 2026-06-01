import request from '@/config/axios'

export const apiArticles = () => {
  return request.get({
    url: '/api/articles',
  })
}

export const apiCreditBalance = (userId: number) => {
  return request.get({
    url: `/api/billing/credit-balance?userId=${userId}`,
  })
}

// 退出登录
export const apiLogout = () => {
  return request.post({
    url: `/member/auth/logout`,
  })
}

export const apiSlides = () => {
  return request.get({
    url: '/api/slides/active',
  })
}


export const apiAdmLogin = (data: any) => {
  return request.post({
    url: '/api/auth/login',
    data,
  })
}


export const apiAdmSolutionRequests = (data: any) => {
  return request.post({
    url: '/api/solution-requests',
    data,
  })
}

export const apiAdmCases = () => {
  return request.get({
    url: '/api/cases',
  })
}

export const apiAdmCaseDetail = (id: number) => {
  return request.get({
    url: `/api/cases/${id}`,
  })
}

export const apiAdmActiveArticles = () => {
  return request.get({
    url: `/api/articles/active`,
  })
}
export const apiAdmArticleDetail = (id: number) => {
  return request.get({
    url: `/api/articles/${id}`,
  })
}

export const apiAdmActiveEvents = () => {
  return request.get({
    url: `/api/events`,
  })
}

export const apiAdmEventDetail = (id: number) => {
  return request.get({
    url: `/api/events/${id}`,
  })
}


export const apiAdmEventRegisterDetail = (data: any, id: any) => {
  return request.get({
    url: `/api/event-registrations/${id}/register`,
    method: 'POST',
    data,
  })
}

export const apiApplications = () => {
  return request.get({
    url: `/api/applications`,
  })
}

export const apiAppPermissions = (uid: number) => {
  return request.get({
    url: `/api/app-permissions/user/${uid}`,
  })
}

export const apiOrders = (uid: number) => {
  return request.get({
    url: `/api/orders/user/${uid}`,
  })
}

// 传递用户行为
export const apiTrack = (data: any) => {
  return request.post({
    url: `/api/track`,
    data,
  })
}

export const apiPublicApplications = () => {
  return request.get({
    url: `/api/applications/public`,
  })
}


export const apiUserLogs = (uid: number) => {
  return request.get({
    url: `/api/console/users/${uid}/logs`,
  })
}

export const apiPlatformIntroduction = () => {
  return request.get({
    url: `/api/platform-introduction/1`,
  })
}


export const apiGoLumi = () => {
  return request.get({
    url: `/api/applumi/redirectToLumi`,
  })
}

// ==================== API Key 管理 ====================

// 获取 API Key 列表
export const apiGetApiKeys = () => {
  return request.get({
    url: `/api/apikey/keys`,
  })
}

// 创建 API Key
export const apiCreateApiKey = (data: { name: string }) => {
  return request.post({
    url: `/api/apikey/keys`,
    data,
  })
}

// 更新 API Key
export const apiUpdateApiKey = (id: number, data: { name: string }) => {
  return request.put({
    url: `/api/apikey/keys`,
    data: { id, ...data },
  })
}

// 删除 API Key
export const apiDeleteApiKey = (id: number) => {
  return request.delete({
    url: `/api/apikey/keys/${id}`,
  })
}

// 启用/禁用 API Key
export const apiToggleApiKeyStatus = (id: number, status: number) => {
  return request.put({
    url: `/api/apikey/keys/${id}/status`,
    data: { status },
  })
}

// 获取调用日志
export const apiGetApiCallLogs = (params: { page: number; size: number; model?: string; status?: string }) => {
  return request.get({
    url: `/api/apikey/logs`,
    params,
  })
}

// 获取使用量统计
export const apiGetApiUsage = (days: number = 7) => {
  return request.get({
    url: `/api/apikey/usage`,
    params: { days },
  })
}

// 获取完整密钥（点击眼睛图标时调用）
export const apiGetFullKey = (id: number) => {
  return request.get({
    url: `/api/apikey/keys/${id}/full`,
  })
}

// 获取用量趋势统计（支持按天/小时，可选 model / API Key 筛选）
export const apiGetUsageStats = (params: { interval: string; startDate?: string; endDate?: string; days?: number; apiKeyId?: number; model?: string }) => {
  return request.get({
    url: `/api/apikey/stats/usage`,
    params,
  })
}

// 获取可用模型列表
export const apiGetModels = () => {
  return request.get({
    url: `/api/apikey/models`,
  })
}

export const redirectToLumi = () => {
  return request.get({
    url: `/api/applumi/redirectToLumi`,
  })
}

export const apiLumiPage = (data: any) => {
  return request.get({
    url: `/api/applumi/lumi-page`,
    params: data,
  })
}


//获取协议接口
export const apiAgAgreement = () => {
  return request.get({
    url: `/member/agreement/get-agreed`,
  })
}

//确认用户是否有协议
export const apiAgAgreementHasAgreed = () => {
  return request.get({
    url: `/member/agreement/has-agreed`,
  })
}

// 协议和用户关联接口
export const apiAgAgreementSave = (data: any) => {
  return request.post({
    url: `/member/agreement/save`,
    data: data,
  })
}

// 获得用户积分记录分页
export const apiAgPointRecordAllPage = (data: any) => {
  return request.get({
    url: `/member/point/record/page`,
    params: data,
  })
}

// 获得基本信息
export const apiAgUserGet = () => {
  return request.get({
    url: `/member/user/get`,
  })
}

// 修改用户基本信息（昵称、头像等）
export const apiUpdateProfile = (data: any) => {
  return request.put({
    url: `/member/user/update`,
    data,
  })
}

// 上传文件（头像等）
export const apiUploadFile = (data: FormData) => {
  return request.upload({
    url: `/infra/file/upload`,
    data,
  })
}


// 门户服务端获取aippt的accessCode返回给门户前端
export const apiPortalAiPptAccessCode = () => {
  return request.post({
    url: `/portal/ai-ppt/access-code`,
  })
}


// 用户授权龙虾
export const apiAuth2AuthorizeCode = (data: any) => {
  return request.post({
    url: `/app/oauth2/authorize-code`,
    data,
  })
}

export const apiAuth2Authorize = (data: any) => {
  return request.get({
    url: `/app/oauth2/authorize`,
    params: data,
  })
}

// 检查用户是否有龙虾授权
export const apiCheckAuth2AuthorizeCode = () => {
  return request.get({
    url: `/api/claw/has-oauth-approve`,
  })
}

// 检查当前用户是否已激活
export const apiCheckActivation = () => {
  return request.get({
    url: `/api/claw/check-activation`,
  })
}


// 获取默认激活信息（用于实例访问展示）
export const clawDefault = () => {
  return request.get({
    url: `/api/claw/default`,
  })
}

// 保存仓龙Claw服务
export const clawActivate = (data: any) => {
  return request.post({
    url: `/api/claw/activate`,
    data,
  })
}

export const getDictDataByType = (data: any) => {
  return request.get({
    url: `/system/dict-data/type`,
    params: data,
  })
}


export const apiVerifyWriteOff = (data: any) => {
  return request.post({
    url: `/api/verify/write-off`,
    data,
  })
}

export const apiVerifyWriteOffWithNatural = (data: any) => {
  return request.post({
    url: `/api/verify/write-off?channel=natural`,
    data,
  })
}

export const apiWriteOffWithNaturalUser = (data: any) => {
  return request.post({
    url: `/api/verify/write-off?channel=naturalUser`,
    data,
  })
}


export const apiWriteOffhasComputPower = () => {
  return request.get({
    url: `/api/verify/has-comput-power`,
  })
}