# 火山方舟 Playwright 接口采证（标签）

采证时间：2026-07-12（Asia/Shanghai）
区域：cn-beijing
方式：独立 Playwright 持久化浏览器；原始 HAR/JSONL 仅保存在系统临时目录，本文只保留脱敏后的字段结构。

## 已验证页面能力

- 标准版创建页和导入页没有文档标签 Schema 配置；标准版原始文档列表也没有“标签”列。
- 旗舰版原始文档列表有“标签”列和编辑入口。
- 旗舰版标签字段支持 `List<int64>`、`List<string>`、`Float32`、`Bool`、`Date_time`、`Geo_point`。
- 编辑标签页明确提示：知识库内文档的 `doc_id` 无需配置即可用于检索过滤。
- 知识检索输入框使用 `@` 选择筛选范围，可选文档、目录和标签；标签过滤支持多条件“且”组合。
- 实测 `List<string>` 字段的操作符为“包含”。带一个标签条件执行检索时，未匹配到文档，说明条件确实进入检索链路。

## 已验证控制台接口

所有下列请求均为 `POST`，采证响应状态均为 `200`。

| 接口 | 场景 | 脱敏请求结构摘要 |
|---|---|---|
| `/api/top/vikingdb/cn-beijing/2025-04-01/CreateCollection` | 创建标准版知识库 | `version: 2`、`CollectionName`、`Description`、`ShardType: 2`、`EmbeddingModel`、`EmbeddingModelVersion`、`build_directory: true`；未携带标签 Schema |
| `/api/top/vikingdb/cn-beijing/2025-04-01/GetKnowledgeBasePreSignedUrl` | 本地上传预签名 | 请求资源标识已脱敏 |
| `/api/top/vikingdb/cn-beijing/2025-04-01/AddDoc` | 导入文档 | `AddType: 2`、`KnowledgeBaseId`、`strategy_resource_id`、`TosDocs[].TosPath`、`dedup.content_dedup/doc_name_dedup` |
| `/api/top/vikingdb/cn-beijing/2025-04-01/GetKnowledgeDocList` | 文档列表 | 用于加载文档状态、标签列和处理策略 |
| `/api/top/vikingdb/cn-beijing/2025-04-01/CreateSearchConfig` | 创建一次检索配置 | 见下方过滤结构 |
| `/api/top/vikingdb/cn-beijing/2025-04-01/GetKnowledgeServiceChat` | 执行检索 | 与 `CreateSearchConfig` 紧接发生，实际查询文本和资源标识不入库 |

标签过滤请求的核心结构：

```json
{
  "Config": {
    "PureSearchConfig": {
      "ChunkNum": 10,
      "RerankEnabled": false,
      "DenseWeight": 0.5,
      "Filter": {
        "Relation": 0,
        "Conditions": [
          {
            "FieldName": "liststring",
            "FieldType": "list<string>",
            "Operator": 0,
            "Values": ["product"]
          }
        ]
      },
      "FilterMode": "tag"
    },
    "LlmEnabled": false
  }
}
```

控制台 UI 将 `Relation: 0` 显示为“且”，将该 `List<string>` 条件的 `Operator: 0` 显示为“包含”。其他类型的操作符枚举值尚未逐项发起请求，不能据此类推。

## 资源与清理

- 创建了测试标准版知识库 `codex_api_evidence_20260712`，并导入 `evidence-document.md`。
- 标准版页面显示约 ¥0.0416/小时（约 ¥1/天）。
- 用户确认清理后已复核知识库列表，测试资源不再存在；原有 `tag_test`、`test` 未改动。
- 只读查看了账号中已有旗舰版知识库的标签 UI；未保存、未修改其标签数据。
