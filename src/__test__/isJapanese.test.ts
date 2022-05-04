import { isJapanese } from "../util/isJapanese";

test("日本語のみであれば「true」を返す。", () => {
  expect(isJapanese("ああああ")).toBe(true);
});

test("漢字・ひらがな・カタカナ以外の文字を含んでいたら「false」を返す。", () => {
  expect(isJapanese("ifuhewfu")).toBe(false);
});

test("漢字・ひらがな・カタカナ以外の文字を含んでいたら「false」を返す。", () => {
  expect(isJapanese("ああああw")).toBe(false);
});

test("記号文字を含んでいたら「false」を返す。", () => {
  expect(isJapanese("！?ああ")).toBe(false);
});

test("数字を含んでいたら「false」を返す。", () => {
  expect(isJapanese("123")).toBe(false);
});

test("絵文字を含んでいたら「false」を返す。", () => {
  expect(isJapanese("あああ😀")).toBe(false);
});
