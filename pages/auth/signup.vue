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
const handleSumbit = handleSubmit((values) => {
  pr(values, "signup form - handleSubmit");
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

      <!-- Form -->
      <CardContent>
        <form @submit="handleSumbit" class="space-y-4">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormControl>
                <div class="space-y-2">
                  <Label for="name" class="dark:text-white">Username</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    v-bind="componentField"
                    class="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <!-- Email Field -->
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormControl>
                <div class="space-y-2">
                  <Label for="email" class="dark:text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    v-bind="componentField"
                    class="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Password Field -->
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormControl>
                <div class="space-y-2">
                  <Label for="password" class="dark:text-white">Password</Label>
                  <Input
                    v-bind="componentField"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    class="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Submit Button -->
          <Button type="submit" class="w-full">Sign Up</Button>
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
