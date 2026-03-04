import express from "express";
import { chromium } from "playwright";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", async (req, res) => {
  try {
    const browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto("https://www.boatrace.jp/owpc/pc/race/index", {
      waitUntil: "networkidle"
    });

    const title = await page.title();

    await browser.close();

    res.json({ status: "OK", title });

  } catch (error) {
    res.json({ status: "ERROR", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
