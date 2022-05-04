import "dotenv/config";
import express from "express";
import {
  middleware,
  ClientConfig,
  MiddlewareConfig,
  WebhookEvent,
  Client,
} from "@line/bot-sdk";
import { toHiragana } from "./util/toHiragana";
import { translate } from "./util/translate";

const PORT = process.env.PORT || process.argv[2];

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET || "",
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET || "",
};

const app = express();

app.get("/", (req, res) => res.send("Hello LINE BOT!(GET)"));
app.post("/webhook", middleware(middlewareConfig), (req, res) => {
  console.log(req.body.events);

  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new Client(clientConfig);

async function handleEvent(event: WebhookEvent): Promise<any> {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const res = await toHiragana(event.message.text);
  if (res) {
    const { converted } = res.data;
    const replayText = translate(converted);
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: replayText,
    });
  } else {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "送信するメッセージには漢字・ひらがな・カタカナ以外の文字を含まないでください",
    });
  }
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);