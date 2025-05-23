<script setup lang="ts">
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div class="bg-muted flex min-h-screen items-center justify-center px-4">
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
    <slot />
  </div>
</template>
