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
    // "@sidebase/nuxt-auth",
    "@prisma/nuxt",
    "nuxt-auth-utils",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    sessionPassword: "",
    githubId: "",
    githubSecret: "",
    googleId: "",
    googleSecret: "",
    public: {
      githubRedirectUrl: "",
      googleRedirectUrl: "",
    },
  },
});
