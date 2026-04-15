`POST {{GATEWAY_DOMAIN}}/app-api/api/v1/assets/assets/list`

本文介绍列表查询素材 API 的输入输出参数，供您使用接口时查阅字段含义。调用本接口可分页查询指定素材组下的所有素材，支持按状态进行过滤。

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
需要查询的素材组 ID。

---

**Filter** `object` `可选`
过滤条件。

属性

---

Filter.**Status** `string[]` `可选`
按素材状态过滤，支持传入多个状态值。

* `Active`：正常可用的素材
* 其他状态值以火山引擎素材管理 API 支持的状态为准

---

**PageNum** `integer` `可选` `默认值 1`
返回结果的页码。

---

**PageSize** `integer` `可选` `默认值 20`
每页返回的结果数量。

---

### 请求体示例

```json
{
  "AssetGroupId": "ag-xxxxxxxx",
  "Filter": {
    "Status": ["Active"]
  },
  "PageNum": 1,
  "PageSize": 20
}
```

---

<span id="响应参数"></span>
## 响应参数


成功时返回 HTTP 200，响应体为火山引擎素材管理 API 返回的素材列表（JSON 格式透传）。

### 成功响应示例

```json
{
  "Items": [
    {
      "AssetId": "ast-xxxxxxxx",
      "AssetGroupId": "ag-xxxxxxxx",
      "AssetType": "Image",
      "Name": "我的图片",
      "Status": "Active",
      "CreatedAt": "2026-04-14T10:00:00Z",
      "UpdatedAt": "2026-04-14T10:00:00Z"
    }
  ],
  "Total": 1,
  "PageNum": 1,
  "PageSize": 20
}
```

---

### 错误响应

| HTTP 状态码 | 说明 |
|---|---|
| 400 | 请求参数错误，如 AssetGroupId 为空 |
| 401 | API Key 无效或已禁用 |
| 403 | 权限不足或操作被拒绝 |
| 404 | 素材组不存在 |
| 500 | 服务内部错误 |
