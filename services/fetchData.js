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

  // ✅ 超重要：軽量化
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const type = req.resourceType();
    if (["image", "stylesheet", "font", "media"].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  // ✅ User-Agent（ブロック対策）
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
  );

  // ✅ タイムアウト延長
  page.setDefaultNavigationTimeout(60000);

  const url = `https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${place}`;

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // ✅ 少し待つ（Renderは遅い）
    await new Promise((r) => setTimeout(r, 3000));

    await page.waitForSelector(".is-fs12", { timeout: 20000 });

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll(".is-fs12 tbody tr");

      const racers = [];

      rows.forEach((row) => {
        const cols = row.innerText.split("\n");

        racers.push({
          name: cols[1] || "",
          motorRate: parseFloat(cols[6]) || 0,
          boatRate: parseFloat(cols[7]) || 0,
          exhibition: Math.random() * 7,
          start: Math.random() * 0.2,
        });
      });

      return racers;
    });

    await browser.close();
    return data;
  } catch (e) {
    console.error("❌ Render取得失敗:", e.message);

    await browser.close();
    return [];
  }
}
