import { motorScore } from "./motor.js";
import { startScore } from "./start.js";
import { windScore } from "./wind.js";
import { tenjiScore } from "./tenji.js";
import { trifecta } from "./trifecta.js";

export function aiEngine(data) {
  const scored = data.map((r) => {
    const score =
      motorScore(r) +
      startScore(r) +
      windScore(r) +
      tenjiScore(r);

    return { ...r, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return {
    ranking: scored,
    trifecta: trifecta(scored),
  };
}
