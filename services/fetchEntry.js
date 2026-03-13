import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchEntry(jcd,race){

const url =
`https://www.boatrace.jp/owpc/pc/race/racelist?rno=${race}&jcd=${jcd}`;

try{

const html = (await axios.get(url)).data;

const $ = cheerio.load(html);

const racers=[];

$(".is-fs12").each((i,e)=>{

racers.push({

lane:i+1,
name:$(e).text().trim()

});

});

return racers;

}catch(e){

console.log(e);
return [];

}

}
