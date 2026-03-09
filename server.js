import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

app.get("/", (req,res)=>{
  res.send("Boat AI Server Running");
});

app.get("/api/test", (req,res)=>{
  res.json({status:"ok"});
});

app.listen(PORT,()=>{
  console.log("Server Start " + PORT);
});
