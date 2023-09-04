import express, { Express } from 'express';
const server: Express = express();

import projectConfigs from './middlewares/projectConfigs';
projectConfigs(server)

server.get('/', () =>{
console.log("first")
})

import config from './config/config';

const port: number = config.port;
server.listen(port, (): void => {
  console.log(`The server is listening on port ${port}`);
});
