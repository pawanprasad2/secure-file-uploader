const express =require("express")

const router= express.Router()
const upload =require('../config/multer.config')

router.get('/',(req,res)=>{
    res.render("home")
})

router.post('/upload', upload.single("file") , (req,res)=>{
    if(!req.file){
        return res.status(400).send("no files uploaded")
    }
 
    console.log(req.file);
 res.send(req.file)   
    
})



module.exports=router