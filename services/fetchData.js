import { chromium } from "playwright";

export async function getRaceData(place, race) {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  });

  const page = await context.newPage();

  const jcd = String(place).padStart(2, "0");

  const url = `https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${jcd}`;

  try {
    await page.goto(url, { timeout: 60000 });

    // ✅ Playwrightはこれが強い
    await page.waitForSelector("table tbody tr", {
      timeout: 30000,
    });

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tbody tr");

      const racers = [];

      rows.forEach((row) => {
        const cols = row.querySelectorAll("td");

        if (cols.length < 5) return;

        racers.push({
          name: cols[2]?.innerText.trim() || "",
          motorRate: parseFloat(cols[6]?.innerText) || 0,
          boatRate: parseFloat(cols[7]?.innerText) || 0,
          exhibition: Math.random() * 7,
          start: Math.random() * 0.2,
        });
      });

      return racers;
    });

    console.log("取得件数:", data.length);

    await browser.close();

    return data;
  } catch (e) {
    console.error("❌ Playwright取得失敗:", e.message);

    await browser.close();
    return [];
  }
}
