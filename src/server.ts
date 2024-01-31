// src/index.js
import express, { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Routes } from "./types/Routes";
import { Json } from "./types/Json";

const StartServer = () => {
  //Load config file
  const configFilePath: string = path.join(
    process.cwd(),
    "ezyserv-config.json"
  );
  const configData = require(configFilePath);

  //Using interfaces
  const config: Json = configData;

  //Load custom route file
  const routerFilePath: string = path.join(process.cwd(), config["routeFile"]);
  const routesData = require(routerFilePath);
  const routes: Routes = routesData;

  const app: Express = express();
  const port = config["port"] || 3200;

  //Default Route
  app.get(`${config["defaultRoute"]}`, (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: config["defaultRouteMessage"],
    });
  });

  //Loop through routes in routes.json
  for (const route in routes) {
    app.get(`${route}`, (req: Request, res: Response) => {
      const filePath = path.join(process.cwd(), routes[route]);

      // Read and send the JSON file contents
      fs.readFile(filePath, "utf8", (err, data) => {
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
        } catch (parseError) {
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
  app.get("*", (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: config["invalidRouteMessage"],
    });
  });

  //Listening to defined port
  app.listen(port, () => {
    console.log(
      `[${config["serverName"]}]: 
Server is running at http://localhost:${port}`
    );
  });
};

export default StartServer;
