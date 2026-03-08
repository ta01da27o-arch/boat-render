import axios from "axios";
import cheerio from "cheerio";

const stadiums = [
  "kiryu",
  "toda",
  "edogawa",
  "heiwajima",
  "tamagawa",
  "hamanako",
  "gamagori",
  "tokoname",
  "tsu",
  "mikuni",
  "biwako",
  "suminoe",
  "amagasaki",
  "naruto",
  "marugame",
  "kojima",
  "miyajima",
  "tokuyama",
  "shimonoseki",
  "wakamatsu",
  "ashiya",
  "fukuoka",
  "karatsu",
  "omura"
];

export async function fetchKyotei24() {

  const results = [];

  for (const stadium of stadiums) {

    try {

      const url = `https://www.boatrace.jp/owpc/pc/race/index?jcd=${stadium}`;

      const response = await axios.get(url);

      const $ = cheerio.load(response.data);

      const title = $("title").text();

      results.push({
        stadium: stadium,
        title: title
      });

      console.log(stadium + " OK");

    } catch (error) {

      console.log(stadium + " 取得失敗");

      results.push({
        stadium: stadium,
        error: true
      });

    }

  }

  return results;
}
