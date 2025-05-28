export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
    clientId: useRuntimeConfig().githubId,
    clientSecret: useRuntimeConfig().githubSecret,
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user,
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
