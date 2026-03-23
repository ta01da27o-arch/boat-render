import puppeteer from "puppeteer";

export async function getRaceData(place, race) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-zygote",
      "--single-process"
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
  );

  page.setDefaultNavigationTimeout(60000);

  const url = `https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${place}`;

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // ✅ テーブル待機（これが本命）
    await page.waitForSelector("table tbody tr", { timeout: 20000 });

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

    await browser.close();

    console.log("取得件数:", data.length); // ← デバッグ用

    return data;
  } catch (e) {
    console.error("取得失敗:", e.message);
    await browser.close();
    return [];
  }
}
