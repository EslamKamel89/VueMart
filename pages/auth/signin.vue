<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { User } from "~/types/db";
definePageMeta({
  layout: "auth",
});
useSeoMeta({
  title: "Sign In to Your Account | VueMart",
  description:
    "Log in to your account to access exclusive offers, track orders, and manage your wishlist.",
  ogTitle: "Sign In | VueMart",
  ogDescription:
    "Log in to your account to access exclusive offers, track orders, and manage your wishlist.",
  // ogImage: "/og-login.png",
  // ogUrl: "https://yourwebsite.com/login ",
  ogType: "website",
  twitterTitle: "Sign In | VueMart",
  twitterDescription:
    "Log in to your account to access exclusive offers, track orders, and manage your wishlist.",
  // twitterImage: "/og-login.png",
  twitterCard: "summary_large_image",
});
useHead({
  title: "Sign In | VueMart",
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#ffffff" },
  ],
});
const loginLoading = ref(false);

const { isFieldDirty, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(loginSchema),
});
const { fetch } = useUserSession();
const authStore = useAuthStore();
const handleSumbit = handleSubmit(async (values) => {
  pr(values, "login form - handleSubmit");
  authStore.updateUserEmail(values.email);
  try {
    loginLoading.value = true;
    const user = await $fetch<User>("/api/auth/login", {
      body: values,
      method: "POST",
    });
    pr(user, "user");
    if (user) {
      showSuccessToaster({
        title: "Success",
        description: "Your logged in your account successfully",
      });
      resetForm();
      await fetch();
      await navigateTo("/");
    } else {
      showErrorToaster({
        title: "Error",
        description: "Unknown error occured",
      });
    }
  } catch (error) {
    handleApiError(error);
  } finally {
    loginLoading.value = false;
  }
});
</script>
<template>
  <div class="w-full max-w-md space-y-8">
    <!-- Title -->
    <div class="text-center">
      <SharedLogo :h="100" />
      <p class="text-muted-foreground mt-2 text-sm dark:text-gray-400">
        Sign in to your account
      </p>
    </div>

    <!-- Card -->
    <Card class="w-full bg-white shadow-lg dark:bg-gray-900">
      <CardHeader>
        <CardTitle class="text-xl dark:text-white">Login</CardTitle>
        <CardDescription class="dark:text-gray-400">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <!-- Form -->
      <CardContent>
        <form @submit.prevent="handleSumbit" class="space-y-4">
          <SharedInputField
            id="email"
            label="Email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />

          <SharedInputField
            id="password"
            label="Password"
            name="password"
            placeholder="••••••••"
            type="password"
          />

          <div class="flex w-full justify-between">
            <SharedCheckboxFiled
              id="remember"
              name="remember"
              label="Remeber me"
            />
            <a
              href="#"
              class="text-primary text-sm underline-offset-4 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <Button type="submit" class="w-full" :disabled="loginLoading">
            <Icon v-if="loginLoading" name="eos-icons:bubble-loading" />
            Sign In</Button
          >
        </form>
      </CardContent>

      <CardFooter>
        <AuthSocial />
      </CardFooter>
    </Card>

    <!-- Footer -->
    <p class="text-muted-foreground text-center text-sm dark:text-gray-400">
      Don't have an account?
      <NuxtLink
        to="/auth/signup"
        class="hover:text-primary underline underline-offset-4 dark:hover:text-blue-400"
      >
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>
