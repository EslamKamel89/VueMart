import prisma from "~/utils/db";
import { signupSchema } from "~/utils/validation";
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    signupSchema.parse(body as any),
  );
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (user) {
    throw createError({
      statusCode: 400,
      statusMessage: "This email is already taken",
    });
  }
  const hashedPassword = await hashPassword(body.password!);
  const newUser = await prisma.user.create({
    data: {
      ...body,
      password: hashedPassword,
    },
  });
  await setUserSession(event, {
    user: sanitizeUser(newUser),
  });
  return sanitizeUser(newUser);
});
