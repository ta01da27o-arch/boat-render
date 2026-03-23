import puppeteer from "puppeteer";

export async function getRaceData(place, race) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  const url = `https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${place}`;

  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const rows = document.querySelectorAll(".is-fs12 tbody tr");

    const racers = [];

    rows.forEach((row) => {
      const cols = row.innerText.split("\n");

      racers.push({
        name: cols[1],
        motorRate: parseFloat(cols[6]) || 0,
        boatRate: parseFloat(cols[7]) || 0,
        exhibition: Math.random() * 7, // 仮（後で本物に）
        start: Math.random() * 0.2,
      });
    });

    return racers;
  });

  await browser.close();

  return data;
}
