#!/usr/bin/env node
import createRoutes from "./init";
import StartServer from "./server";
import readData from "./list";

const args = process.argv.slice(2);
const hasInitFlag = args.includes("--init");
const hasServeFlag = args.includes("--serve");
const hasDataFlag = args.includes("--data");
const hasHelpFlag = args.includes("--help") || args.includes("-h");

const helpMessage = `
ezyserv
(A lightweight quick API for developments)

[Flags]

--help , -h :- Help Command
--init      :- Initiate API
--serve     :- Start the server
--data      :- View data files

             Owned by DiyRex :)
`;

if (hasInitFlag && args[0] == "--init") {
  createRoutes();
  process.exit(0);
} else if (hasServeFlag && args[0] == "--serve") {
  try {
    StartServer();
  } catch (error) {
    console.log("Failed to start the server");
    console.log("Did you follow the documentation ?");
  }
} else if (hasDataFlag && args[0] == "--data") {
  readData((err, files) => {
    if (err) {
      console.error("Failed to retrive data");
      return;
    }
    if (files) {
      files.forEach((element) => {
        console.log(element);
      });
    } else {
      console.log("Data directory is Empty");
    }
  });
} else if (hasHelpFlag && (args[0] == "--help" || args[0] == "-h")) {
  console.log(helpMessage);
} else {
  console.log("No valid flag provided. Use --help or -h to get help.");
}
