import express, { Express } from "express";

export default (server: Express) => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
};
