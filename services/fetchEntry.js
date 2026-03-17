import puppeteer from "puppeteer"

export async function fetchEntry(jcd, race){

const url =
`https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${jcd}`

let browser

try{

browser = await puppeteer.launch({
args:["--no-sandbox","--disable-setuid-sandbox"]
})

const page = await browser.newPage()

await page.goto(url,{waitUntil:"domcontentloaded"})

await page.waitForTimeout(2000)

const racers = await page.evaluate(()=>{

const rows =
document.querySelectorAll(".table1 tbody tr")

const list=[]

rows.forEach((row,i)=>{

const nameEl =
row.querySelector(".is-fs18")

if(nameEl){

list.push({
lane:i+1,
name:nameEl.innerText.trim()
})

}

})

return list.slice(0,6)

})

await browser.close()

return racers

}catch(e){

if(browser) await browser.close()

console.log("ENTRY ERROR",e)

return []

}

}
