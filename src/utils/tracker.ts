/**

 * 仓山区AI公共服务平台 - 用户行为追踪 SDK

 */



const TRACKER_URL = '/api/track'

import * as newApi from "@/api/newApi/index";


export type TrackEvent =

    | 'page_view'         // 页面访问

    | 'click'             // 按钮点击

    | 'feature_use'       // 功能使用

    | 'search'            // 搜索行为

    | 'form_submit'       // 表单提交

    | 'conversion'        // 转化事件（注�?充值）



interface TrackPayload {

    event: TrackEvent

    page?: string

    element?: string

    feature?: string

    value?: number

    extra?: Record<string, any>

}



// 获取或初始化 访客ID (持久化在本地存储)

const getVisitorId = () => {

    let vid = localStorage.getItem('_cii_vid')

    if (!vid) {

        vid = 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2)

        localStorage.setItem('_cii_vid', vid)

    }

    return vid

}



// 获取或初始化 会话ID (存在会话存储，关闭浏览器失效)

const getSessionId = () => {

    let sid = sessionStorage.getItem('_cii_sid')

    if (!sid) {

        sid = 's_' + Date.now() + '_' + Math.random().toString(36).slice(2)

        sessionStorage.setItem('_cii_sid', sid)

    }

    return sid

}



export const track = (data: TrackPayload) => {

    const searchParams = new URLSearchParams(window.location.search)



    const payload = {

        ...data,

        sessionId: getSessionId(),

        visitorId: getVisitorId(),

        userId: localStorage.getItem('user_id') || null, // 假设存在用户ID

        appId: 'main',

        page: data.page || window.location.pathname,

        ts: Date.now(),

        // 来源追踪
        utmSource: searchParams.get('utm_source') || sessionStorage.getItem('utm_source'),
        utmMedium: searchParams.get('utm_medium') || sessionStorage.getItem('utm_medium'),
        utmCampaign: searchParams.get('utm_campaign') || sessionStorage.getItem('utm_campaign')
    }

    // 更新 SessionStorage 缓存，确保后续无参数跳转也能追踪
    if (searchParams.get('utm_source')) {
        sessionStorage.setItem('utm_source', searchParams.get('utm_source')!)
        if (searchParams.get('utm_medium')) sessionStorage.setItem('utm_medium', searchParams.get('utm_medium')!)
        if (searchParams.get('utm_campaign')) sessionStorage.setItem('utm_campaign', searchParams.get('utm_campaign')!)
    }



    // 发送事件到后端, 触发事件
    newApi.apiTrack(JSON.stringify(payload))
}



// 自动监听点击事件 (带有 data-track 属性的元素)

if (typeof window !== 'undefined') {

    window.addEventListener('click', (e) => {

        const target = e.target as HTMLElement

        const trackTarget = target.closest('[data-track]')

        if (trackTarget) {

            const element = trackTarget.getAttribute('data-track') || trackTarget.id || trackTarget.tagName

            track({ event: 'click', element })

        }

    }, true)

}
