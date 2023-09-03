import express, { Express } from "express";
import * as dotenv from "dotenv";

export default (server: Express) => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  dotenv.config();
};
