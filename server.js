import express from "express";
import { chromium } from "playwright";
import cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

/*
トップ確認
*/
app.get("/", (req, res) => {
  res.json({
    status: "Boat API Running",
    endpoints: {
      race: "/race?jyo=01&race=1"
    }
  });
});

/*
レース取得API
例
/race?jyo=01&race=1
*/
app.get("/race", async (req, res) => {
  const jyo = req.query.jyo;
  const race = req.query.race;

  if (!jyo || !race) {
    return res.json({
      status: "ERROR",
      message: "jyo と race を指定してください"
    });
  }

  const url =
    `https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${jyo}`;

  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    const html = await page.content();

    const $ = cheerio.load(html);

    let racers = [];

    $(".is-tableFixed__3rdadd tbody tr").each((i, el) => {
      const lane = $(el).find(".is-fs18").first().text().trim();
      const name = $(el).find(".is-fs16").first().text().trim();
      const motor = $(el).find(".is-fs12").first().text().trim();

      racers.push({
        lane,
        name,
        motor
      });
    });

    await browser.close();

    res.json({
      status: "OK",
      jyo,
      race,
      racers
    });

  } catch (err) {

    if (browser) await browser.close();

    res.json({
      status: "ERROR",
      message: err.message
    });
  }
});

/*
サーバー起動
*/
app.listen(PORT, () => {
  console.log(`Boat API running on port ${PORT}`);
});
