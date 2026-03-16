export function trifectaAI(scores){

const a=scores[0].lane
const b=scores[1].lane
const c=scores[2].lane

return[
`${a}-${b}-${c}`,
`${a}-${c}-${b}`,
`${b}-${a}-${c}`
]

}
