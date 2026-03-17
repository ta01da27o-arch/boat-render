import { chromium } from "playwright"

export async function fetchEntry(jcd,race){

const url =
`https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${jcd}`

let browser

try{

browser = await chromium.launch({
args:["--no-sandbox"]
})

const page = await browser.newPage()

await page.goto(url,{waitUntil:"domcontentloaded"})

await page.waitForTimeout(2000)

const racers = await page.evaluate(()=>{

const rows =
document.querySelectorAll(".table1 tbody tr")

const list=[]

rows.forEach((r,i)=>{

const name =
r.querySelector(".is-fs18")

if(name){

list.push({
lane:i+1,
name:name.innerText.trim()
})

}

})

return list.slice(0,6)

})

await browser.close()

return racers

}catch(e){

if(browser) await browser.close()

return []

}

}
