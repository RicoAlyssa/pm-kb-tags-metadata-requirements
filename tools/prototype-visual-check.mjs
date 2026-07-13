import { chromium } from "playwright";
import path from "node:path";

const cases = [
  ["知识库新增标签/05_设计素材/html-prototype/knowledge-tags-v1.html", "知识库新增标签/05_设计素材/html-prototype/preview-tags-v1.png", "知识库新增标签/05_设计素材/html-prototype/preview-tags-create-v1.png", "知识库新增标签/05_设计素材/html-prototype/preview-tags-import-v1.png", "知识库新增标签/05_设计素材/html-prototype/preview-tags-retrieval-v2.png", "知识库新增标签/05_设计素材/html-prototype/preview-tags-settings-v2.png"],
  ["知识库新增元数据/05_设计素材/html-prototype/knowledge-metadata-v1.html", "知识库新增元数据/05_设计素材/html-prototype/preview-metadata-v1.png", "知识库新增元数据/05_设计素材/html-prototype/preview-metadata-create-v1.png", "知识库新增元数据/05_设计素材/html-prototype/preview-metadata-import-v1.png", "知识库新增元数据/05_设计素材/html-prototype/preview-metadata-retrieval-v2.png", "知识库新增元数据/05_设计素材/html-prototype/preview-metadata-settings-v2.png"],
];

const browser = await chromium.launch({ headless: true });
for (const [html, listPng, createPng, importPng, retrievalPng, settingsPng] of cases) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1, colorScheme: "light" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(`file://${path.resolve(html)}`);
  await page.emulateMedia({ colorScheme: "light" });
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.resolve(listPng), fullPage: true });
  await page.locator("#new-kb").click();
  await page.waitForTimeout(100);
  const state = await page.evaluate(() => ({
    createVisible: !document.querySelector("#create-view").classList.contains("hidden"),
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    planCards: document.querySelectorAll(".spec-card").length,
  }));
  await page.screenshot({ path: path.resolve(createPng), fullPage: true });
  await page.locator('.spec-card[data-plan="专业版"]').click();
  const professionalPrice = await page.locator("#compute-price").textContent();
  await page.locator("#buy-create").click();
  const requiredErrorVisible = await page.locator("#create-name-error").isVisible();
  await page.locator("#create-name").fill("知识库创建页验收");
  await page.locator("#buy-create").click();
  const toastVisible = await page.locator("#toast").isVisible();
  await page.evaluate(() => document.querySelector("#toast")?.classList.remove("show"));
  await page.locator("#back-create").click();
  const listVisibleAfterBack = await page.locator("#list-view").isVisible();
  await page.locator(".kb-card").first().click();
  await page.locator("#open-import").click();
  const importVisible = await page.locator("#import-view").isVisible();
  await page.screenshot({ path: path.resolve(importPng), fullPage: true });
  await page.locator("#confirm-import").click();
  await page.evaluate(() => document.querySelector("#toast")?.classList.remove("show"));
  await page.locator('[data-tab="retrieval"]').click();
  const retrievalVisible = await page.locator("#retrieval").isVisible();
  await page.locator("#toggle-filter").click();
  const filterVisible = await page.locator("#retrieval-filter").isVisible();
  await page.screenshot({ path: path.resolve(retrievalPng), fullPage: true });
  await page.locator('[data-tab="settings"]').click();
  const settingsVisible = await page.locator("#settings").isVisible();
  await page.screenshot({ path: path.resolve(settingsPng), fullPage: true });
  const interaction = { professionalPrice, requiredErrorVisible, toastVisible, listVisibleAfterBack, importVisible, retrievalVisible, filterVisible, settingsVisible };
  console.log(`${html} | state=${JSON.stringify(state)} | interaction=${JSON.stringify(interaction)} | errors=${errors.length}`);
  if (!state.createVisible || state.horizontalOverflow || state.planCards !== 3 || professionalPrice !== "¥2.1" || !requiredErrorVisible || !toastVisible || !listVisibleAfterBack || !importVisible || !retrievalVisible || !filterVisible || !settingsVisible || errors.length) process.exitCode = 1;
  await page.close();
}
await browser.close();
