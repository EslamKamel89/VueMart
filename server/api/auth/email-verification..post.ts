import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const { otp } = await readBody<{ otp?: string | null }>(event);
  if (!otp) {
    throw createError({
      statusCode: 401,
      statusMessage: "OTP is recieved",
    });
  }
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
});
