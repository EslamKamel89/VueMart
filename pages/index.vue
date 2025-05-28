<script setup lang="ts">
const { user } = useUserSession();
</script>
<template>
  <div class="font-bold text-red-500">Welcome Page {{ user }}</div>
</template>
