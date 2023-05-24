const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "outputs");
console.log(outputPath);

// Synchronously check the existence of the output directory
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, className) => {
  return new Promise((resolve, reject) => {
    exec(`javac "${filepath}" -d "${outputPath}"`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else if (stderr) {
        reject(stderr);
      } else {
        exec(`java -cp "${outputPath}" ${className}`, (error, stdout, stderr) => {
          if (error) {
            reject({ error, stderr });
          } else if (stderr) {
            reject(stderr);
          } else {
            resolve(stdout);
            // delete output file
            const classFile = path.join(outputPath, `${className}.class`);
            fs.unlinkSync(classFile);
          }
        });
      }
    });
  });
};

module.exports = {
  executeJava,
};
