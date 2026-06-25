import OpenAI from "openai";
import { createReadStream,writeFileSync } from "fs";
import dotenv from "dotenv";
import express from 'express';
import multer from "multer";
import path from "path";

dotenv.config();
const app = express();
const client = new OpenAI({
    apiKey: process.env.OPENAI_SECRET
});


app.get('/',(req,res)=>{
    res.send(`<form action='/upload' method='POST' enctypr='multipart/form-data'>
        <input type='file' name='audio' />
        <button>Upload File</button>
        </form> `)
});

const storage =  multer.diskStorage({
    diskStorage: '/uploads',
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname);
        cb(null,file.fieldname+ext)
    }
})

const upload = multer({storage})

app.post('/upload',upload.single('audio'),async(req,res)=>{
    const filepath = req.file.filepath;

    const response = await client.audio.transcriptions.create({
        model:'whisper-1',
        file:createReadStream(filepath),
        language:'en'
    })
    console.log(response.text);
    const rawText = response.text;
    writeFileSync('audioText.txt',rawText,'utf-8');
    res.send(`<h1>{rawText}</h1>`)
});


app.listen(8080,()=>{
    console.log('your app is listening at port 8080');
})

