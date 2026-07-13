# 证据台账：知识库新增标签

更新日期：2026-07-13

| ID | 状态 | 结论 | 来源 | 产物 | 时间 |
|---|---|---|---|---|---|
| TAG-EV-0001 | VERIFIED | 需求方明确要求知识库级标签与文档级标签分开；知识库级标签涉及计费，文档级标签不涉及计费 | 用户补充会议纪要与后续明确说明 | `00_项目总脑.md` | 2026-07-09 |
| TAG-EV-0002 | TO_CONFIRM | 当前已浏览的瀚海 OPEN-API 元数据目录未发现我方标签接口；这只证明当前搜索范围未发现，不证明接口不存在 | 瀚海 OPEN-API 当前可见目录 | `06_接口/接口清单.md` | 2026-07-09 |
| TAG-EV-0003 | VERIFIED | 火山知识库支持在创建知识库的高级配置中创建标签；标签用于对知识库文档分类与过滤，检索时先在标签范围内检索文档 | 扣子官方《关联火山知识库》：`https://docs.coze.cn/guides_kir27ori` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0004 | VERIFIED | 火山知识库标签仅旗舰版支持，且公开文档说明仅支持在创建知识库时创建标签，创建后不支持变更标签名称 | 扣子官方《关联火山知识库》：`https://docs.coze.cn/guides_kir27ori` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0005 | VERIFIED | 火山知识库支持文档级打标：导入后可在“原始文档-标签”列编辑标签，也可通过导入文档接口或更新文档信息接口设置标签字段 | 火山引擎官方《通过标签实现权限管理》：`https://docs.volcengine.com/docs/84313/2192050?lang=zh` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0006 | VERIFIED | 火山知识库检索/问答可通过 `doc_filter` 参数配置标签权限过滤 | 火山引擎官方《通过标签实现权限管理》：`https://docs.volcengine.com/docs/84313/2192050?lang=zh` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0007 | VERIFIED | 火山知识库在扣子编程中使用时，存储、召回与重排由火山知识库侧完成并产生火山知识库费用；创建后上传文档会预留计算资源并开始计费 | 扣子官方《关联火山知识库》：`https://docs.coze.cn/guides_kir27ori` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0008 | VERIFIED | 阿里云百炼支持文档搜索类知识库的标签过滤：可上传文档时设置标签或在数据管理页编辑标签；调用应用 API 时可在 `tags` 参数中指定标签，也可在控制台编辑智能体应用时设置标签 | 阿里云百炼《RAG效果优化》：`https://www.alibabacloud.com/help/zh/model-studio/rag-optimization` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0009 | VERIFIED | 阿里云百炼知识检索服务支持多知识库联合检索、知识库路由和知识库级独立参数；独立配置中包含“标签过滤” | 阿里云百炼《知识检索》：`https://help.aliyun.com/zh/model-studio/rag-knowledge-retrieval` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0010 | VERIFIED | Dify 官方 Knowledge API 的标签能力已读，但按用户确认不作为正式竞品，只能作接口/交互参考实现 | Dify 官方 API 文档 | 参考实现记录 | 2026-07-10 |
| TAG-EV-0011 | VERIFIED | 火山旗舰版已确认费用标签、文档标签 Schema、文档编辑、列表筛选、检索/问答过滤入口；阿里已确认上传与后置编辑入口 | Playwright 控制台截图/HAR | `02_竞品调研/竞品横向对比.md` | 2026-07-13 |
| TAG-EV-0012 | PARTIAL | 火山费用标签明确用于项目分账；阿里未证明标签直接承担成本中心；我方仍需确认金山云资源标签能否绑定知识库 | 控制台与平台现状采证 | `02_竞品调研/竞品横向对比.md` | 2026-07-13 |
| TAG-EV-0013 | VERIFIED | 阿里云百炼控制台支持文档/数据级标签：创建知识库上传数据时可新增标签，已有文档可通过“更多 > 标签”后置管理；当前截图未证明知识库级计费标签 | 用户提供阿里云百炼截图 | `02_竞品调研/evidence/阿里云百炼截图分类.md` | 2026-07-10 |
| TAG-EV-0014 | VERIFIED | 火山方舟标准版创建/导入请求未携带标签 Schema，标准版文档列表没有标签列；旗舰版文档列表有标签列和编辑入口 | 独立 Playwright 控制台/HAR 采证 | `02_竞品调研/evidence/火山方舟Playwright接口采证-20260712.md` | 2026-07-12 |
| TAG-EV-0015 | VERIFIED | 火山旗舰版强类型标签支持 List&lt;int64&gt;、List&lt;string&gt;、Float32、Bool、Date_time、Geo_point，且 `doc_id` 无需配置即可过滤 | 独立 Playwright 控制台采证 | `02_竞品调研/evidence/火山方舟Playwright接口采证-20260712.md` | 2026-07-12 |
| TAG-EV-0016 | VERIFIED | 火山控制台通过 `CreateSearchConfig` 提交 `Filter.Relation + Conditions[]`，条件含 `FieldName/FieldType/Operator/Values`，并使用 `FilterMode: "tag"` | 独立 Playwright 脱敏 HAR | `02_竞品调研/evidence/火山方舟Playwright接口采证-20260712.md` | 2026-07-12 |
| TAG-EV-0017 | VERIFIED | 火山旗舰版文档标签能力完整度高，但创建入口深、与独占资源计费绑定、字段名创建后不可变；适合参考分层和条件组件，不宜照搬强类型标签 | 旗舰版专项测评 | `02_竞品调研/竞品横向对比.md` | 2026-07-13 |
| TAG-EV-0018 | VERIFIED | 阿里创建知识库第 1 步、知识库列表、详情和编辑表单均不提供知识库级标签；第 2 步上传数据提供文档标签 | 独立 Playwright 控制台采证 | `02_竞品调研/evidence/标签Playwright补采-20260713.md` | 2026-07-13 |
| TAG-EV-0019 | VERIFIED | 阿里 `rag-knowledgebase.list/detail` 响应不含知识库级 `tags`，`rag-knowledgebase.dataList` 文档项明确包含 `tags` | 独立 Playwright 脱敏 Network 采证 | `02_竞品调研/evidence/标签Playwright补采-20260713.md` | 2026-07-13 |
| TAG-EV-0020 | VERIFIED | 火山知识库详情提供费用标签编辑，文案明确用于项目分账；`GetCollectionInfo` 响应包含知识库级 `tags[]` | 独立 Playwright 控制台与脱敏 Network 采证 | `02_竞品调研/evidence/标签Playwright补采-20260713.md` | 2026-07-13 |
| TAG-EV-0021 | VERIFIED | 火山费用标签复用全局资源标签体系；资源管理页面明确标签为 KV，可用于标签鉴权和标签分账，支持新建、绑定、解绑、删除 | 独立 Playwright 控制台采证 | `02_竞品调研/evidence/标签Playwright补采-20260713.md` | 2026-07-13 |
| TAG-EV-0022 | VERIFIED | 火山费用标签候选读取 `GetTagKeys/GetTagValues`；知识库列表当前不展示费用标签摘要，绑定入口位于知识库详情 | 独立 Playwright 控制台与脱敏 Network 采证 | `02_竞品调研/evidence/标签Playwright补采-20260713.md` | 2026-07-13 |
