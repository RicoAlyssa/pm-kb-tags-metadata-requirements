# 火山方舟 Playwright 接口采证（元数据）

采证时间：2026-07-12（Asia/Shanghai）
区域：cn-beijing
方式：独立 Playwright 持久化浏览器；原始 HAR/JSONL 仅保存在系统临时目录，本文只保留脱敏后的结构。

## 结论

- 火山控制台把强类型文档元数据呈现为“标签”，且仅在旗舰版文档列表显示编辑入口；本次新建的标准版没有标签 Schema 或标签列。
- 已观察类型：`List<int64>`、`List<string>`、`Float32`、`Bool`、`Date_time`、`Geo_point`。
- `doc_id` 是无需配置即可过滤的内置字段。
- 检索过滤由 `/CreateSearchConfig` 提交，结构为 `Filter.Relation + Conditions[]`；每个条件含 `FieldName`、`FieldType`、`Operator`、`Values`，并用 `FilterMode: "tag"` 标记过滤模式。
- 本次只读打开已有文档的标签编辑页后取消，未触发标签值保存，因此 `update_meta`/文档标签更新请求体仍以官方文档证据为准，尚未获得控制台保存请求的 Network 证据。

## 脱敏检索过滤结构

```json
{
  "KnowledgeBaseId": "[REDACTED]",
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

UI 对应关系仅确认两项：`Relation: 0` = “且”；该 `List<string>` 条件的 `Operator: 0` = “包含”。

## 相关接口

| 接口 | 作用 | 状态 |
|---|---|---|
| `/api/top/vikingdb/cn-beijing/2025-04-01/CreateCollection` | 创建知识库；本次标准版请求未携带标签 Schema | VERIFIED，200 |
| `/api/top/vikingdb/cn-beijing/2025-04-01/AddDoc` | 导入文档，包含去重和处理策略引用 | VERIFIED，200 |
| `/api/top/vikingdb/cn-beijing/2025-04-01/GetKnowledgeDocList` | 加载文档列表和旗舰版标签列 | VERIFIED，200 |
| `/api/top/vikingdb/cn-beijing/2025-04-01/CreateSearchConfig` | 保存本次检索参数与标签过滤表达式 | VERIFIED，200 |
| `/api/top/vikingdb/cn-beijing/2025-04-01/GetKnowledgeServiceChat` | 执行检索 | VERIFIED，200 |

用户确认清理后已复核知识库列表，测试资源 `codex_api_evidence_20260712` 不再存在；原有知识库未改动。
