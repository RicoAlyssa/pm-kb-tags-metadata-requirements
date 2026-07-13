import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function capture(locator, output) {
  await locator.evaluate(element => {
    if (element.classList.contains("drawer")) {
      element.style.height = "auto";
      const body = element.querySelector(".dialog-body");
      if (body) body.style.flex = "none";
    }
  });
  await locator.scrollIntoViewIfNeeded();
  await locator.screenshot({ path: path.join(root, output), animations: "disabled" });
  console.log(output);
}

async function openPrototype(browser, html) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1024 },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  await page.goto(`file://${path.join(root, html)}`);
  await page.emulateMedia({ colorScheme: "light" });
  await page.waitForTimeout(150);
  return page;
}

async function closeMask(page, id) {
  await page.locator(`${id} [data-close]`).first().click();
}

async function captureTags(browser) {
  const out = "知识库新增标签/05_设计素材/section5-screenshots";
  await fs.mkdir(path.join(root, out), { recursive: true });
  const page = await openPrototype(browser, "知识库新增标签/05_设计素材/html-prototype/knowledge-tags-v1.html");

  await page.locator("#new-kb").click();
  await capture(page.locator(".create-row").filter({ hasText: "知识库标签" }), `${out}/tag-01-create-kb-label.png`);
  await page.locator("#back-create").click();

  await capture(page.locator("#list-view .content .surface"), `${out}/tag-02-list-filter.png`);
  await page.locator("#list-view [data-open='kb-batch-modal']").click();
  await capture(page.locator("#kb-batch-modal .drawer"), `${out}/tag-03-batch-kb-label.png`);
  await closeMask(page, "#kb-batch-modal");
  await page.locator("#list-view [data-open='app-kb-tag-modal']").click();
  await capture(page.locator("#app-kb-tag-modal .modal"), `${out}/tag-04-app-select-kb.png`);
  await closeMask(page, "#app-kb-tag-modal");

  await page.locator("#kb-grid .kb-card").first().click();
  await capture(page.locator("#detail-view .base"), `${out}/tag-05-kb-detail-label.png`);
  await page.locator("#detail-view [data-open='kb-tag-modal']").click();
  await capture(page.locator("#kb-tag-modal .modal"), `${out}/tag-06-edit-kb-label.png`);
  await closeMask(page, "#kb-tag-modal");

  await page.locator("#open-import").click();
  await capture(page.locator("#import-view .import-row").filter({ hasText: "文档标签" }), `${out}/tag-07-import-document-label.png`);
  await page.locator("#cancel-import").click();

  await capture(page.locator("#documents .table-wrap"), `${out}/tag-08-document-list.png`);
  await page.locator("#documents [data-open='doc-tag-modal']").first().click();
  await capture(page.locator("#doc-tag-modal .modal"), `${out}/tag-09-edit-document-label.png`);
  await closeMask(page, "#doc-tag-modal");
  await page.locator("#documents .doc-check").first().check();
  await capture(page.locator("#batch-bar"), `${out}/tag-10-batch-entry.png`);
  await page.locator("#batch-bar [data-open='batch-tag-modal']").click();
  await capture(page.locator("#batch-tag-modal .drawer"), `${out}/tag-11-batch-document-label.png`);
  await closeMask(page, "#batch-tag-modal");

  await page.locator("[data-tab='settings']").click();
  await capture(page.locator("#settings .feature-section"), `${out}/tag-12-definition-list.png`);
  await page.locator("#settings [data-open='create-doc-tag-modal']").first().click();
  await capture(page.locator("#create-doc-tag-modal .modal"), `${out}/tag-13-create-definition.png`);
  await closeMask(page, "#create-doc-tag-modal");

  await page.locator("[data-tab='retrieval']").click();
  await page.locator("#toggle-filter").click();
  await capture(page.locator("#retrieval-filter"), `${out}/tag-14-retrieval-condition.png`);
  await page.locator("#run-retrieval").click();
  await capture(page.locator("#result-content"), `${out}/tag-15-retrieval-result.png`);

  await page.locator("[data-tab='code']").click();
  await capture(page.locator("#code"), `${out}/tag-16-code-example.png`);
  await page.close();
}

async function captureMetadata(browser) {
  const out = "知识库新增元数据/05_设计素材/section5-screenshots";
  await fs.mkdir(path.join(root, out), { recursive: true });
  const page = await openPrototype(browser, "知识库新增元数据/05_设计素材/html-prototype/knowledge-metadata-v1.html");

  await page.locator("#kb-grid .kb-card").first().click();
  await capture(page.locator("#detail-view .tabs"), `${out}/meta-01-settings-entry.png`);
  await page.locator("[data-tab='settings']").click();
  await capture(page.locator("#settings .feature-section"), `${out}/meta-02-definition-list.png`);

  await page.locator("#settings [data-open='create-field-modal']").click();
  await capture(page.locator("#create-field-modal .modal"), `${out}/meta-03-create-field.png`);
  await closeMask(page, "#create-field-modal");
  await page.locator("#settings [data-open='edit-field-modal']").first().click();
  await capture(page.locator("#edit-field-modal .modal"), `${out}/meta-04-edit-field.png`);
  await closeMask(page, "#edit-field-modal");
  await page.locator("#settings [data-open='delete-field-modal']").first().click();
  await capture(page.locator("#delete-field-modal .modal"), `${out}/meta-05-delete-field.png`);
  await closeMask(page, "#delete-field-modal");

  await page.locator("[data-tab='documents']").click();
  await capture(page.locator("#documents .table-wrap"), `${out}/meta-06-document-list.png`);
  await page.locator("#documents [data-open='doc-meta-modal']").first().click();
  await capture(page.locator("#doc-meta-modal .drawer"), `${out}/meta-07-single-document-edit.png`);
  await closeMask(page, "#doc-meta-modal");
  await page.locator("#documents .doc-check").first().check();
  await capture(page.locator("#batch-bar"), `${out}/meta-08-batch-entry.png`);
  await page.locator("#batch-bar [data-open='batch-meta-modal']").click();
  await capture(page.locator("#batch-meta-modal .drawer"), `${out}/meta-09-batch-document-edit.png`);
  await closeMask(page, "#batch-meta-modal");

  await page.locator("[data-tab='retrieval']").click();
  await page.locator("#toggle-filter").click();
  await capture(page.locator("#retrieval-filter"), `${out}/meta-10-retrieval-condition.png`);
  await page.locator("#run-retrieval").click();
  await capture(page.locator("#result-content"), `${out}/meta-11-retrieval-result.png`);

  await page.locator("[data-tab='code']").click();
  await capture(page.locator("#code"), `${out}/meta-12-code-example.png`);
  await page.close();
}

const browser = await chromium.launch({ headless: true });
try {
  await captureTags(browser);
  await captureMetadata(browser);
} finally {
  await browser.close();
}
