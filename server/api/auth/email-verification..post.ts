import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  const { otp, email } = await readBody<{
    otp?: string | null;
    email?: string | null;
  }>(event);
  if (!otp || !email) {
    throw createError({
      statusCode: 401,
      statusMessage: "Email or OTP is missing",
    });
  }
  let user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "We don't have a user with this email",
    });
  }
  if (user?.otpCode != otp) {
    throw createError({
      statusCode: 401,
      statusMessage: "OTP is incorrect",
    });
  } else {
    user = await prisma.user.update({
      where: { email: email },
      data: { verifiedAt: new Date() },
    });
    await setUserSession(event, {
      user: sanitizeUser(user),
    });
    return sanitizeUser(user);
  }
});
