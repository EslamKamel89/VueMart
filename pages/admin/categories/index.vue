<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
<template>
  <AdminCategoryTable />
</template>
