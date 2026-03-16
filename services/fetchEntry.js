import axios from "axios"
import * as cheerio from "cheerio"

export async function fetchEntry(jcd,race){

const url =
`https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${jcd}`

try{

const html = (await axios.get(url)).data

const $ = cheerio.load(html)

const racers=[]

$(".table1 tbody tr").each((i,e)=>{

const name = $(e).find(".is-fs18").text().trim()

if(name){

racers.push({
lane:i+1,
name:name
})

}

})

return racers.slice(0,6)

}catch(e){

console.log("ENTRY ERROR",e)

return []

}

}
