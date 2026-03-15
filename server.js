import express from "express"
import cors from "cors"

import racesRoute from "./routes/races.js"
import entryRoute from "./routes/entry.js"
import aiRoute from "./routes/ai.js"

const app = express()

app.use(cors())

const PORT = process.env.PORT || 10000

app.get("/", (req,res)=>{
    res.send("🚤 Boat AI Server Running")
})

app.use("/api/races",racesRoute)
app.use("/api/entry",entryRoute)
app.use("/api/ai",aiRoute)

app.listen(PORT,()=>{
    console.log("Server Start",PORT)
})
