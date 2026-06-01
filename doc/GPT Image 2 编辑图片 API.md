`POST {{GATEWAY_DOMAIN}}/v1/images/edits`

本文介绍 doubao-image-2-flatfee、doubao-image-2-flatfee-2k、doubao-image-2-flatfee-4k编辑图片 API 的输入输出参数，供您使用接口时查阅字段含义。通过传入原始图片及编辑提示词，模型将对图片进行编辑处理。

**鉴权方式**

本接口通过 `Authorization` 请求头进行 API Key 鉴权，格式为 `Bearer <API Key>`。请在平台获取有效的 API Key 后发起调用。

---

## 请求参数

### 请求头

---

**Authorization** `string` **必填**
API Key 鉴权凭证，格式为 `Bearer <your-api-key>`。

---

### Content-Type

本接口使用 `multipart/form-data` 格式提交请求。

---

### 请求体

---

**model** `string` %%require%%
调用的模型名称。如 `doubao-image-2-flatfee`。

---

**image** `binary` %%require%%
需要编辑的原始图片文件。

---

**prompt** `string` %%require%%
编辑图片的提示词，描述期望的编辑效果。

---

**n** `string` %%require%%
生成图片的数量。必须为整数，介于 1 和 10 之间。

---

**size** `string` %%require%%
生成图片的尺寸，如 `1024x1024`。

---

### 请求体示例

```
model: doubao-image-2-flatfee
image: <图片文件二进制数据>
prompt: 将图片换成黑色背景
n: 1
size: 1024x1024
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
  "created": 1777010901,
  "data": [
    {
      "revised_prompt": "将图片换成黑色背景",
      "url": "https://pro.filesystem.site/cdn/20260424/8615b17125c841bf7eac69d77369b9.png"
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
