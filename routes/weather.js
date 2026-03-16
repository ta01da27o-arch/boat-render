import express from "express"

const router = express.Router()

router.get("/", (req,res)=>{

res.json({
wind:3,
weather:"sunny"
})

})

export default router
