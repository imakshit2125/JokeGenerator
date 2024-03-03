// server.js
import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Create Model
const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temeperature: 0.7,
});

// Define a route to generate jokes
app.get('/joke', async (req, res) => {
    try {

        const query = req.query.input || "dog";

        const prompt = ChatPromptTemplate.fromTemplate(
            "You are a Comedian. Tell a Joke based on the following word {input}"
        );

        const chain = prompt.pipe(model);

        const ans = await chain.invoke({
            input: query,
        });

        res.json({ joke: ans.content });
        //  console.log(res.json());
         console.log(ans.content);
    } catch (error) {
        console.error('Error generating joke:', error);
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the index.html file
app.use(express.static('./'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
