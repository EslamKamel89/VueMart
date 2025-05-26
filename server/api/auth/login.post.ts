import bcrypt from "bcrypt";
import prisma from "~/utils/db";
import { loginSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const body = await loginSchema.parse(await readBody(event));
  if (body.errors.length) return body.errors;
  const user = await prisma.user.findUnique({
    where: { email: body.value?.email },
  });
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(
    body.value!.password,
    user?.password!,
  );
  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email or password",
    });
  }
  return user;
});
