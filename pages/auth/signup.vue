<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

definePageMeta({
  layout: "auth",
});
useSeoMeta({
  title: "Create Your Account | VueMart",
  description:
    "Join VueMart today to start shopping with exclusive discounts, fast shipping, and personalized recommendations.",
  ogTitle: "Sign Up | VueMart",
  ogDescription:
    "Join VueMart today to start shopping with exclusive discounts, fast shipping, and personalized recommendations.",
  // ogImage: "/og-signup.png",
  // ogUrl: "https://yourwebsite.com/register ",
  ogType: "website",
  twitterTitle: "Sign Up | VueMart",
  twitterDescription:
    "Join VueMart today to start shopping with exclusive discounts, fast shipping, and personalized recommendations.",
  // twitterImage: "/og-signup.png",
  twitterCard: "summary_large_image",
});

useHead({
  title: "Sign Up | VueMart",
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
const isLoading = ref(false);
const signupSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().min(2).max(100),
    password: z.string().min(2).max(100),
  }),
);
const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: signupSchema,
});
const handleSumbit = handleSubmit(async (values) => {
  pr(values, "signup form - handleSubmit");
  isLoading.value = true;
  await sleep(3000);
  isLoading.value = false;
});
</script>
<template>
  <div class="w-full max-w-md space-y-8">
    <!-- Title -->
    <div class="text-center">
      <SharedLogo :h="100" />
      <p class="text-muted-foreground mt-2 text-sm dark:text-gray-400">
        Create New Account
      </p>
    </div>

    <!-- Card -->
    <Card class="w-full bg-white shadow-lg dark:bg-gray-900">
      <CardHeader>
        <CardTitle class="text-xl dark:text-white">Sign up</CardTitle>
        <CardDescription class="dark:text-gray-400">
          Enter your information below to create new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form @submit="handleSumbit" class="space-y-4">
          <SharedInputField
            id="name"
            label="Username"
            name="name"
            placeholder="John Doe"
            type="text"
          />
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

          <!-- Submit Button -->
          <Button type="submit" :disabled="isLoading" class="w-full">
            <Icon v-if="isLoading" name="eos-icons:bubble-loading" />
            Sign Up</Button
          >
        </form>
      </CardContent>

      <CardFooter> </CardFooter>
    </Card>

    <!-- Footer -->
    <p class="text-muted-foreground text-center text-sm dark:text-gray-400">
      have an account?
      <NuxtLink
        to="/auth/signin"
        class="hover:text-primary underline underline-offset-4 dark:hover:text-blue-400"
      >
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>
