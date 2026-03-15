import express from "express"
import { fetchEntry } from "../services/fetchEntry.js"

const router = express.Router()

router.get("/", async (req,res)=>{

    try{

        const { jcd, race } = req.query

        if(!jcd || !race){

            return res.json({error:"jcd race required"})
        }

        const entry = await fetchEntry(jcd,race)

        res.json(entry)

    }catch(e){

        res.json({error:"entry error"})
    }

})

export default router
