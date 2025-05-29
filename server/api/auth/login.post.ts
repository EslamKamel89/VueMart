import prisma from "~/utils/db";
import { loginSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    loginSchema.parse(body as any),
  );
  const user = await prisma.user.findUnique({
    where: { email: body?.email },
  });
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email or password",
    });
  }
  const isPasswordValid = await verifyPassword(user?.password!, body.password);
  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email or password",
    });
  }
  await setUserSession(event, {
    user: sanitizeUser(user),
  });
  return sanitizeUser(user);
});
