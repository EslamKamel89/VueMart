import prisma from "~/utils/db";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
    clientId: useRuntimeConfig().githubId,
    clientSecret: useRuntimeConfig().githubSecret,
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
            providerId: "github",
          },
        },
      });
      if (!authAccount) {
        authAccount = await prisma.authAccount.create({
          data: {
            userId: currentUser.id,
            providerId: "github",
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
              providerId: "github",
              providerUserId: user.id + "",
            },
          },
        },
      });
    }
    await setUserSession(event, {
      user: currentUser,
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
