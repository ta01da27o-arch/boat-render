export function predictRace(){

  const patterns=[
    "1-2-3",
    "1-3-2",
    "2-1-3",
    "3-1-2",
    "1-2-4"
  ];

  const kimarite=[
    "逃げ",
    "差し",
    "まくり",
    "まくり差し"
  ];

  return{

    trifecta:patterns[Math.floor(Math.random()*patterns.length)],
    kimarite:kimarite[Math.floor(Math.random()*kimarite.length)]

  };

}
