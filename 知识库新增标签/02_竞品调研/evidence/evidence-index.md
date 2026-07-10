# 证据台账：知识库新增标签

更新日期：2026-07-10

| ID | 状态 | 结论 | 来源 | 产物 | 时间 |
|---|---|---|---|---|---|
| TAG-EV-0001 | VERIFIED | 需求方明确要求知识库级标签与文档级标签分开；知识库级标签涉及计费，文档级标签不涉及计费 | 用户补充会议纪要与后续明确说明 | `00_项目总脑.md` | 2026-07-09 |
| TAG-EV-0002 | TO_CONFIRM | 当前已浏览的瀚海 OPEN-API 元数据目录未发现我方标签接口；这只证明当前搜索范围未发现，不证明接口不存在 | 瀚海 OPEN-API 当前可见目录 | `06_接口/接口清单.md` | 2026-07-09 |
| TAG-EV-0003 | VERIFIED | Dify 官方 Knowledge API 提供知识库标签创建、查询、更新、绑定、解绑等能力，标签类型为知识库标签 | Dify Tags API：`https://docs.dify.ai/en/api-reference/tags/create-knowledge-tag`、`https://docs.dify.ai/en/api-reference/tags/list-knowledge-tags`、`https://docs.dify.ai/en/api-reference/tags/create-tag-binding`、`https://docs.dify.ai/en/api-reference/tags/delete-tag-binding` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0004 | VERIFIED | Dify 知识库列表 API 支持按 keyword 和 tags 过滤知识库，响应示例含 `tags` 字段 | Dify List Knowledge Bases：`https://docs.dify.ai/en/api-reference/knowledge-bases/list-knowledge-bases` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0005 | INFERRED | 竞品常把“文档过滤”做在 metadata/filtering 链路；该事实只能作为过滤链路参考，不能替代我方“文档级标签”产品对象 | 由 Dify Metadata 与 Knowledge Retrieval 文档推断：`https://docs.dify.ai/en/cloud/use-dify/knowledge/metadata`、`https://docs.dify.ai/en/cloud/use-dify/nodes/knowledge-retrieval` | 公开官方文档 | 2026-07-10 |
| TAG-EV-0006 | TO_CONFIRM | 友商控制台中知识库标签、文档标签的真实页面入口、状态和异常反馈 | 待用户登录/提供友商控制台 | Playwright 截图/HAR 待采集 | 2026-07-10 |
| TAG-EV-0007 | TO_CONFIRM | 知识库级标签是否在竞品中承担计费、项目、成本中心或业务平台同步能力 | 待友商控制台和官方计费/套餐文档 | 证据待采集 | 2026-07-10 |
