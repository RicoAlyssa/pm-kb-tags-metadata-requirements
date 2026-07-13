# 独立 Playwright 竞品采证

该工具绕过 Codex 内置浏览器，使用独立 Chromium 和临时用户目录采集控制台请求。

## 安全边界

- 登录态保存在系统临时目录，不进入仓库。
- 原始 HAR 和 Fetch/XHR 日志保存在系统临时目录，不进入仓库。
- `.gitignore` 屏蔽 HAR、认证文件和运行时目录。
- 只有脱敏后的接口摘要允许进入竞品调研证据目录。

## 启动

```bash
npm run capture:aliyun
npm run capture:volcengine
```

浏览器打开后由用户完成登录。终端进入 `pw>` 提示符后，可使用 Playwright API，例如：

```js
await page.url()
await page.locator('button').allTextContents()
```

输入 `.exit` 会关闭浏览器并落盘 HAR。

## 脱敏

```bash
npm run capture:sanitize -- /tmp/source.har /tmp/sanitized.json
```
