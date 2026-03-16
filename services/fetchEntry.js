import axios from "axios"
import * as cheerio from "cheerio"

export async function fetchEntry(jcd,race){

const url =
`https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${jcd}`

try{

const res = await axios.get(url,{
headers:{
"User-Agent":
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
}
})

const html = res.data
const $ = cheerio.load(html)

const racers=[]

$(".table1 tbody tr").each((i,e)=>{

const name =
$(e).find(".is-fs18").first().text().trim()

if(name){

racers.push({
lane:i+1,
name:name
})

}

})

return racers.slice(0,6)

}catch(e){

console.log("ENTRY ERROR",e.message)

return []

}

}
