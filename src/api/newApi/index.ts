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