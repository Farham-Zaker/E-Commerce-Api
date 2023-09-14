import bcrypt from "bcrypt";
const bcryptSalt: string | undefined = process.env.BCRYPT_SALT;

export default async function passwordValidator(
  userInputPassword: string,
  userPassword: string
) {
  try {
    if (typeof bcryptSalt === "string") {
      const validate = await bcrypt.compare(userInputPassword, userPassword);
      return validate
    } else {
      throw new Error("Bcrypt salt is not a valid string.");
    }
  } catch (error) {
  }
}
