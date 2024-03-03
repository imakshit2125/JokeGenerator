import { ChatOpenAI } from "@langchain/openai";

import * as dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 1000,
    verbose: true,
});

const ans = await model.invoke("hello");
console.log(ans);