export function raceAI(entry){

const result = entry.map(r=>{

let score = 50;

if(r.lane===1) score +=30;
if(r.lane===2) score +=15;

score += Math.random()*20;

return{

lane:r.lane,
name:r.name,
score:Math.floor(score)

};

});

result.sort((a,b)=>b.score-a.score);

return result;

}
