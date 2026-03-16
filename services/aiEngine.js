import { motorAI } from "../ai/motorAI.js"
import { tenjiAI } from "../ai/tenjiAI.js"
import { windAI } from "../ai/windAI.js"
import { startAI } from "../ai/startAI.js"
import { trifectaAI } from "../ai/trifectaAI.js"

export function raceAI(data){

const scores = data.map(r=>{

let score = 50

score += motorAI(r)
score += tenjiAI(r)
score += windAI(r)
score += startAI(r)

return{
...r,
score
}

})

scores.sort((a,b)=>b.score-a.score)

const trifecta = trifectaAI(scores)

return{

ranking:scores,
trifecta

}

}
