export const useAuthStore = defineStore("auth", () => {
  const userEmail = ref<string>();
  const updateUserEmail = (email: string) => {
    userEmail.value = email;
  };
  return {
    userEmail,
    updateUserEmail,
  };
});
