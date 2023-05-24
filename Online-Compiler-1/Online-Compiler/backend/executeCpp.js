const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

// Check if output directory exists synchronously
if (!fs.existsSync(outputPath)) {
  // Create directory synchronously
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);
  return new Promise((resolve, reject) => {
    exec(
      `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && "${jobId}.out"`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        // Error output
        if (stderr) {
          reject(stderr);
        }
        // Standard output
        else{
        resolve(stdout);
        fs.unlinkSync(outPath);
        }
      }
    );
  });
};

module.exports = {
  executeCpp,
};
