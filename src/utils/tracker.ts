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

// 设备类型检测
const getDeviceType = (): string => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
};


export const track = (data: TrackPayload) => {

    const searchParams = new URLSearchParams(window.location.search)



    const payload = {

        ...data,

        sessionId: getSessionId(),

        visitorId: getVisitorId(),

        device: getDeviceType(),

        referrer: document.referrer || '',   // ← 加这一行

        userId: localStorage.getItem('user_id') || null, // 假设存在用户ID

        appId: 'main',

        page: data.page || window.location.pathname,

        ts: Date.now(),

        // 扩展的 UTM 参数收集
        utmSource: searchParams.get('utm_source') || sessionStorage.getItem('utm_source'),
        utmMedium: searchParams.get('utm_medium') || sessionStorage.getItem('utm_medium'),
        utmCampaign: searchParams.get('utm_campaign') || sessionStorage.getItem('utm_campaign'),
        utmContent: searchParams.get('utm_content') || sessionStorage.getItem('utm_content'),
        utmTerm: searchParams.get('utm_term') || sessionStorage.getItem('utm_term'),
        utmDevice: searchParams.get('utm_device') || sessionStorage.getItem('utm_device'),
        utmPlatform: searchParams.get('utm_platform') || sessionStorage.getItem('utm_platform'),
        utmKeywordId: searchParams.get('utm_keyword_id') || sessionStorage.getItem('utm_keyword_id'),
        utmMatchtype: searchParams.get('utm_matchtype') || sessionStorage.getItem('utm_matchtype'),
        utmLanding: searchParams.get('utm_landing') || sessionStorage.getItem('utm_landing'),
        bdVid: searchParams.get('bd_vid') || sessionStorage.getItem('bd_vid')
    }

    // 更新 SessionStorage 缓存（所有 UTM 参数）
    try {
        const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
            'utm_term', 'utm_device', 'utm_platform', 'utm_keyword_id',
            'utm_matchtype', 'utm_landing', 'bd_vid'
        ]
        for (const param of keys) {
            const val = searchParams.get(param)
            if (val) {
                sessionStorage.setItem(param, val)
            }
        }
    } catch (e) {
        // track() 内部保存失败不阻塞主流程
        console.warn('[tracker] sessionStorage UTM save failed:', e)
    }

    // 发送事件到后端
    // newApi.apiTrack(JSON.stringify(payload));
    newApi.apiTrack(payload);
}



// ========== 首次访问数据捕获（用于注册时绑定来源）==========
const FIRST_URL_KEY = '_cii_first_url'
const FIRST_REF_KEY = '_cii_first_ref'
const FIRST_TS_KEY = '_cii_first_ts'

if (typeof window !== 'undefined') {
    if (!sessionStorage.getItem(FIRST_URL_KEY)) {
        sessionStorage.setItem(FIRST_URL_KEY, window.location.href)
        sessionStorage.setItem(FIRST_REF_KEY, document.referrer || '')
        sessionStorage.setItem(FIRST_TS_KEY, Date.now().toString())
    }
}

/**
 * 获取首次访问数据，供注册时携带给后端
 * 优先从 sessionStorage 读取（首次访问时缓存），兜底从当前 URL 解析
 */
export const getFirstTouchData = () => {
    const currentSearchParams = new URLSearchParams(window.location.search)

    // 辅助：优先 sessionStorage，兜底 URL 当前参数
    const readUtm = (key: string) =>
        sessionStorage.getItem(key) || currentSearchParams.get(key) || ''

    const referrer = sessionStorage.getItem(FIRST_REF_KEY) || ''
    let searchKeyword = ''
    if (referrer) {
        try {
            const url = new URL(referrer)
            if (url.hostname.includes('baidu.com')) {
                searchKeyword = url.searchParams.get('wd') || url.searchParams.get('word') || ''
            } else if (url.hostname.includes('google.com') || url.hostname.includes('bing.com')) {
                searchKeyword = url.searchParams.get('q') || ''
            } else if (url.hostname.includes('sogou.com')) {
                searchKeyword = url.searchParams.get('query') || ''
            } else if (url.hostname.includes('so.com')) {
                searchKeyword = url.searchParams.get('q') || ''
            }
        } catch { /* ignore */ }
    }

    return {
        visitorId: getVisitorId(),
        sessionId: getSessionId(),
        firstLandingUrl: sessionStorage.getItem(FIRST_URL_KEY) || window.location.href,
        firstLandingPath: (() => {
            const href = sessionStorage.getItem(FIRST_URL_KEY) || window.location.href
            try { return new URL(href).pathname } catch { return '' }
        })(),
        firstDocumentReferrer: referrer,
        firstVisitTime: sessionStorage.getItem(FIRST_TS_KEY) || Date.now().toString(),
        firstSearchKeyword: searchKeyword,
        // UTM 参数：优先 sessionStorage 缓存，兜底从当前 URL 读取
        firstUtmSource: readUtm('utm_source'),
        firstUtmMedium: readUtm('utm_medium'),
        firstUtmCampaign: readUtm('utm_campaign'),
        firstUtmContent: readUtm('utm_content'),
        firstUtmTerm: readUtm('utm_term'),
        firstUtmDevice: readUtm('utm_device'),
        firstUtmPlatform: readUtm('utm_platform'),
        firstUtmKeywordId: readUtm('utm_keyword_id'),
        firstUtmMatchtype: readUtm('utm_matchtype'),
        firstUtmLanding: readUtm('utm_landing'),
        firstBdVid: readUtm('bd_vid'),
    }
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
