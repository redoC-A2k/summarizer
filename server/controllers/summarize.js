import express from 'express'
const router = express.Router()
import multer from 'multer'
const upload = multer()
// const pdfjs = require('pdfjs-dist');
// import {PdfReader} from 'pdfreader'
import PDFParser from "pdf2json";
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()


function toArrayBuffer(buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return arrayBuffer;
  }
  
router.post("/api/pdf",upload.single('file'), async (req,res)=>{
    console.log("request recieved");
    console.log(req.body)
    let filebuf = req.file.buffer;
    // let { PdfReader } = await import("pdfreader/index.js")
    // new PdfReader().parseBuffer(filebuf,(err,item)=>{
    //     if(err) console.log("error : ",err)
    //     else if(!item) console.warn("end of buffer")
    //     else if(item.text) console.log(item.text);
    // })

    // const pdf = await pdfjs.getDocument({data : toArrayBuffer(filebuf)})
    // console.log(pdf)

    let parser = new PDFParser()
    parser.parseBuffer(filebuf)
    parser.on("readable", meta => console.log("PDF Metadata", meta) );
    parser.on("data", page => console.log(page ? "One page paged" : "All pages parsed"));
    parser.on("error", err => console.error("Parser Error", err));
    parser.on("pdfParser_dataReady", pdfData => {
        console.log(pdfData.Pages[0].Texts)
        fs.writeFile("./content.txt", parser.getRawTextContent(), ()=>{console.log("Done.");});
        console.log(parser.getRawTextContent())
    });


    res.json({message:"Request recieved sucessfully"})
})

// module.exports = router
export default router