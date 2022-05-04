import { kanaMap } from "../constants/kanaMap";

export const translate = (sentence: string) => {
  let translated: [string?, null?] = [];
  let prev: string | null = null;

  for (const i in [...sentence, null, null]) {
    // 2文字セットで判定する
    if (!prev) {
      prev = sentence[i];
      continue;
    }

    const current = sentence[i];

    if (["ゃ", "ゅ", "ょ"].includes(current)) {
      // 拗音の場合
      // prevはそのままで、currentだけ処理する
      translated.push(prev);
      translated.push(current);

      if (kanaMap[current]) {
        translated.push(kanaMap[current]);
      }
      prev = null;
    } else if (current === "ー") {
      // 長音の場合
      // prevとcurrentを同時に処理する
      translated.push(prev);
      const s = kanaMap[prev];
      if (s) {
        translated.push(s);
      }
      translated.push(current);
      translated.push(s);
      prev = null;
    } else {
      // 通常パターンの場合
      // prevだけ処理する
      translated.push(prev);
      if (kanaMap[prev]) {
        translated.push(kanaMap[prev]);
      }
      prev = current;
    }
  }
  return translated.join("");
};
