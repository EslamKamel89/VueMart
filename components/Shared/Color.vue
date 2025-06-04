<script setup lang="ts">
const props = defineProps<{
  color: string;
}>();
</script>
<template>
  <div class="flex items-center space-x-2">
    <div
      class="h-10 w-10 rounded-full shadow-lg"
      :style="{ background: color }"
    ></div>
    <div>{{ color }}</div>
  </div>
</template>
