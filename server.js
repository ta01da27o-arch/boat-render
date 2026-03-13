import express from "express";
import cors from "cors";

import racesRoute from "./routes/races.js";
import aiRoute from "./routes/ai.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

/* server check */

app.get("/", (req,res)=>{

res.send("Boat AI Server Running 🚤");

});

/* routes */

app.use("/api/races", racesRoute);
app.use("/api/ai", aiRoute);

/* start */

app.listen(PORT,()=>{

console.log("Boat AI Server Start 🚤");
console.log("PORT:",PORT);

});
