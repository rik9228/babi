import { toHiragana } from "../util/toHiragana";

const mock: { [key: string]: string } = {
  恐竜: "きょうりゅう",
  弁当: "べんとう",
  抹茶: "まっちゃ",
  マツコデラックス: "まつこでらっくす",
  喜んでいただきます: "よろこんでいただきます",
};

test("受け取った文字列をひらがなで返す", async () => {
  for (const key in mock) {
    const res = await toHiragana(key);
    if (res) {
      const { converted } = res?.data;
      expect(converted).toBe(mock[key]); // 最終的に返される値
    }
  }
});
