"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHiragana = void 0;
require("dotenv/config");
const axios_1 = __importDefault(require("axios"));
const APP_ID = process.env.APP_ID;
const OUTPUT_STYLE = "hiragana";
const BASE_URL = "https://labs.goo.ne.jp/api/hiragana";
const toHiragana = (inputWord) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield axios_1.default.post(BASE_URL, {
            app_id: APP_ID,
            sentence: inputWord,
            output_type: OUTPUT_STYLE,
        });
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
exports.toHiragana = toHiragana;
