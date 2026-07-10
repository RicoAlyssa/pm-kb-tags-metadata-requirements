# 证据台账：知识库新增元数据

更新日期：2026-07-10

| ID | 状态 | 结论 | 来源 | 产物 | 时间 |
|---|---|---|---|---|---|
| META-EV-0001 | VERIFIED | 需求方说明元数据可记录文档 URL 或客户自定义 key，并用于检索过滤 | 用户补充会议纪要 14:53–15:26 | `00_项目总脑.md` | 2026-07-09 |
| META-EV-0002 | VERIFIED | 我方瀚海 OPEN-API 已发现新增、更新、删除、查询元数据和更新文档元数据五个接口 | 瀚海 OPEN-API 元数据目录 | `06_接口/接口清单.md` | 2026-07-09 |
| META-EV-0003 | VERIFIED | 我方更新文档元数据接口路径为 `/knowledge/openapi/v2/datasets/{dataset_id}/documents/metadata`，请求包含 `operation_data[].document_id` 和 `metadata_list[]` | 瀚海 OPEN-API 页面 `/473631326e0` | `06_接口/接口清单.md` | 2026-07-09 |
| META-EV-0004 | VERIFIED | 火山 VikingDB API 目录包含 `update_meta`，并在数据面 API/SDK 中提供元数据更新相关能力 | 火山引擎 VikingDB API 文档：`https://docs.volcengine.com/docs/84313/1269158?lang=zh` | 公开官方文档 | 2026-07-10 |
| META-EV-0005 | VERIFIED | 火山知识库文档打标可通过导入文档接口同步传入标签字段，也可上传后通过更新知识库文档信息接口设置标签字段；检索可通过 `doc_filter` 配置标签权限过滤 | 火山引擎《通过标签实现权限管理》：`https://docs.volcengine.com/docs/84313/2192050?lang=zh` | 公开官方文档 | 2026-07-10 |
| META-EV-0006 | VERIFIED | 阿里云百炼 RAG 优化文档说明可提取元数据，完成后在数据管理列表操作列查看每个文件的元数据键值对，并在向量检索前增加结构化搜索 | 阿里云百炼《RAG效果优化》：`https://www.alibabacloud.com/help/zh/model-studio/rag-optimization` | 公开官方文档 | 2026-07-10 |
| META-EV-0007 | VERIFIED | 阿里云百炼 SearchFilters 用于过滤知识库召回结果，只返回满足条件的文本切片；多个子分组默认 AND 且不可更改 | 阿里云百炼《使用 SearchFilters 提高知识库召回准确性》：`https://help.aliyun.com/zh/model-studio/how-to-use-search-filters` | 公开官方文档 | 2026-07-10 |
| META-EV-0008 | VERIFIED | 阿里云 PAI RetrieveKnowledgeBase 支持 `MetaDataFilterConditions`，其中 `FilterCondition` 取 `and/or`，`MetaDataFilters` 中 `Operator` 支持 `==`、`!=`、`contains`（contains 仅支持 `file_name` 字段） | 阿里云 PAI API 文档：`https://help.aliyun.com/zh/pai/developer-reference/api-pailangstudio-2024-07-10-retrieveknowledgebase` | 公开官方文档 | 2026-07-10 |
| META-EV-0009 | VERIFIED | Dify/RAGFlow 元数据实现已读，但按用户确认不作为正式竞品，只能作参考实现 | Dify/RAGFlow 官方文档 | 参考实现记录 | 2026-07-10 |
| META-EV-0010 | TO_CONFIRM | 火山云控制台中元数据/标签字段与文档信息更新的真实页面入口、批量能力和错误反馈 | 待登录火山云控制台 | Playwright 截图/HAR 待采集 | 2026-07-10 |
| META-EV-0011 | TO_CONFIRM | 阿里云百炼/PAI 控制台中元数据提取、SearchFilters、召回测试、文档 Meta 信息的真实页面状态 | 待登录阿里云控制台 | Playwright 截图/HAR 待采集 | 2026-07-10 |
| META-EV-0012 | TO_CONFIRM | 我方新增/更新/删除/查询元数据接口的完整请求响应、错误码、约束 | 瀚海 OPEN-API 其余元数据页面 | 待提取 | 2026-07-10 |
| META-EV-0013 | TO_CONFIRM | 我方检索接口如何表达元数据过滤条件、组合逻辑和运算符 | 瀚海 OPEN-API 检索接口/后端确认 | 待提取 | 2026-07-10 |
