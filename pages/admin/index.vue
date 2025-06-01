<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
<template>
  <!-- Page Content -->
  <main class="overflow-auto p-6">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card class="p-6">
        <h2 class="text-muted-foreground text-sm font-medium">Total Users</h2>
        <p class="mt-2 text-2xl font-bold">1,234</p>
        <p class="mt-1 text-xs text-green-500">+12% from last month</p>
      </Card>

      <Card class="p-6">
        <h2 class="text-muted-foreground text-sm font-medium">Total Orders</h2>
        <p class="mt-2 text-2xl font-bold">567</p>
        <p class="mt-1 text-xs text-green-500">+8% from last month</p>
      </Card>

      <Card class="p-6">
        <h2 class="text-muted-foreground text-sm font-medium">Earnings</h2>
        <p class="mt-2 text-2xl font-bold">$9,876</p>
        <p class="mt-1 text-xs text-red-500">-2% from last month</p>
      </Card>
    </div>
  </main>
</template>
