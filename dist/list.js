"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/list.js
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const readData = (callback) => {
    const directoryPath = path_1.default.join(process.cwd(), "Data");
    fs_1.default.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            callback(err);
            return;
        }
        const jsonFiles = files.filter((file) => path_1.default.extname(file) === ".json");
        callback(null, jsonFiles);
    });
};
exports.default = readData;
