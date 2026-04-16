`GET {{GATEWAY_DOMAIN}}/api/v1/assets/asset-groups/{groupId}`

本文介绍查询素材组详情 API 的输入输出参数，供您使用接口时查阅字段含义。调用本接口可根据素材组 ID 查询该素材组的详细信息。

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

**groupId** `string` **必填**
素材组 ID。

---

### 请求示例

```
GET /api/v1/assets/asset-groups/ag-xxxxxxxx
Authorization: Bearer <your-api-key>
```

---

<span id="响应参数"></span>
## 响应参数


成功时返回 HTTP 200，响应体为火山引擎素材管理 API 返回的素材组详情（JSON 格式透传）。

### 成功响应示例

```json
{
  "AssetGroupId": "ag-xxxxxxxx",
  "Name": "我的素材组",
  "Description": "用于存放视频生成的参考图片素材",
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
| 404 | 素材组不存在 |
| 500 | 服务内部错误 |

### 错误响应示例

```json
{
  "error": {
    "code": 404,
    "message": "素材组不存在"
  }
}
```
