import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";  // lightweight chromium helper

(async () => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),  // <-- key line
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://www.bol.com/nl/nl/p/optimum-nutrition-gold-standard-100-whey-protein-vanilla-ice-cream-proteine-poeder-eiwitshake-900-gram/9300000006273787/?cid=1762880559513-4368238637159&bltgh=638dde53-e8b7-4ddf-a75c-689777a3a21d.ProductList_Middle.2.ProductImage", { waitUntil: "domcontentloaded" });
  
  // Extract title from h1.page-heading span[data-test="title"]
  const title = await page.$eval('h1.page-heading span[data-test="title"]', (element) => element.textContent.trim()).catch(() => null);
  const title2 = await page  .title();
  console.log("✅ Page title:", title);
  if (title) {
    console.log("✅ Extracted title:", title);
  } else {
    console.warn("⚠️ Could not find title element");
  }

  console.log("✅ Page title2:", title2);

  await browser.close();
})();

