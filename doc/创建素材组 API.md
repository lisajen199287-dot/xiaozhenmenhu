`POST {{GATEWAY_DOMAIN}}/app-api/api/v1/assets/asset-groups`

本文介绍创建素材组 API 的输入输出参数，供您使用接口时查阅字段含义。调用本接口可在当前用户下创建一个新的素材组，用于管理图片、视频等素材资源。

**鉴权方式**

本接口通过 `Authorization` 请求头进行 API Key 鉴权，格式为 `Bearer <API Key>`。请在平台获取有效的 API Key 后发起调用。

---

## 请求参数
> 跳转 [响应参数](#响应参数)

### 请求头

---

**Authorization** `string` **必填**
API Key 鉴权凭证，格式为 `Bearer <your-api-key>`。

---

### 请求体

---

**Name** `string` **必填**
素材组名称。

---

**Description** `string` `可选`
素材组描述信息。不传时默认为空字符串。

---

### 请求体示例

```json
{
  "Name": "我的素材组",
  "Description": "用于存放视频生成的参考图片素材"
}
```

---

<span id="响应参数"></span>
## 响应参数
> 跳转 [请求参数](#请求参数)

成功时返回 HTTP 200，响应体为火山引擎素材管理 API 返回的素材组信息（JSON 格式透传）。

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

错误时返回统一格式：

**error.code** `integer`
HTTP 状态码。

**error.message** `string`
错误描述信息。

---

| HTTP 状态码 | 说明 |
|---|---|
| 400 | 请求参数错误，如 Name 为空 |
| 401 | API Key 无效或已禁用 |
| 403 | 权限不足或操作被拒绝 |
| 500 | 服务内部错误 |

### 错误响应示例

```json
{
  "error": {
    "code": 400,
    "message": "Name is required"
  }
}
```

```json
{
  "error": {
    "code": 401,
    "message": "API Key 无效或已禁用"
  }
}
```
