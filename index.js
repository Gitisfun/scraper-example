import puppeteer from "puppeteer";

const url = "https://www.bol.com/nl/nl/";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--single-process",
        "--no-zygote",
      ],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Example: grab the title
    const title = await page.title();
    console.log("✅ Page title:", title);

    // Example: scrape something from Bol’s homepage
    const promoText = await page.$eval("h1, h2, h3", el => el.textContent.trim());
    console.log("📦 Example text:", promoText);

    await browser.close();
  } catch (err) {
    console.error("❌ Scraper failed:", err);
    process.exit(1);
  }
})();
