<script setup lang="ts">
const logoSrc = "/images/logo.png";
const props = defineProps<{ h: number }>();
</script>
<template>
  <div class="flex items-center justify-center">
    <img
      :src="logoSrc"
      alt="Website Logo"
      class="w-auto transition-transform duration-300 ease-in-out hover:scale-110 dark:brightness-90"
      :style="{ height: `${h}px` }"
    />
  </div>
</template>
