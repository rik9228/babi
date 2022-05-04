import "dotenv/config";
import { AxiosResponse } from "axios";
declare type hiraganaResponse = {
    converted: string;
    output_type: string;
    request_id: string;
};
export declare const toHiragana: (inputWord: string) => Promise<AxiosResponse<hiraganaResponse> | undefined>;
export {};
//# sourceMappingURL=toHiragana.d.ts.map