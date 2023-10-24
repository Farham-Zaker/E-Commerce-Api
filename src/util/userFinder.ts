import prismaService from "../prisma/prismaService";
import validator from "validator";

async function userFinder(phoneOrEmail: string) {
  if (validator.isEmail(phoneOrEmail)) {
    const user = await prismaService.users.findFirst({
      where: { email: phoneOrEmail },
      include: { auth: true },
    });
    return user;
  } else {
    const user = await prismaService.users.findFirst({
      where: { phone: phoneOrEmail },
      include: { auth: true },
    });
    return user;
  }
}

export default userFinder;
