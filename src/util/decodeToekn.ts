import jwt, { JwtPayload } from "jsonwebtoken";

export default function decodeToken(token: string): DecodeTokenFunctionTypes {
  const jwtSecretKey: string = process.env.JWT_SECRET_KEY!;
  if (jwtSecretKey) {
    try {
      const decodedToken: JwtPayload = jwt.verify(
        token,
        jwtSecretKey
      )! as JwtPayload;

      if (decodedToken) {
        return {
          userId: decodedToken.userId,
        };
      } else {
        return null;
      }
    } catch (error) {
        return null
    }
  } else {
    return null;
  }
}
type DecodeTokenFunctionTypes = {
  userId: string;
} | null;
