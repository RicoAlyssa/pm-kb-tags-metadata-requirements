# Playwright 采证清单：知识库新增元数据

状态：待登录火山云/阿里云控制台 / 我方 Apifox 后执行

## 采证前准备

- 不在聊天或文件中记录账号密码、Cookie、Token、API Key。
- Apifox 只读浏览可以执行；“调试/发送”需要用户明确授权环境、接口和 payload。
- 控台页面采集需记录：产品、版本/套餐、区域、账号角色、URL、时间、视口、页面状态。
- Network/HAR 必须脱敏后保存。

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
