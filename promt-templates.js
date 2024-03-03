import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import * as dotenv from "dotenv";
dotenv.config();

// Create Model 

const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temeperature: 0.7,
})

// 
const prompt = ChatPromptTemplate.fromTemplate(
    "You are a Comedian. Tell a Joke based on the following word {input}"
);

console.log(await prompt.format({input: "dog"}));

//create a chain -> combine prompt and model 
const chain = prompt.pipe(model);

//call chain 
const ans  = await  chain.invoke({
    input: "dog",
})

console.log(ans);

