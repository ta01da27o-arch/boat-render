import puppeteer from "puppeteer"

export async function fetchEntry(jcd, race){

const url =
`https://www.boatrace.jp/owpc/pc/race/raceindex?rno=${race}&jcd=${jcd}`

let browser

try{

browser = await puppeteer.launch({
args:["--no-sandbox","--disable-setuid-sandbox"]
})

const page = await browser.newPage()

await page.goto(url,{waitUntil:"networkidle2"})

/* ここが最重要 */
await page.waitForSelector(".table1", { timeout: 10000 })

const racers = await page.evaluate(()=>{

const list = []

/* 選手名だけ直接取得 */
const names =
document.querySelectorAll(".is-fs18.is-fBold")

names.forEach((el,i)=>{

list.push({
lane:i+1,
name:el.innerText.trim()
})

})

return list.slice(0,6)

})

await browser.close()

return racers

}catch(e){

if(browser) await browser.close()

console.log("ENTRY ERROR",e.message)

return []

}

}
