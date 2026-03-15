import express from "express"
import { fetchEntry } from "../services/fetchEntry.js"
import { raceAI } from "../services/aiEngine.js"

const router = express.Router()

router.get("/", async (req,res)=>{

    try{

        const { jcd, race } = req.query

        const entry = await fetchEntry(jcd,race)

        const ai = raceAI(entry)

        res.json(ai)

    }catch(e){

        res.json({error:"ai error"})
    }

})

export default router
