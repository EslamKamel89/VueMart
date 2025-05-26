import prisma from "~/utils/db";
import { signupSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const body = await signupSchema.parse(await readBody(event));
  if (body.errors.length) return body.errors;
  const user = await prisma.user.findUnique({
    where: { email: body.value?.email },
  });
  if (user) {
    throw createError({
      statusCode: 400,
      statusMessage: "This email is already taken",
    });
  }
  const newUser = prisma.user.create({
    data: body.value!,
  });
  return newUser;
});
