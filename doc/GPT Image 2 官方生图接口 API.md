`POST {{GATEWAY_DOMAIN}}/3rd/v1/images/generations`

本文介绍 doubao-image-2-flatfee、doubao-image-2-flatfee-2k、doubao-image-2-flatfee-4k生图接口 API 的输入输出参数，供您使用接口时查阅字段含义。通过传入文本提示词，模型将生成对应的图片。

**鉴权方式**

本接口通过 `Authorization` 请求头进行 API Key 鉴权，格式为 `Bearer <API Key>`。请在平台获取有效的 API Key 后发起调用。

---

## 请求参数

### 请求头

---

**Authorization** `string` **必填**
API Key 鉴权凭证，格式为 `Bearer <your-api-key>`。

---

### 请求体

---

**prompt** `string` %%require%%
所需图像的文本描述（提示词）。最大长度为 5000 个字符。

---

**model** `string` %%require%%
调用的模型名称。如 `doubao-image-2-flatfee`。

---

**size** `string` `可选`
生成图片的尺寸，如 `1024x1024`。

---

**n** `integer` `可选`
要生成的图像数量。必须介于 1 和 10 之间。

---

**quality** `string` `可选`
生成图片的质量。枚举值：

* `auto`：自动选择
* `high`：高质量
* `medium`：中等质量
* `low`：低质量

---

**style** `string` `可选`
生成图片的风格。枚举值：

* `vivid`：生动风格
* `natural`：自然风格

---

**response_format** `string` `可选`
返回生成图像的格式。枚举值：

* `url`：返回图片下载链接
* `b64_json`：以 Base64 编码字符串的 JSON 格式返回图像数据

---

### 请求体示例

```json
{
  "model": "doubao-image-2-flatfee",
  "prompt": "画一幅清明上河图",
  "n": 1,
  "size": "1024x1024",
  "quality": "high",
  "style": "vivid",
  "response_format": "url"
}
```

---

## 响应参数

**created** `integer`
请求创建时间的 Unix 时间戳。

---

**data** `array`
生成的图片信息数组。

属性

---

data[].**revised_prompt** `string`
模型优化后的提示词。

---

data[].**url** `string`
生成图片的 URL 地址。

---

### 成功响应示例

```json
{
  "created": 1777009387,
  "data": [
    {
      "revised_prompt": "",
      "url": "https://pro.filesystem.site/cdn/20260424/f6403d237d5f0513688573dbc437a6.png"
    }
  ]
}
```

---

### 错误响应

| HTTP 状态码 | 说明 |
|---|---|
| 400 | 请求参数错误 |
| 401 | API Key 无效或已禁用 |
| 403 | 权限不足或操作被拒绝 |
| 500 | 服务内部错误 |
