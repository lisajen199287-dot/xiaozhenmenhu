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