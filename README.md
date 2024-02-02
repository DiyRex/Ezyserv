# Ezyserv

[![npm version](https://badge.fury.io/js/ezyserv.svg)](https://www.npmjs.com/package/ezyserv)

Create custom backend APIs effortlessly, for frontend developers.

## Installation

```bash
npm install -g ezyserv
```
You must install ezyserv globally to use it as a command-line tool.

## Usage

After installation, you can use the following command to verify that ezyserv is installed correctly:

```bash
ezyserv -h
```

#### Create an API

- Create a directory 
```bash
mkdir <folderName>
cd <foldername>
```

(all commands should run inside the created directory)

- Initiate ezyserv

```
ezyserv --init
```

- Update necessary data in ezyserv.config.json
- Add nessary routes along with their data json file paths
- Add whatever data set you need to serve to json files in ./Data
- Then start server using,
```
ezyserv --serve
```

#### List data files inside ./Data
```
ezyserv --data
```

## Features
+ Serve data using GET method (currently)
+ Can customize routes and data easily

## Upcoming Features
+ Handle POST, PUT, DELETE methods
+ Implement database

## Dependencies
ezyserv uses the following dependencies:

+ express

## Author
- [DiyRex](https://github.com/DiyRex)

## License
This project is licensed under the MIT License
