import express from "express";

import { fetchEntry } from "../services/fetchEntry.js";
import { raceAI } from "../ai/raceAI.js";

const router = express.Router();

router.get("/", async(req,res)=>{

const { jcd,race } = req.query;

if(!jcd || !race){

return res.json({error:"jcd race required"});

}

try{

const entry = await fetchEntry(jcd,race);

const ai = raceAI(entry);

res.json(ai);

}catch(e){

res.json({error:"AI error"});

}

});

export default router;
