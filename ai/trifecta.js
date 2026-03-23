export function trifecta(racers) {
  return [
    `${racers[0].name}-${racers[1].name}-${racers[2].name}`,
    `${racers[0].name}-${racers[2].name}-${racers[1].name}`,
  ];
}
