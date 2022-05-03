const express = require("express");
const line = require("@line/bot-sdk");

const toHiragana = require("./util/toHiragana");
const translate = require("./util/translate");

const PORT = process.env.PORT || process.argv[2];
require("dotenv").config();

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const app = express();

app.get("/", (req, res) => res.send("Hello LINE BOT!(GET)")); 
app.post("/webhook", line.middleware(config), (req, res) => {
  console.log(req.body.events);

  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const res = await toHiragana(event.message.text);
  const { converted } = res.data;
  const replayText = translate(converted);

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replayText,
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
