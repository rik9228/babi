// 漢字・ひらがな・カタカナ以外の文字を含んでいたら「false」を返す。
export const isJapanese = (sentence: string): boolean => {
  return sentence.match(
    /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/
  )
    ? true
    : false;
};
