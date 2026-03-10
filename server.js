import express from "express";
import cors from "cors";

import { fetchRaces } from "./fetchRaces.js";
import { predictRace } from "./predict.js";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

app.get("/", (req,res)=>{
  res.send("Boat AI Server Running");
});

/* 24場レース一覧 */

app.get("/api/races", async (req,res)=>{

  const races = await fetchRaces();

  res.json(races);

});

/* AI予想 */

app.get("/api/predict", async (req,res)=>{

  const result = predictRace();

  res.json(result);

});

app.listen(PORT, ()=>{

  console.log("Server Start " + PORT);

});
