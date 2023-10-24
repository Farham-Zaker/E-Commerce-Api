import jwt from "jsonwebtoken";

export default function generateToken(userId: string): string  {
  const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY;

  if (typeof JWT_SECRET_KEY === "string") {
    const token: string = jwt.sign({ userId }, JWT_SECRET_KEY, {
      expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30 * 3,
    });
    return token;
  } else {
    throw new Error("JWT secrete key is not a valid string.");
  }
}
