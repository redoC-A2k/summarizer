import express from 'express'
const router = express.Router()
import multer from 'multer'
const upload = multer()
// const pdfjs = require('pdfjs-dist');
import { PdfReader } from 'pdfreader'
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";
import { summaryModel } from '../models/summary.js'
// console.log(process.cwd()+'/.env')
dotenv.config({ path: `${process.cwd()}/.env` })

let prompt = `I want you to act as a text summarizer and provide a concise summary of a given article or text.
Your summary should accurately capture the main points and ideas of the original text.
Do not include your opinions or interpretations, just the key information and also the summary must be less than the text provided.
(Note : The text might contain parsing issues . for example there might be space between the letters of words , so make sure to remove the unnecessary spaces before summarizing.)
The text to summarize is - `

router.post("/api/pdf", upload.single('file'), async (req, res) => {
    console.log("request recieved");
    const { phone } = req.body;
    let filebuf = req.file.buffer;
    if (!filebuf || !phone)
        return res.json({ error: "One of the field is empty" })

    let text = []
    const configuration = new Configuration({
        apiKey: process.env.API_KEY,
    });
    const openai = new OpenAIApi(configuration)
    text.push(prompt)
    console.log(process.env.API_KEY)
    new PdfReader().parseBuffer(filebuf, (err, item) => {
        if (err) console.log("error : ", err)
        else if (!item) {
            console.warn("end of buffer")
            let joinedText = text.join(' ')
            console.log(joinedText)
            try {
                openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { "role": "user", "content": joinedText }
                    ],
                    temperature: 1,
                    max_tokens: 2548,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                }).then(response => {
                    let summary = response.data.choices[0].message.content
                    console.log(summary)
                    summaryModel.findOne({_id:Number(phone)})
                    .then((savedsummary) => {
                        console.log(err)
                        if (savedsummary) {
                            savedsummary.summary = summary;
                            savedsummary.save()
                            .then(()=>{
                                res.json({message: summary})
                            }).catch(err=>{
                                console.log("error in updating"+err)
                                res.json({error: "error in updating"})
                            })
                        } else {
                            const newSummary = new summaryModel({
                                _id: Number(phone),
                                summary: summary
                            })
                            newSummary.save()
                                .then(() => {
                                    res.json({ message: summary })
                                })
                                .catch(err => {
                                    console.log("error in saveing ", err)
                                })
                        }
                    })
                    .catch(err=>{
                        console.log("error in finding or saving"+err)
                        res.json({error:"error in finding or saving"})
                    })
                })
            } catch (error) {
                console.log("error occured " + error)
                res.json({error:"something went wrong"})
            }
        }
        else if (item.text) {
            let c = item.text
            text.push(c)
        }
    })
    // text = text.replaceAll(/\n/g,' ')
})

// module.exports = router
export { router }