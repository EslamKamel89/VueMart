<script setup lang="ts">
import { GithubIcon } from "lucide-vue-next";

const githubLoading = ref(false);
const googleLoading = ref(false);
const { signIn, signOut, data: session } = useAuth();
const socialAction = async (provider: string) => {
  provider == "github"
    ? (githubLoading.value = true)
    : (googleLoading.value = true);
  const result = await signIn(provider, { redirect: false });
  if (result?.ok && !result?.error) {
    showSuccessToaster({
      title: "Success",
      description: "You are logged in successfully with " + provider,
    });
  } else {
    showErrorToaster({
      title: "Error",
      description: "Unkwown error occurred while logging in with " + provider,
    });
  }
  provider == "github"
    ? (githubLoading.value = false)
    : (googleLoading.value = false);
};
</script>
<template>
  <div class="h-full w-full">
    <div class="flex w-full items-center justify-center overflow-hidden">
      <div class="w-full border border-b" />
      <div class="text-muted-foreground block w-[300px] text-sm">
        Or Continue With
      </div>
      <div class="w-full border border-b" />
    </div>
    <div class="mt-4 flex w-full justify-center space-x-4">
      <Button
        type="button"
        variant="outline"
        @click="socialAction('github')"
        :disabled="githubLoading"
      >
        <Icon v-if="githubLoading" name="eos-icons:bubble-loading" />

        <GithubIcon v-else class="mr-2 h-4 w-4" /> Github
      </Button>
      <Button
        type="button"
        variant="outline"
        @click="socialAction('google')"
        :disabled="googleLoading"
      >
        <Icon v-if="googleLoading" name="eos-icons:bubble-loading" />
        <Icon v-else name="mynaui:brand-google-solid" class="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  </div>
</template>
