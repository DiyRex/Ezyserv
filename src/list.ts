// src/list.js
import path from "path";
import fs from "fs";

const readData = (
  callback: (err: NodeJS.ErrnoException | null, files?: string[]) => void
): void => {
  const directoryPath = path.join(process.cwd(), "Data");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      callback(err);
      return;
    }

    const jsonFiles = files.filter((file) => path.extname(file) === ".json");
    callback(null, jsonFiles);
  });
};

export default readData;
