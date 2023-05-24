const fs=require("fs");
const path=require("path");
const {v4 : uuid}=require("uuid");
const dirCodes=path.join(__dirname,"codes");


//  to create codes folder if it do not exists
//  exist sync to check if file exists or not
if(!fs.existsSync(dirCodes)){
    // mkdirSync to create new file
    fs.mkdirSync(dirCodes,{recursive:true});
}

const generateFile=async(format,content)=>{
         const jobId=uuid();
         const filename=`${jobId}.${format}`;
         const filePath=path.join(dirCodes,filename);
        //  writefilesync to create new file in codes folder
         await fs.writeFileSync(filePath,content);
         return filePath;
}

module.exports={
    generateFile,
};