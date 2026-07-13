# 标签 Playwright 补采记录

采证时间：2026-07-13（Asia/Shanghai）

采证方式：独立 Playwright 持久化浏览器、页面截图、脱敏 Fetch/XHR 日志

操作边界：仅填写未提交的测试名称、切换创建步骤、打开详情与编辑弹窗、读取列表和 Network；未创建、保存、购买、删除或修改竞品资源。

## 1. 阿里云百炼

### 1.1 前端结论

| 页面 | 实测结果 | 截图 |
| --- | --- | --- |
| 创建知识库第 1 步“基础信息” | 页面包含名称、描述、知识库类型和使用场景，不提供知识库级标签字段 | screenshots/aliyun/ALIYUN-TAG-0012-create-kb-step1-no-kb-tag.png |
| 创建知识库第 2 步“选择数据” | 上传文件区域提供“新增标签”、标签输入、已创建标签和 0/100 计数；该标签随上传数据配置 | screenshots/aliyun/ALIYUN-TAG-0013-create-kb-step2-document-tags.png |
| 知识库列表 | 卡片展示名称、描述、ID、规格、场景和数据量，不展示知识库级标签，也没有知识库级标签筛选 | screenshots/aliyun/ALIYUN-TAG-0014-kb-list-no-kb-tag.png |
| 知识库详情 | 顶部展示名称、规格、连接器和存储配额；文档表格提供 Meta 信息，不展示知识库级标签 | screenshots/aliyun/ALIYUN-TAG-0015-kb-detail-no-kb-tag.png |
| 编辑知识库 | 表单包含名称、描述、数据来源、检索参数、模型和规格，不提供知识库级标签字段 | screenshots/aliyun/ALIYUN-TAG-0016-kb-edit-no-kb-tag.png |

### 1.2 Network 结论

| 接口 | 实测响应或用途 |
| --- | --- |
| `rag-knowledgebase.list` | 列表结构包含名称、描述、知识库 ID、场景、规格、状态、数据量等，不包含知识库级 `tags` |
| `rag-knowledgebase.detail` | 详情结构包含索引配置、Meta 模板、数据源、检索配置和规格等，不包含知识库级 `tags` |
| `rag-knowledgebase.dataList` | 文档列表项明确包含 `tags`，同时包含 `dataId`、`dataName`、`metaExtractInfo`、状态等 |
| `dataHub.getTagsHistoryByTenant` | 创建知识库第 2 步读取租户内已创建的文档标签，供上传时复用 |

结论：本次控制台与响应 Schema 一致表明，阿里百炼当前标签对象属于上传数据/文档，不属于知识库本身。

## 2. 火山方舟

### 2.1 前端结论

| 页面 | 实测结果 | 截图 |
| --- | --- | --- |
| 知识库列表 | 卡片展示名称、创建人、创建时间、版本、文档数、切片数和资源规格，不展示费用标签摘要或标签筛选 | screenshots/TAG-EV-0038-volc-kb-list-no-tag-summary.png |
| 知识库详情 | 基本信息区展示“费用标签”，可通过铅笔进入编辑弹窗 | screenshots/TAG-EV-0039-volc-fee-tag-dialog.png |
| 编辑标签弹窗 | 文案明确写“费用标签用于项目分账”；字段为标签名、标签内容，支持添加至 50 组 | screenshots/TAG-EV-0039-volc-fee-tag-dialog.png |
| 标签名候选 | 标签名和标签内容均为“请选择或输入”；标签名下拉读取已有自定义标签键 | screenshots/TAG-EV-0040-volc-fee-tag-name-options.png |
| 全局标签管理 | 弹窗“标签管理”跳转至资源管理；页面说明标签是 KV 键值对，可用于标签鉴权和标签分账，并提供新建、绑定资源、解绑资源、删除 | screenshots/TAG-EV-0041-volc-resource-tag-management.png |

### 2.2 Network 结论

| 接口 | 实测请求或响应结构 |
| --- | --- |
| `GetCollectionInfo` | 知识库详情响应包含顶层 `tags[]`；当前测试知识库返回空数组，与页面“费用标签：-”一致 |
| `GetTagKeys` | 查询自定义标签键；请求包含 `MatchType`、`TagType=custom`、`MaxResults`、`NextToken` |
| `GetTagValues` | 查询标签值和绑定资源数；请求包含 `CountResource=true` 与 `TagKeys.n` |
| `GetServiceConfigSupportTag` | 查询支持标签的服务配置 |
| `GetDescribeResourcesConfig` | 查询资源标签控制台支持的资源类型配置 |
| `ListCollections` | 加载知识库列表 |
| `GetKnowledgeDocList` | 加载原始文档列表；文档记录包含 `Meta`，用于文档级字段信息 |

结论：火山方舟知识库级费用标签复用全局资源标签体系；知识库详情负责绑定，资源管理负责标签定义与跨资源管理，知识库列表当前不展示标签摘要。

## 3. 证据边界

- 主对比表只写本轮页面、响应 Schema、既有脱敏 HAR 或官方文档已经直接证明的能力。
- 阿里知识库级标签按“当前控制台与接口不提供”记录，不再使用模糊的“未证明”表述。
- 火山写接口没有在本轮触发；主表只引用资源管理页面已经明确展示的创建、绑定、解绑能力，不虚构具体写接口路径。
