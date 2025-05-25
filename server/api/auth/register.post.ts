import prisma from "~/utils/db";
import { signupSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const body = await signupSchema.parse(await readBody(event));
  if (body.errors.length) return body.errors;
  const user = await prisma.user.findUnique({
    where: { email: body.value?.email },
  });
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "User with this credentials doesn't exist",
    });
  }
  return body.value;
});
