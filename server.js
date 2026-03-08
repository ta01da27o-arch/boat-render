import express from "express";
import cors from "cors";
import { fetchKyotei24 } from "./fetchKyotei24.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Boat Race 24 API Running");
});

app.get("/api/races", async (req, res) => {
  try {

    console.log("24場データ取得開始");

    const data = await fetchKyotei24();

    res.json({
      update: new Date(),
      stadiums: data
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "取得失敗"
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Start : " + PORT);
});
