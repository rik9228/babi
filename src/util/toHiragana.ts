import "dotenv/config";
import axios, { AxiosResponse } from "axios";
import { isJapanese } from "./isJapanese";

type hiraganaResponse = {
  converted: string;
  output_type: string;
  request_id: string;
};

const APP_ID: string | undefined = process.env.APP_ID;
const OUTPUT_STYLE: string = "hiragana";
const BASE_URL: string = "https://labs.goo.ne.jp/api/hiragana";

export const toHiragana = async (
  inputWord: string
): Promise<AxiosResponse<hiraganaResponse> | undefined> => {
  try {
    if (isJapanese(inputWord)) {
      const result = await axios.post(BASE_URL, {
        app_id: APP_ID,
        sentence: inputWord,
        output_type: OUTPUT_STYLE,
      });
      return result;
    }
  } catch (error) {
    console.error(error);
  }
};
