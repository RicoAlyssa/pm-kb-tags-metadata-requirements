# 证据台账：知识库新增元数据

更新日期：2026-07-13

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
| META-EV-0010 | PARTIAL | 火山旗舰版已确认强类型字段定义、单文档编辑、列表与检索/问答过滤；批量赋值和保存错误反馈仍待补 | Playwright 控制台截图/HAR | `02_竞品调研/竞品横向对比.md` | 2026-07-13 |
| META-EV-0011 | VERIFIED | 阿里控制台已确认 Metadata 模板、抽取方式、文档 Meta 信息查看及用途开关 | Playwright 控制台截图 | `02_竞品调研/evidence/阿里云百炼截图分类.md` | 2026-07-13 |
| META-EV-0012 | VERIFIED | 瀚海已确认元数据定义 CRUD、查询字段、批量文档赋值及 200/400/401/403/404 | 瀚海 Apifox | `06_接口/接口清单.md` | 2026-07-13 |
| META-EV-0013 | VERIFIED | 瀚海检索支持 `filter_expression` 与 `metadata_filtering_conditions.logical_operator/conditions[]` | 瀚海 Apifox | `06_接口/前后端字段映射.md` | 2026-07-13 |
| META-EV-0014 | VERIFIED | 阿里云百炼控制台存在独立“Metadata 抽取 / Meta 信息模板”能力，字段级支持常量、变量、大模型、正则、关键词搜索，并可分别控制参与检索和参与模型回复 | 用户提供阿里云百炼截图 | `02_竞品调研/evidence/阿里云百炼截图分类.md` | 2026-07-10 |
| META-EV-0015 | VERIFIED | 火山旗舰版把强类型文档元数据呈现为标签，支持 List&lt;int64&gt;、List&lt;string&gt;、Float32、Bool、Date_time、Geo_point；`doc_id` 为内置可过滤字段 | 独立 Playwright 控制台采证 | `02_竞品调研/evidence/火山方舟Playwright接口采证-20260712.md` | 2026-07-12 |
| META-EV-0016 | VERIFIED | 火山标签/元数据检索过滤请求由 `CreateSearchConfig` 提交，核心为 `Filter.Relation + Conditions[]`，条件含 `FieldName/FieldType/Operator/Values` | 独立 Playwright 脱敏 HAR | `02_竞品调研/evidence/火山方舟Playwright接口采证-20260712.md` | 2026-07-12 |
| META-EV-0017 | PARTIAL | 本次只读打开文档标签编辑页后取消，未触发保存请求；控制台 `update_meta`/标签值更新请求体仍待单独测试资源上的旗舰版保存采证 | 独立 Playwright 控制台/HAR 采证 | `02_竞品调研/evidence/火山方舟Playwright接口采证-20260712.md` | 2026-07-12 |
| META-EV-0018 | VERIFIED | 火山旗舰版强类型 Schema 和过滤闭环完整，但自动抽取弱、创建后字段名不可变；适合参考类型过滤和内置字段，不宜照搬命名及套餐绑定 | 旗舰版专项测评 | `02_竞品调研/竞品横向对比.md` | 2026-07-13 |
