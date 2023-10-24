import bcrypt from "bcrypt"

const salt: string | undefined = process.env.BCRYPT_SALT;

async function hashPassword(userPassword: string): Promise<string> {
  if (salt !== undefined) {
    return await bcrypt.hash(userPassword, salt);
  } else {
    throw new Error("Unexpected error in hashing password.");
  }
}

export default hashPassword
