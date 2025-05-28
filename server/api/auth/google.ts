import { sanitizeUser } from "~/server/utils/auth";
import prisma from "~/utils/db";

export default defineOAuthGoogleEventHandler({
  config: {
    // emailRequired: true,
    clientId: useRuntimeConfig().googleId,
    clientSecret: useRuntimeConfig().googleSecret,
    // redirectURL: "http://localhost:3000/",
  },
  async onSuccess(event, { user, tokens }) {
    let currentUser = await prisma.user.findUnique({
      where: { email: user.email! },
    });
    if (currentUser) {
      let authAccount = await prisma.authAccount.findFirst({
        where: {
          userId: currentUser.id,
          AND: {
            providerId: "google",
          },
        },
      });
      if (!authAccount) {
        authAccount = await prisma.authAccount.create({
          data: {
            userId: currentUser.id,
            providerId: "google",
            providerUserId: user.id + "",
          },
        });
      }
    } else {
      currentUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email!,
          avatarUrl: user.avatar_url,
          authAccounts: {
            create: {
              providerId: "google",
              providerUserId: user.id + "",
            },
          },
        },
      });
    }
    await setUserSession(event, {
      user: sanitizeUser(currentUser),
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
