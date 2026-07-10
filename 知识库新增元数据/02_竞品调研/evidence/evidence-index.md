# 证据台账：知识库新增元数据

更新日期：2026-07-10

| ID | 状态 | 结论 | 来源 | 产物 | 时间 |
|---|---|---|---|---|---|
| META-EV-0001 | VERIFIED | 需求方说明元数据可记录文档 URL 或客户自定义 key，并用于检索过滤 | 用户补充会议纪要 14:53–15:26 | `00_项目总脑.md` | 2026-07-09 |
| META-EV-0002 | VERIFIED | 我方瀚海 OPEN-API 已发现新增、更新、删除、查询元数据和更新文档元数据五个接口 | 瀚海 OPEN-API 元数据目录 | `06_接口/接口清单.md` | 2026-07-09 |
| META-EV-0003 | VERIFIED | 我方更新文档元数据接口路径为 `/knowledge/openapi/v2/datasets/{dataset_id}/documents/metadata`，请求包含 `operation_data[].document_id` 和 `metadata_list[]` | 瀚海 OPEN-API 页面 `/473631326e0` | `06_接口/接口清单.md` | 2026-07-09 |
| META-EV-0004 | VERIFIED | Dify 支持在知识库管理 Metadata Fields，字段变更会影响该知识库全局；区分 built-in 和 custom metadata | Dify Metadata 产品文档：`https://docs.dify.ai/en/cloud/use-dify/knowledge/metadata` | 公开官方文档 | 2026-07-10 |
| META-EV-0005 | VERIFIED | Dify 支持批量编辑文档元数据，也支持在文档详情页编辑单文档元数据；删除字段在不同入口影响范围不同 | Dify Metadata 产品文档：`https://docs.dify.ai/en/cloud/use-dify/knowledge/metadata` | 公开官方文档 | 2026-07-10 |
| META-EV-0006 | VERIFIED | Dify Knowledge Retrieval 节点支持启用 metadata filtering，用于限制检索到特定文档 | Dify Knowledge Retrieval：`https://docs.dify.ai/en/cloud/use-dify/nodes/knowledge-retrieval` | 公开官方文档 | 2026-07-10 |
| META-EV-0007 | VERIFIED | Dify Metadata API 支持创建/查询/更新/删除 metadata field，类型包含 string/number/time，并支持批量更新文档元数据 | Dify Metadata API：`https://docs.dify.ai/en/api-reference/metadata/create-metadata-field`、`https://docs.dify.ai/en/api-reference/metadata/list-metadata-fields`、`https://docs.dify.ai/en/api-reference/metadata/update-document-metadata-in-batch` | 公开官方文档 | 2026-07-10 |
| META-EV-0008 | VERIFIED | RAGFlow 官方文档说明从 v0.23.0 起支持 dataset 级和 individual file 级 metadata 管理 | RAGFlow Manage Metadata：`https://ragflow.io/docs/manage_metadata` | 公开官方文档 | 2026-07-10 |
| META-EV-0009 | VERIFIED | 阿里云 Model Studio 文档说明应用 API 可通过 `metadata_filter` 指定 metadata，检索时先基于 metadata 过滤文件 | 阿里云 Model Studio 知识库文档：`https://www.alibabacloud.com/help/en/model-studio/rag-knowledge-base` | 公开官方文档 | 2026-07-10 |
| META-EV-0010 | VERIFIED | 阿里云 PAI 文档展示在文档 chunk 详情中编辑 metadata，并在 Recall Test 中添加 metadata filter 测试过滤效果 | 阿里云 PAI 知识库文档：`https://www.alibabacloud.com/help/en/pai/knowledge-base-management` | 公开官方文档 | 2026-07-10 |
| META-EV-0011 | TO_CONFIRM | 我方新增/更新/删除/查询元数据接口的完整请求响应、错误码、约束 | 瀚海 OPEN-API 其余元数据页面 | 待提取 | 2026-07-10 |
| META-EV-0012 | TO_CONFIRM | 我方检索接口如何表达元数据过滤条件、组合逻辑和运算符 | 瀚海 OPEN-API 检索接口/后端确认 | 待提取 | 2026-07-10 |
