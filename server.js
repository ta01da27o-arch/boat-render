import express from "express";
import { fetchKyotei24 } from "./scraper/fetchKyotei24.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Boat Race API running");
});

app.get("/api/races", async (req, res) => {
  try {
    const data = await fetchKyotei24();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "データ取得失敗" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
