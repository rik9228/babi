"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const kanaMap_1 = require("../constants/kanaMap");
const translate = (sentence) => {
    let translated = [];
    let prev = null;
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
            if (kanaMap_1.kanaMap[current]) {
                translated.push(kanaMap_1.kanaMap[current]);
            }
            prev = null;
        }
        else if (current === "ー") {
            // 長音の場合
            // prevとcurrentを同時に処理する
            translated.push(prev);
            const s = kanaMap_1.kanaMap[prev];
            if (s) {
                translated.push(s);
            }
            translated.push(current);
            translated.push(s);
            prev = null;
        }
        else {
            // 通常パターンの場合
            // prevだけ処理する
            translated.push(prev);
            if (kanaMap_1.kanaMap[prev]) {
                translated.push(kanaMap_1.kanaMap[prev]);
            }
            prev = current;
        }
    }
    return translated.join("");
};
exports.translate = translate;
