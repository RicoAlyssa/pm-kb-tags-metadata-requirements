# Playwright 采证清单：知识库新增元数据

状态：待登录火山云/阿里云控制台 / 我方 Apifox 后执行

## 采证前准备

- 不在聊天或文件中记录账号密码、Cookie、Token、API Key。
- Apifox 只读浏览可以执行；“调试/发送”需要用户明确授权环境、接口和 payload。
- 控台页面采集需记录：产品、版本/套餐、区域、账号角色、URL、时间、视口、页面状态。
- Network/HAR 必须脱敏后保存。
- 每个截图必须同时记录：竞品、产品线、账号角色、区域/环境、URL、页面标题、采集时间、视口、前置动作。

## 登录后立即执行顺序

### A. 火山云 / 火山引擎

1. 进入火山知识库、火山方舟或 Viking 知识库控制台，记录产品入口、区域、账号角色。
2. 找到创建知识库、高级配置、标签/字段配置相关入口，只读查看字段类型、是否可改名、版本限制。
3. 进入原始文档列表或文档详情，查看文档字段/标签值编辑入口、批量能力、保存/取消、失败反馈。
4. 打开检索、问答测试或服务调用配置，查看 `doc_filter` 或同类过滤条件在控制台中的表达方式。
5. 需要接口证据时，只针对 `update_meta`、更新文档信息、`doc_filter` 相关请求采脱敏 Network。
6. 记录删除/改名限制：尤其是“创建后标签名不可变更”是否在控制台中出现，是否影响已上传文档。

### B. 阿里云 / 百炼 / PAI

1. 进入百炼或 PAI 知识库控制台，记录产品入口、区域、账号角色。
2. 进入数据管理页，查看文档 Meta 信息、标签编辑、字段查看入口。
3. 进入元数据提取或 RAG 优化相关页面，记录是否支持自动抽取、抽取方式和查看 Meta 键值对。
4. 进入 SearchFilters、知识检索服务或应用 API 配置页，记录过滤字段、运算符、AND/OR 组合、空值/无命中反馈。
5. 对 PAI RetrieveKnowledgeBase 相关能力，重点采 `MetaDataFilterConditions` 与控制台配置项是否对应。
6. 需要接口证据时，保存脱敏方法、路径、请求字段、响应字段和错误结构；不保存文档正文、租户 ID、Token。

### C. 我方 Apifox

1. 只读进入已知五个元数据接口页面，补齐请求/响应 schema、错误码、必填、类型、限制。
2. 查检索接口是否存在 metadata filter 表达式，记录字段、运算符、AND/OR、权限组合、生效时间。
3. 不点击“调试/发送”，除非用户明确授权具体环境、接口和 payload。

## 每个 Flow 的最低证据包

| 内容 | 要求 |
|---|---|
| Screenshot | 至少 1 张页面全局截图；字段弹窗、错误、空态、过滤结果需单独截图 |
| UI notes | 入口、字段类型、默认值、保存/取消、删除/清空、批量规则、刷新后状态 |
| Network/API | 仅当 PRD/API 需要字段名或过滤表达式时采；必须脱敏 |
| Evidence row | 写入 `evidence/evidence-index.md`，状态只能是 `VERIFIED/INFERRED/TO_CONFIRM` |

## 必跑流程

| Flow ID | 页面/动作 | 要采集的证据 | 输出 |
|---|---|---|---|
| META-CAP-001 | 火山云创建知识库/高级配置 | 标签字段、字段类型、创建后是否可改 | 截图 + URL |
| META-CAP-002 | 火山云原始文档列表/详情 | 文档字段/标签值编辑、批量能力、失败反馈 | 截图 + 页面结构 notes |
| META-CAP-003 | 火山云 API/Network | `update_meta`、更新文档信息接口、`doc_filter` 请求结构 | 脱敏 Network/API 摘录 |
| META-CAP-004 | 火山云检索/问答测试 | 字段/标签过滤后的命中差异 | 截图 + 结果 notes |
| META-CAP-005 | 阿里云数据管理 | 文档 Meta 信息、标签编辑、字段查看入口 | 截图 + URL |
| META-CAP-006 | 阿里云 SearchFilters/API | filter 条件、AND 固定语义、参数落点 | 脱敏 Network/API 摘录 |
| META-CAP-007 | 阿里云 PAI RetrieveKnowledgeBase | `MetaDataFilterConditions` 控制台/API 对应关系 | 脱敏 Network/API 摘录 |
| META-CAP-008 | 阿里云召回测试/知识检索服务 | 过滤条件配置、命中切片、失败状态 | 截图 + 结果 notes |
| META-CAP-009 | 我方 Apifox 元数据接口 | 五个元数据接口的请求/响应/错误码/schema | 脱敏接口摘录 |
| META-CAP-010 | 我方检索接口 | metadata filter 表达式、权限组合、生效说明 | 脱敏接口摘录 |

## 证据命名

| 类型 | 命名 |
|---|---|
| 截图 | `evidence/screenshots/META-EV-xxxx-<flow>-<state>.png` |
| 页面结构 | `evidence/ui-notes/META-EV-xxxx-<flow>.md` |
| HAR/Network | `evidence/network/META-EV-xxxx-<flow>.sanitized.har` |
| Apifox 摘录 | `../06_接口/evidence/META-API-xxxx.md` |

## 采完后的写入位置

- 证据台账：`evidence/evidence-index.md`
- 横向对比：`竞品横向对比.md`
- PRD 交互表：`../03_需求文档/PRD.md`
- 字段映射/错误码：`../06_接口/前后端字段映射.md`、`../06_接口/错误码.md`

## 停止与确认规则

- 登录、验证码、MFA、权限申请由用户处理；不在聊天中发送密码或验证码。
- 看到会创建、删除、保存、发送请求、开通计费、购买资源的按钮时，先停下，除非用户已明确授权该具体动作和测试数据。
- 页面里如果出现“上传文档”要求，优先使用用户提供的测试文件；没有测试文件时只记录入口，不上传真实业务文件。
- 若火山/阿里控制台实际页面与公开文档矛盾，以授权控制台截图和时间为准，并在证据台账标记冲突。
