<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div class="bg-muted flex min-h-screen w-full items-center justify-center">
    <div>
      <Button
        @click="toggleDark(!isDark)"
        class="fixed top-5 right-5"
        size="icon"
        variant="ghost"
      >
        <Icon v-if="isDark" name="lucide:sun" />
        <Icon v-else name="lucide:moon" />
      </Button>
    </div>
    <main class="my-4 flex w-full max-w-4xl justify-center">
      <slot />
    </main>
  </div>
</template>
