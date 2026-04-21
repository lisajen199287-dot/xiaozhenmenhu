import request from '@/config/axios'
import type { RegisterVO, UserLoginVO } from './types'

export interface SmsCodeVO {
  mobile: string
  scene: number
}

export interface SmsLoginVO {
  mobile: string
  code: string
}

// 登录
export const login = (data: any) => {
  return request.post({
    url: '/system/auth/login',
    data,
    headers: {
      isEncrypt: false,
      isAPP: true
    }
  })
}

export const nav = () => {
  return request.get({
    url: '/api/articles/nav',
  })
}

// 获取wx二维码
export const wxCode = () => {
  return request.get({
    url: '/api/auth/qrcode/generate',
    headers: {
      isEncrypt: false,
      isAPP: true
    }
  })
}

// 获取wx二维码状态
export const wxCodeStatus = (data: any) => {
  return request.get({
    url: `/api/auth/qrcode/status?token=${data.token}`,
    headers: {
      isEncrypt: false,
      isAPP: true
    }
  })
}

// 获取短信二维码
export const captcha = (data: any) => {
  return request.post({
    url: `/api/auth/qrcode/generate-captcha`,
    data,
    headers: {
      isEncrypt: false,
      isAPP: true
    }
  })
}


// 手机号登录
export const validateCaptcha = (data: any) => {
  return request.post({
    url: `/api/auth/qrcode/validate-captcha`,
    data,
    headers: {
      isEncrypt: false,
      isAPP: true
    }
  })
}

// token置换token, 获取用户信息
export const getFrontUserInfo = async () => {
    return request.get({
        url: `/member/user/getFrontUserInfo`,
    })
}

// 获取完善注册信息
export const updateName = (data: any) => {
  return request.put({
    url: `/system/user/profile/update-company-name`,
    data,
  })
}

// 注册
export const register = (data: RegisterVO) => {
  return request.post({ url: '/system/auth/register', data })
}

// 使用租户名，获得租户编号
export const getTenantIdByName = (name: string) => {
  return request.get({ url: '/system/tenant/get-id-by-name?name=' + name })
}

// 使用租户域名，获得租户信息
export const getTenantByWebsite = (website: string) => {
  return request.get({ url: '/system/tenant/get-by-website?website=' + website })
}

// 登出
export const loginOut = () => {
  return request.post({ url: '/system/auth/logout' })
}

// 获取用户权限信息
export const getInfo = () => {
  return request.get({ url: '/system/auth/get-permission-info' })
}

//获取登录验证码
export const sendSmsCode = (data: SmsCodeVO) => {
  return request.post({ url: '/system/auth/send-sms-code', data })
}

// 短信验证码登录
export const smsLogin = (data: SmsLoginVO) => {
  return request.post({ url: '/system/auth/sms-login', data })
}

// 社交快捷登录，使用 code 授权码
export function socialLogin(type: string, code: string, state: string) {
  return request.post({
    url: '/system/auth/social-login',
    data: {
      type,
      code,
      state
    }
  })
}

// 社交授权的跳转
export const socialAuthRedirect = (type: number, redirectUri: string) => {
  return request.get({
    url: '/system/auth/social-auth-redirect?type=' + type + '&redirectUri=' + redirectUri
  })
}
// 获取验证图片以及 token
export const getCode = (data: any) => {
  return request.postOriginal({ url: 'system/captcha/get', data })
}

// 滑动或者点选验证
export const reqCheck = (data: any) => {
  return request.postOriginal({ url: 'system/captcha/check', data })
}

// 通过短信重置密码
export const smsResetPassword = (data: any) => {
  return request.post({ url: '/system/auth/reset-password', data })
}
