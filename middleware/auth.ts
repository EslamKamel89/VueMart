export default defineNuxtRouteMiddleware((to, from) => {
  const session = useUserSession();
  if (!session.user.value && to.path !== "/auth/login") {
    return navigateTo("/auth/signin");
  }

  //   if (to.path !== "/") {
  //     return navigateTo("/");
  //   }
});
