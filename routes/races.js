import express from "express";
import { fetchRaces } from "../services/fetchRaces.js";

const router = express.Router();

router.get("/", async(req,res)=>{

try{

const data = await fetchRaces();

res.json(data);

}catch(e){

res.json({error:"race fetch error"});

}

});

export default router;
