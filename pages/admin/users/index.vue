<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
<template>
  <AdminUserTable />
</template>
