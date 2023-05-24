const {exec}=require('child_process');
const fs=require("fs");
const executePy=(filepath)=>{
  console.log(filepath);
    return new Promise((resolve,reject)=>{
      exec(
        `python3 "${filepath}"`,
      (error,stdout,stderr)=>{

        if(error){
            reject({error ,stderr});
        }
        else if(stderr){
            reject (stderr);
        }
        else {resolve(stdout);
          // fs.unlinkSync(filepath);
        }
      }
      );
    });
};

module.exports ={
    executePy,
};