import axios from "axios"
import * as cheerio from "cheerio"

export async function fetchEntry(jcd,race){

const url =
`https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${jcd}`

try{

const html = (await axios.get(url)).data

const $ = cheerio.load(html)

const racers=[]

$(".is-fs18").each((i,e)=>{

const name=$(e).text().trim()

if(name){

racers.push({
lane:racers.length+1,
name:name
})

}

})

return racers.slice(0,6)

}catch(e){

return []

}

}
