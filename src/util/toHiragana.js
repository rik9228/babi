const axios = require("axios");
require("dotenv").config();

const APP_ID = process.env.APP_ID;
const OUTPUT_STYLE = "hiragana";
const BASE_URL = "https://labs.goo.ne.jp/api/hiragana";

const toHiragana = async (inputWord) => {
  try {
    const result = await axios.post(BASE_URL, {
      app_id: APP_ID,
      sentence: inputWord,
      output_type: OUTPUT_STYLE,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = toHiragana;