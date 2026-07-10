# Playwright 采证清单：知识库新增元数据

状态：待登录友商控制台 / 我方 Apifox 后执行

## 采证前准备

- 不在聊天或文件中记录账号密码、Cookie、Token、API Key。
- Apifox 只读浏览可以执行；“调试/发送”需要用户明确授权环境、接口和 payload。
- 控台页面采集需记录：产品、版本/套餐、区域、账号角色、URL、时间、视口、页面状态。
- Network/HAR 必须脱敏后保存。

## 必跑流程

| Flow ID | 页面/动作 | 要采集的证据 | 输出 |
|---|---|---|---|
| META-CAP-001 | 知识库元数据入口 | 元数据入口在知识库设置、详情还是独立页 | 截图 + URL |
| META-CAP-002 | 元数据定义列表 | 字段名、类型、使用量、内置/自定义、空态 | 截图 + 页面结构 notes |
| META-CAP-003 | 新增字段 | 类型枚举、名称规则、保存反馈、重复名错误 | 截图 + 可选 Network |
| META-CAP-004 | 编辑字段 | 能否改名、能否改类型、影响提示 | 截图 + 操作步骤 |
| META-CAP-005 | 删除字段定义 | 删除前影响范围、是否阻断引用、删除后结果 | 截图 + 异常记录 |
| META-CAP-006 | 文档详情元数据 | 单文档添加/修改/清空/删除字段值 | 截图 + 可选 Network |
| META-CAP-007 | 文档列表批量编辑 | 多文档赋值、应用范围、部分失败、覆盖/部分更新 | 截图 + Network schema |
| META-CAP-008 | 召回测试/应用配置 | metadata filter 字段、运算符、AND/OR、测试结果 | 截图 + 结果 notes |
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
