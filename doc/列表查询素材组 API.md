`POST {{GATEWAY_DOMAIN}}/app-api/api/v1/assets/asset-groups/list`

本文介绍列表查询素材组 API 的输入输出参数，供您使用接口时查阅字段含义。调用本接口可分页查询当前用户下所有素材组。

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

**PageNum** `integer` `可选` `默认值 1`
返回结果的页码。

---

**PageSize** `integer` `可选` `默认值 20`
每页返回的结果数量。

---

### 请求体示例

```json
{
  "PageNum": 1,
  "PageSize": 20
}
```

---

<span id="响应参数"></span>
## 响应参数


成功时返回 HTTP 200，响应体为火山引擎素材管理 API 返回的素材组列表（JSON 格式透传）。

### 成功响应示例

```json
{
  "Items": [
    {
      "AssetGroupId": "ag-xxxxxxxx",
      "Name": "我的素材组",
      "Description": "用于存放视频生成的参考图片素材",
      "CreatedAt": "2026-04-14T10:00:00Z",
      "UpdatedAt": "2026-04-14T10:00:00Z"
    },
    {
      "AssetGroupId": "ag-yyyyyyyy",
      "Name": "角色参考图",
      "Description": "",
      "CreatedAt": "2026-04-13T08:30:00Z",
      "UpdatedAt": "2026-04-13T08:30:00Z"
    }
  ],
  "Total": 2,
  "PageNum": 1,
  "PageSize": 20
}
```

---

### 错误响应

| HTTP 状态码 | 说明 |
|---|---|
| 401 | API Key 无效或已禁用 |
| 500 | 服务内部错误 |
