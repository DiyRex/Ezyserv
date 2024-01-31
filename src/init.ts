// src/init.js
import fs from "fs";
import path from "path";

const configData: string = `{
    "serverName":"ezyserv",
    "port":5400,
    "defaultRoute":"/",
    "defaultRouteMessage":"ezyserv is running",
    "invalidRouteMessage":"Route not exist",
    "routeFile":"./routes.json",
    "DocFile":"./docs.json",
    "dataDir":"./Data/"
}`;

const routesData: string = `{
    "/docs":"./docs.json",
    "/data":"./Data/data.json",
    "/route_name":"data file path (JSON)"
}`;

const dataSet: string = `[
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
  const makePath = path.join(process.cwd(), "Data");
  try {
    fs.mkdirSync(makePath, { recursive: true });
  } catch (error) {
    console.error("Failed to create data directory:", error);
    throw error;
  }
};

const createRoutes = () => {
  try {
    createDataDir();
    const DataPath = path.join(process.cwd(), "Data");
    const configFilePath = path.join(process.cwd(), "ezyserv-config.json");
    const routesFilePath = path.join(process.cwd(), "routes.json");
    const docsFilePath = path.join(process.cwd(), "docs.json");
    const dataFilePath = path.join(DataPath, "data.json");
    fs.writeFileSync(configFilePath, configData);
    fs.writeFileSync(routesFilePath, routesData);
    fs.writeFileSync(dataFilePath, dataSet);
    fs.writeFileSync(docsFilePath, docData);
    console.log("Setup Completed");
    console.log("customize and start the server !");
  } catch (error) {
    console.error("Error creating routes:", error);
  }
};

export default createRoutes;
