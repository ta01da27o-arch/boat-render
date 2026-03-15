import express from "express"
import { fetchRaces } from "../services/fetchRaces.js"

const router = express.Router()

router.get("/", async (req,res)=>{

    try{

        const races = await fetchRaces()

        res.json(races)

    }catch(e){

        res.json({error:"races fetch error"})

    }

})

export default router
