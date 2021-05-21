const path = require("path");
const fs = require("fs");

const distCleaner = () => {
  const outDir = "dist";
  try {
    if (fs.statSync(outDir).isDirectory()) {
      console.log("dist found. Cleaning...");
      const files = fs.readdirSync(outDir);
      files.forEach((file, index) => {
        const filePath = `${outDir}/${file}`;
        fs.unlinkSync(filePath);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

distCleaner();
