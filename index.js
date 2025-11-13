import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";  // lightweight chromium helper

(async () => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),  // <-- key line
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://www.bol.com/nl/nl/", { waitUntil: "domcontentloaded" });
  const title = await page.title();
  console.log("✅ Page title:", title);

  await browser.close();
})();
