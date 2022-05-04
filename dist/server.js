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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const bot_sdk_1 = require("@line/bot-sdk");
const toHiragana_1 = require("./util/toHiragana");
const translate_1 = require("./util/translate");
const PORT = process.env.PORT || process.argv[2];
const clientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.CHANNEL_SECRET || "",
};
const middlewareConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.CHANNEL_SECRET || "",
};
const app = (0, express_1.default)();
app.get("/", (req, res) => res.send("Hello LINE BOT!(GET)"));
app.post("/webhook", (0, bot_sdk_1.middleware)(middlewareConfig), (req, res) => {
    console.log(req.body.events);
    Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result));
});
const client = new bot_sdk_1.Client(clientConfig);
function handleEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (event.type !== "message" || event.message.type !== "text") {
            return Promise.resolve(null);
        }
        const res = yield (0, toHiragana_1.toHiragana)(event.message.text);
        if (res) {
            const { converted } = res.data;
            const replayText = (0, translate_1.translate)(converted);
            return client.replyMessage(event.replyToken, {
                type: "text",
                text: replayText,
            });
        }
    });
}
app.listen(PORT);
console.log(`Server running at ${PORT}`);
