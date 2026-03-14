const express=require("express")
const multer=require("multer")
const pdfParse=require("pdf-parse")
const fs=require("fs")

const app=express()

const upload=multer({dest:"uploads/"})

app.use(express.static("public"))

app.post("/analyze",upload.single("resume"),async(req,res)=>{

let dataBuffer=fs.readFileSync(req.file.path)

let data;

try {
data = await pdfParse(dataBuffer)
} catch (err) {
return res.json({
score:0,
suggestions:"Unable to read this PDF. Please upload another resume."
})
}

let text=data.text.toLowerCase()

let score=50

if(text.includes("experience")) score+=10
if(text.includes("skills")) score+=10
if(text.includes("project")) score+=10
if(text.includes("education")) score+=10
if(text.includes("achievement")) score+=10

let suggestions=[]

if(!text.includes("skills"))
suggestions.push("Add a skills section")

if(!text.includes("project"))
suggestions.push("Add project experience")

if(!text.includes("achievement"))
suggestions.push("Add achievements")

if(!text.includes("experience"))
suggestions.push("Add work experience")

res.json({
score:score,
suggestions:suggestions.join("<br>")
})

})

app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
})