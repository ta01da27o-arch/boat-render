import express from "express";
import cors from "cors";

import { fetchRaces } from "./fetchRaces.js";
import { predictRace } from "./predict.js";

import { fetchEntry } from "./fetchEntry.js";
import { raceAI } from "./aiEngine.js";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

/* サーバー確認 */

app.get("/", (req,res)=>{

res.send("Boat AI Server Running");

});

/* 24場レース一覧 */

app.get("/api/races", async (req,res)=>{

try{

const races = await fetchRaces();

res.json(races);

}catch(e){

res.json({error:"races fetch error"});

}

});

/* 簡易AI（旧） */

app.get("/api/predict", async (req,res)=>{

try{

const result = predictRace();

res.json(result);

}catch(e){

res.json({error:"predict error"});

}

});

/* 出走表取得 */

app.get("/api/entry", async (req,res)=>{

try{

const { jcd, race } = req.query;

if(!jcd || !race){

return res.json({error:"jcd race required"});

}

const entry = await fetchEntry(jcd,race);

res.json(entry);

}catch(e){

res.json({error:"entry fetch error"});

}

});

/* 新AI評価 */

app.get("/api/raceAI", async (req,res)=>{

try{

const { jcd, race } = req.query;

if(!jcd || !race){

return res.json({error:"jcd race required"});

}

const entry = await fetchEntry(jcd,race);

const ai = raceAI(entry);

res.json(ai);

}catch(e){

res.json({error:"AI error"});

}

});

app.listen(PORT, ()=>{

console.log("Boat AI Server Start : " + PORT);

});
