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
  let user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.otpCode != otp) {
    throw createError({
      statusCode: 401,
      statusMessage: "OTP is incorrect",
    });
  } else {
    user = await prisma.user.update({
      where: { id: session.user.id },
      data: { verifiedAt: new Date() },
    });
    await setUserSession(event, {
      user: sanitizeUser(user),
    });
    return sanitizeUser(user);
  }
});
