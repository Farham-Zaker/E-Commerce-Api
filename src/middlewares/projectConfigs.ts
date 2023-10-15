import express, { Express } from "express";
import * as dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import oAuthSetup from "./../passport/oAuthGoogle";
import fileUpload from "express-fileupload";

export default async (server: Express) => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  dotenv.config();
  server.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
    })
  );

  server.use(passport.initialize());
  server.use(passport.session());
  oAuthSetup();

  server.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );
};
