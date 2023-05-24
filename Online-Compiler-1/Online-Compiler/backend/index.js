const express=require('express');
const cors=require("cors");
const {generateFile}=require('./generateFile');
const app=express();
const fs=require("fs");
app.use(cors());
const {executeCpp}=require("./executeCpp");
const {executeJava}=require("./executeJava");
const {executePy}=require("./executePy");
const {getClassName}=require("./getClassName");
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.get('/',(req,res)=>{
     return res.json({hello:"world"});
});

app.post('/run',async(req,res)=>{

    const {language="cpp",code}=req.body;
    // console.log(language,code.length);
    if(code===undefined){
        return res.status(400).json({success:false,error:"Empty Code Body"});
    
    }
    
    let filepath;
    try{
    // need to generate a c++ file with content from the request
        filepath=await generateFile(language,code);
    // we need to run the file and send the response
    let output;
    if(language==="cpp"){
        
      output=await executeCpp(filepath);
    }
    else if(language=="java"){
        const className=await getClassName(code);
        // console.log(className);
        output=await executeJava(filepath,className);
    }
    else{
     output=await executePy(filepath);
    }
         res.json({output});
        fs.unlinkSync(filepath);
    } catch(err){
        console.log(err);
        fs.unlinkSync(filepath);
        res.status(500).json({err});
      
    }
});

app.listen(7000,()=>{
    console.log('Listening on port 7000!');
});