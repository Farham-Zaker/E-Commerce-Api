import jwt from "jsonwebtoken";

export default function generateToken(userId: string): string  {
  const jwt_secret_key: string | undefined = process.env.JWT_SECRET_KEY;

  if (typeof jwt_secret_key === "string") {
    const token: string = jwt.sign({ userId }, jwt_secret_key, {
      expiresIn: Date.now() + 100 * 60 * 60 * 24 * 30 * 3,
    });
    return token;
  } else {
    throw new Error("JWT secrete key is not a valid string.");
  }
}
