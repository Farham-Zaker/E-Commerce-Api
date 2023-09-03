import express, { Express } from "express";

import * as dotenv from "dotenv"
dotenv.config()

export default (server: Express) => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
};
