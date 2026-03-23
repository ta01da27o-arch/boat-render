import express from "express";
import { getRaceData } from "./services/fetchData.js";
import { runAI } from "./predict.js";

const app = express();

app.get("/race", async (req, res) => {
  try {
    const { place = 1, race = 1 } = req.query;

    const data = await getRaceData(place, race);
    const result = runAI(data);

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "取得失敗" });
  }
});

app.listen(3000, () => {
  console.log("🚤 Server running http://localhost:3000");
});
