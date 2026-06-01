`POST {{GATEWAY_DOMAIN}}/3rd/v1beta/models/{model}:generateContent`

本文介绍文生图模型 API 的输入输出参数，供您使用接口时查阅字段含义。通过传入文本提示词，模型将生成对应的图片。
doubao-3.1-flash-image-preview、doubao-3.1-flash-image-preview-2k、doubao-3.1-flash-image-preview-4k、doubao-3.5-flash、doubao-banana-2、doubao-banana-2-2k、doubao-banana-2-4k、doubao-banana-pro、doubao-banana-pro-2k、doubao-banana-pro-4k
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

**contents** `array` %%require%%
输入给模型的内容数组，包含文本提示词信息。

属性

---

contents[].**parts** `array` %%require%%
内容片段数组。

属性

---

contents[].parts[].**text** `string` %%require%%
输入想要生成的内容描述（文本提示词）。

---

**generationConfig** `object` %%require%%
生成配置信息。

属性

---

generationConfig.**imageConfig** `object` %%require%%
图片生成配置。

属性

---

generationConfig.imageConfig.**aspectRatio** `string` %%require%%
生成图片的纵横比例。可选值：

* `"1:1"`
* `"1:4"`
* `"1:8"`
* `"2:3"`
* `"3:2"`
* `"3:4"`
* `"4:1"`
* `"4:3"`
* `"4:5"`
* `"5:4"`
* `"8:1"`
* `"9:16"`
* `"16:9"`
* `"21:9"`

---

generationConfig.imageConfig.**imageSize** `string` %%require%%
生成图片的分辨率。可选值：

* `"512px"`
* `"1K"`
* `"2K"`
* `"4K"`

---

### 请求体示例

```json
{
    "contents": [{
      "parts": [
        {"text": "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme"}
      ]
    }],
    "generationConfig": {
      "imageConfig": {
        "aspectRatio": "16:9",
        "imageSize": "1K"
      }
    }
}
```

---

## 响应参数

**candidates** `array`
模型生成的图片结果数组。

属性

---

candidates[].**content** `object`
生成的内容信息。

属性

---

candidates[].content.**parts** `array`
内容片段数组，包含生成的图片数据。

属性

---

candidates[].content.parts[].**inlineData** `object`
生成的图片数据。

属性

---

candidates[].content.parts[].inlineData.**mimeType** `string`
图片的 MIME 类型，如 `image/png`。

---

candidates[].content.parts[].inlineData.**data** `string`
图片的 Base64 编码数据。

---

candidates[].content.parts[].**thoughtSignature** `string`
思考签名信息。

---

candidates[].content.**role** `string`
角色标识，如 `model`。

---

candidates[].**finishReason** `string`
结束原因，如 `STOP`。

---

candidates[].**index** `integer`
结果索引。

---

**usageMetadata** `object`
本次请求的用量信息。

属性

---

usageMetadata.**promptTokenCount** `integer`
输入提示词的 Token 数量。

---

usageMetadata.**candidatesTokenCount** `integer`
生成内容的 Token 数量。

---

usageMetadata.**totalTokenCount** `integer`
消耗的总 Token 数量。

---

usageMetadata.**promptTokensDetails** `array`
输入 Token 明细。

属性

---

usageMetadata.promptTokensDetails[].**modality** `string`
模态类型，如 `TEXT`。

---

usageMetadata.promptTokensDetails[].**tokenCount** `integer`
该模态的 Token 数量。

---

usageMetadata.**candidatesTokensDetails** `array`
输出 Token 明细。

属性

---

usageMetadata.candidatesTokensDetails[].**modality** `string`
模态类型，如 `IMAGE`。

---

usageMetadata.candidatesTokensDetails[].**tokenCount** `integer`
该模态的 Token 数量。

---

**modelVersion** `string`
本次请求使用的模型版本号。

---

**responseId** `string`
响应的唯一标识 ID。

---

### 成功响应示例

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "inlineData": {
              "mimeType": "image/png",
              "data": "<Base64编码图片数据>"
            },
            "thoughtSignature": "aaaaaaaaaa"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 0
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 17,
    "candidatesTokenCount": 1551,
    "totalTokenCount": 1568,
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 17
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "IMAGE",
        "tokenCount": 1120
      }
    ]
  },

  "responseId": "lkWiaeiSLdumjMcP4vfT4Q4"
}
```
