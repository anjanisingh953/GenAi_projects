import OpenAI from "openai";
import { createReadStream,writeFileSync } from "fs";
import dotenv from "dotenv";
import express from 'express';
import path from "path";

dotenv.config();
const app = express();
app.use(express.urlencoded({extended:true}))
const client = new OpenAI({
    apiKey: process.env.OPENAI_SECRET
});


app.get('/',(req,res)=>{
    res.send(`<form action='/audio' method='POST'>
        <input type='text' name='inputData' />
        <br />
        <br />
        <button>Convert Text in Audio</button>
        </form> `)
});


app.post('/audio',async(req,res)=>{

    const response = await client.audio.speech.create({
        model:'gpt-4o-mini-tts',
        input:req.body.inputData,
        voice:'coral'
    })

    const baseResponse = Buffer.from(await response.arrayBuffer())
    writeFileSync('audio.mp3',baseResponse)
    res.send("text converted to audio") 
});


app.listen(8080,()=>{
    console.log('your app is listening at port 8080');
})

