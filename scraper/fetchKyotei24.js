import { chromium } from "playwright";
import cheerio from "cheerio";

const stadiums = [
  "01","02","03","04","05","06",
  "07","08","09","10","11","12",
  "13","14","15","16","17","18",
  "19","20","21","22","23","24"
];

export async function fetchKyotei24() {

  const browser = await chromium.launch({
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  const results = [];

  for (const stadium of stadiums) {

    const url =
      `https://www.boatrace.jp/owpc/pc/race/racelist?jcd=${stadium}`;

    console.log("取得:", url);

    try {

      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000
      });

      const html = await page.content();
      const $ = cheerio.load(html);

      const races = [];

      $(".table1 tbody tr").each((i, el) => {

        const race = $(el).find(".is-fBold").text().trim();
        const time = $(el).find(".time").text().trim();

        if (race) {
          races.push({
            race,
            time
          });
        }

      });

      if (races.length > 0) {
        results.push({
          stadium,
          races
        });
      }

    } catch (e) {

      console.log("取得失敗:", stadium);

    }

  }

  await browser.close();

  return results;
}
