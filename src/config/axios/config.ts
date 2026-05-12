const config: {
  base_url: string
  result_code: number | string
  default_headers: string
  request_timeout: number,
  aiVideoUrl: string,
  trueLoginUrl: string,
  gateway_domain: string,
} = {
  /**
   * api请求基础路径
   */
  base_url: 'http://192.168.12.100:48080/app-api',
  // base_url: '/app-api',

  // aiVideoUrl: 'https://www.cii-group.com/aivideo/',
  aiVideoUrl: 'http://portalgray.cii-group.com:49861/aivideo/',

  // 真人口播登录地址
  // trueLoginUrl: 'https://www.cii-group.com/digitalHuman/login',
  trueLoginUrl: 'http://portalgray.cii-group.com:49861/digitalHuman/login',

  /**
   * API 文档网关域名（用于文档中的接口地址展示）
   */
  gateway_domain: 'https://www.cii-group.com/app-api',
  // gateway_domain: 'https://api.your-domain.com',

  /**
   * 接口成功返回状态码
   */
  result_code: 200,

  /**
   * 接口请求超时时间
   */
  request_timeout: 30000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json'
}

export { config }
