"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/init.js
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const configData = `{
    "serverName":"ezyserv",
    "port":5400,
    "defaultRoute":"/",
    "defaultRouteMessage":"ezyserv is running",
    "invalidRouteMessage":"Route not exist",
    "routeFile":"./routes.json",
    "DocFile":"./docs.json",
    "dataDir":"./Data/"
}`;
const routesData = `{
    "/docs":"./docs.json",
    "/data":"./Data/data.json",
    "/route_name":"data file path (JSON)"
}`;
const dataSet = `[
    {
        "property":"value"
    },
    {
        "property":"value"
    }
]`;
const docData = `
{
 "Basic Routes":{
    "/":"default route",
    "*":"any other routes except defined ones"
 },
 "Custom Routes":{
    "/route_name":"route_description"
 }
}
`;
const createDataDir = () => {
    const makePath = path_1.default.join(process.cwd(), "Data");
    try {
        fs_1.default.mkdirSync(makePath, { recursive: true });
    }
    catch (error) {
        console.error("Failed to create data directory:", error);
        throw error;
    }
};
const createRoutes = () => {
    try {
        createDataDir();
        const DataPath = path_1.default.join(process.cwd(), "Data");
        const configFilePath = path_1.default.join(process.cwd(), "ezyserv-config.json");
        const routesFilePath = path_1.default.join(process.cwd(), "routes.json");
        const docsFilePath = path_1.default.join(process.cwd(), "docs.json");
        const dataFilePath = path_1.default.join(DataPath, "data.json");
        fs_1.default.writeFileSync(configFilePath, configData);
        fs_1.default.writeFileSync(routesFilePath, routesData);
        fs_1.default.writeFileSync(dataFilePath, dataSet);
        fs_1.default.writeFileSync(docsFilePath, docData);
        console.log("Setup Completed");
        console.log("customize and start the server !");
    }
    catch (error) {
        console.error("Error creating routes:", error);
    }
};
exports.default = createRoutes;
