import OpenAI from "openai";
import {writeFileSync} from 'fs'
import dotenv from "dotenv";
dotenv.config();


const client = new OpenAI({
    apiKey: process.env.OPENAI_SECRET
});

async function imageGenerator() {
    const response = await client.images.generate({
        prompt:'generate image for a cat in a bus',
        // model:'dall-e-2',
        // size:'512x512',
        model:'gpt-image-1',
        n:1
    })

    console.log(response.output_text);
    const rawImage = response.data[0].b64_json;

    const path = './generatedImg.png';
    const buffer = Buffer.from(rawImage, 'base64');

    writeFileSync(path,buffer)
}


// imageGenerator();
