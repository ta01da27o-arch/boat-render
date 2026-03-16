import express from "express"
import cors from "cors"

import racesRoute from "./routes/races.js"
import entryRoute from "./routes/entry.js"
import aiRoute from "./routes/ai.js"
import weatherRoute from "./routes/weather.js"

const app = express()

app.use(cors())

const PORT = process.env.PORT || 10000

app.get("/",(req,res)=>{
res.send("🚤 Boat Race AI PRO Server")
})

app.use("/api/races",racesRoute)
app.use("/api/entry",entryRoute)
app.use("/api/ai",aiRoute)
app.use("/api/weather",weatherRoute)

app.listen(PORT,()=>{
console.log("Boat AI Server Start",PORT)
})
