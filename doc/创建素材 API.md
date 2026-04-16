`POST {{GATEWAY_DOMAIN}}/api/v1/assets/assets`

本文介绍创建素材 API 的输入输出参数，供您使用接口时查阅字段含义。调用本接口可在指定素材组中创建一个新的素材（图片/视频等），通过公网 URL 上传素材资源。

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

**AssetGroupId** `string` **必填**
素材所属的素材组 ID。

---

**ImageUrl** `string` **必填**
素材的公网 URL 地址。支持图片、视频等资源的公网可访问 URL。

---

**AssetType** `string` `可选` `默认值 "Image"`
素材类型。枚举值：

* `Image`：图片素材
* 其他类型以火山引擎素材管理 API 支持的类型为准

---

**Name** `string` `可选` `默认值 ""`
素材名称。不传时默认为空字符串。

---

### 请求体示例

```json
{
  "AssetGroupId": "ag-xxxxxxxx",
  "AssetType": "Image",
  "Name": "我的图片",
  "ImageUrl": "https://example.com/image.jpg"
}
```

---

<span id="响应参数"></span>
## 响应参数


成功时返回 HTTP 200，响应体为火山引擎素材管理 API 返回的素材信息（JSON 格式透传）。

### 成功响应示例

```json
{
  "AssetId": "ast-xxxxxxxx",
  "AssetGroupId": "ag-xxxxxxxx",
  "AssetType": "Image",
  "Name": "我的图片",
  "Status": "Active",
  "CreatedAt": "2026-04-14T10:00:00Z",
  "UpdatedAt": "2026-04-14T10:00:00Z"
}
```

---

### 错误响应

| HTTP 状态码 | 说明 |
|---|---|
| 400 | 请求参数错误，如 AssetGroupId 或 ImageUrl 为空 |
| 401 | API Key 无效或已禁用 |
| 403 | 权限不足或操作被拒绝 |
| 404 | 素材组不存在 |
| 500 | 服务内部错误 |

### 错误响应示例

```json
{
  "error": {
    "code": 400,
    "message": "AssetGroupId is required"
  }
}
```

```json
{
  "error": {
    "code": 400,
    "message": "ImageUrl is required"
  }
}
```
