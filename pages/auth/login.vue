<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

definePageMeta({
  layout: "auth",
});

const loginSchema = toTypedSchema(
  z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  }),
);
const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: loginSchema,
});
const handleSumbit = handleSubmit((values) => {
  pr(values, "login form - handleSubmit");
  console.log(values);
});
</script>
<template>
  <div class="w-full max-w-md space-y-8">
    <!-- Title -->
    <div class="text-center">
      <h1 class="text-3xl font-bold dark:text-white">Welcome Back</h1>
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
        <form @submit="handleSumbit" class="space-y-4">
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

          <!-- Remember & Forgot -->
          <FormField v-slot="{ componentField }" name="remember">
            <FormItem>
              <FormControl>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <Checkbox
                      v-bind="componentField"
                      id="remember"
                      class="dark:border-gray-600 dark:bg-gray-700"
                    />
                    <Label for="remember" class="text-sm dark:text-gray-300">
                      Remember me
                    </Label>
                  </div>
                  <a
                    href="#"
                    class="text-primary text-sm underline-offset-4 hover:underline dark:text-blue-400"
                  >
                    Forgot password?
                  </a>
                </div>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>

          <!-- Submit Button -->
          <Button type="submit" class="w-full">Sign In</Button>
        </form>
      </CardContent>

      <CardFooter> </CardFooter>
    </Card>

    <!-- Footer -->
    <p class="text-muted-foreground text-center text-sm dark:text-gray-400">
      Don't have an account?
      <NuxtLink
        to="/auth/register"
        class="hover:text-primary underline underline-offset-4 dark:hover:text-blue-400"
      >
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>
