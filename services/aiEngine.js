export function raceAI(entry){

if(!entry || entry.length===0){

return []

}

const result = entry.map(r=>{

return{

lane:r.lane,
name:r.name,
score:Math.floor(Math.random()*40)+60

}

})

result.sort((a,b)=>b.score-a.score)

return{

ranking:result,

prediction:

`${result[0].lane}-${result[1].lane}-${result[2].lane}`,

kimarite:["逃げ","差し","まくり","まくり差し"]
[Math.floor(Math.random()*4)]

}

}
