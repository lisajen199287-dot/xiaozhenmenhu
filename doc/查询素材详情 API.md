`GET {{GATEWAY_DOMAIN}}/app-api/api/v1/assets/assets/{assetId}`

本文介绍查询素材详情 API 的输入输出参数，供您使用接口时查阅字段含义。调用本接口可根据素材 ID 查询该素材的详细信息。

**鉴权方式**

本接口通过 `Authorization` 请求头进行 API Key 鉴权，格式为 `Bearer <API Key>`。请在平台获取有效的 API Key 后发起调用。

---

## 请求参数


### 请求头

---

**Authorization** `string` **必填**
API Key 鉴权凭证，格式为 `Bearer <your-api-key>`。

---

### 路径参数

---

**assetId** `string` **必填**
素材 ID。

---

### 请求示例

```
GET /app-api/api/v1/assets/assets/ast-xxxxxxxx
Authorization: Bearer <your-api-key>
```

---

<span id="响应参数"></span>
## 响应参数


成功时返回 HTTP 200，响应体为火山引擎素材管理 API 返回的素材详情（JSON 格式透传）。

### 成功响应示例

```json
{
  "AssetId": "ast-xxxxxxxx",
  "AssetGroupId": "ag-xxxxxxxx",
  "AssetType": "Image",
  "AssetName": "我的图片",
  "Status": "Active",
  "CreatedAt": "2026-04-14T10:00:00Z",
  "UpdatedAt": "2026-04-14T10:00:00Z"
}
```

---

### 错误响应

| HTTP 状态码 | 说明 |
|---|---|
| 401 | API Key 无效或已禁用 |
| 403 | 权限不足或操作被拒绝 |
| 404 | 素材不存在 |
| 500 | 服务内部错误 |

### 错误响应示例

```json
{
  "error": {
    "code": 404,
    "message": "素材不存在"
  }
}
```
