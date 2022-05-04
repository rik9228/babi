import { translate } from "../util/translate";

const mock: { [key: string]: string } = {
  きょうりゅう: "きょぼうぶりゅぶうぶ",
  めそっど: "めべそぼっどぼ",
  まっちゃ: "まばっちゃば",
  まつこでらっくす: "まばつぶこぼでべらばっくぶすぶ",
};

test("受け取ったひらがな文字列をバビ語", () => {
  for (const key in mock) {
    const translatedWord = translate(key);
    expect(translatedWord).toBe(mock[key]); // 最終的に返される値
  }
});
