import dotenv from 'dotenv'
import { GoogleGenAI } from "@google/genai";
dotenv.config();

const googleAI = new GoogleGenAI({ apiKey: process.env.GEMINI_SECRET });

async function main() {
    const response = await googleAI.models.generateContent({
        model:'gemini-2.5-flash',
        contents:'Tell me about AI in details',
        // config:{
        //     temperature:1.7,
        //     thinkingConfig:{
        //         includeThoughts:true
        //     },
        //     systemInstruction:"give simple answer within 100 words"
        // }
    })

    // console.log(response.text); 
    // It will stream the content 
        for await(const chunks of response){
            const text = chunks.text;
            console.log(text)     
        }


}

main();
