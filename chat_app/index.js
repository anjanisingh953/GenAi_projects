import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();


const client = new OpenAI({
    apiKey: process.env.OPENAI_SECRET
});

async function askQuestion(ques) {
    const response = await client.responses.create({
        input: ques,
        model: 'gpt-4o-mini'
    });

    console.log(response.output_text);
}


// askQuestion();

process.stdout.write('Ask your question: ')
process.stdin.on("data", (data) => {
    // console.log(data.toString().trim())
    const ques = data.toString().trim();
    if (ques == 'exit') {
        process.exit()
    } else {
        askQuestion(ques);
    }
})