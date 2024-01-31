"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const StartServer = () => {
    //Load config file
    const configFilePath = path_1.default.join(process.cwd(), "ezyserv-config.json");
    const configData = require(configFilePath);
    //Using interfaces
    const config = configData;
    //Load custom route file
    const routerFilePath = path_1.default.join(process.cwd(), config["routeFile"]);
    const routesData = require(routerFilePath);
    const routes = routesData;
    const app = (0, express_1.default)();
    const port = config["port"] || 3200;
    //Default Route
    app.get(`${config["defaultRoute"]}`, (req, res) => {
        res.status(200).json({
            success: true,
            message: config["defaultRouteMessage"],
        });
    });
    //Loop through routes in routes.json
    for (const route in routes) {
        app.get(`${route}`, (req, res) => {
            const filePath = path_1.default.join(process.cwd(), routes[route]);
            // Read and send the JSON file contents
            fs_1.default.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    // Handle file read error
                    console.error(err);
                    return res.status(500).json({
                        success: false,
                        message: "Error reading file",
                    });
                }
                try {
                    // Parse and send the JSON data
                    const jsonData = JSON.parse(data);
                    res.status(200).json({
                        success: true,
                        data: jsonData,
                    });
                }
                catch (parseError) {
                    // Handle JSON parsing error
                    console.error(parseError);
                    res.status(500).json({
                        success: false,
                        message: "Error parsing JSON",
                    });
                }
            });
        });
    }
    //Any other routes (404)
    app.get("*", (req, res) => {
        res.status(404).json({
            success: false,
            message: config["invalidRouteMessage"],
        });
    });
    //Listening to defined port
    app.listen(port, () => {
        console.log(`[${config["serverName"]}]: 
Server is running at http://localhost:${port}`);
    });
};
exports.default = StartServer;
