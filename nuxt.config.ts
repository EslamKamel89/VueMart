import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@prisma/nuxt",
    "@sidebase/nuxt-auth",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    baseURL: process.env.AUTH_ORIGIN || "http://localhost:3000",
    authSecret: "",
    githubId: "",
    githubSecret: "",
    googleId: "",
    googleSecret: "",
    authOrigin: "",
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN || "http://localhost:3000",
    originEnvKey: "AUTH_ORIGIN",
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/api/auth/login", method: "post" },
        signUp: { path: "/api/auth/register", method: "post" },
        signOut: { path: "/api/auth/logout", method: "post" },
        getSession: { path: "/api/auth/session", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/token",
      },
    },
  },
});
