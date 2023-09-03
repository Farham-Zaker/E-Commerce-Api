import express, { Express } from 'express';
const server: Express = express();

const port: Number = 7000;
server.listen(port, (): void => {
  console.log(`The server is listening on port ${port}`);
});
