import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../config/config";
import prismaService from "../prisma/prismaService";
import {
  RegisterUserDataTypes,
  GoogleAuthSuccessResponseTypes,
} from "./../interfaces/auth.interface";
import generateToken from "../middlewares/generateToken";
export default async function oAuthGoogle() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_OAUTH_SECRET_KEY as string,
        callbackURL: config.googleAuthCallbackUrl,
      },
      async (accessToke, refreshToken, profile: any, done: any) => {
        try {
          const userLoggedIn = {
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile._json.email,
            image: profile._json.picture || "",
          };

          const user: RegisterUserDataTypes | null =
            await prismaService.users.findFirst({
              where: {
                email: userLoggedIn.email,
              },
            });

          if (user) {
            const token = generateToken(user.userId);
            const successMessage: GoogleAuthSuccessResponseTypes = {
              message: "ok",
              statusCode: 200,
              response: "Login successfully.",
              token,
            };
            return done(null, successMessage);
          } else {
            const createdUser: RegisterUserDataTypes =
              await prismaService.users.create({
                data: {
                  firstName: userLoggedIn.firstName,
                  lastName: userLoggedIn.lastName,
                  email: userLoggedIn.email,
                  image: userLoggedIn.image,
                  phone: "",
                  auth: {
                    create: {
                      password: "",
                      token: "",
                    },
                  },
                },
              });
            const token = generateToken(createdUser.userId);
            await prismaService.auth.update({
              data: { token },
              where: { userId: createdUser.userId },
            });
            const successMessage: GoogleAuthSuccessResponseTypes = {
              message: "Created",
              statusCode: 201,
              response: "The account has been successfully created.",
              token,
            };
            return done(null, successMessage);
          }
        } catch (error) {
          throw new Error(
            "An error occurred during Google OAuth authentication:" + error
          );
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    return cb(null, user);
  });

  passport.deserializeUser((user: any, cb) => {
    return cb(null, user);
  });
}
