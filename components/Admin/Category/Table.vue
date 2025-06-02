<script setup lang="ts">
import type { Category } from "~/types/db";

const categories = ref<Category[]>([]);
const search = ref<string>();
const open = ref(false);
const isLoading = ref(false);
const fetch = async () => {
  isLoading.value = true;
  try {
    categories.value = await $fetch<Category[]>("/api/admin/categories");
  } catch (error) {
    handleApiError(error);
  } finally {
    isLoading.value = false;
  }
};
const filteredCategories = computed(() => {
  if (!search.value) return categories.value;
  return categories.value.filter((category) =>
    category.name
      .trim()
      .toLowerCase()
      .includes(search.value?.trim().toLowerCase()!),
  );
});
onMounted(() => {
  fetch();
});
const handleCategoryCreated = () => {
  open.value = false;
  fetch();
};
</script>

<template>
  <div class="w-full">
    <div class="my-2 flex w-full justify-center space-x-2">
      <Input placeholder="Search..." v-model="search" />
      <Dialog v-model:open="open">
        <DialogTrigger>
          <Button>+ Category</Button>
        </DialogTrigger>
        <DialogContent>
          <AdminCategoryCreate @submit="handleCategoryCreated" />
        </DialogContent>
      </Dialog>
    </div>
    <Table :categories="categories">
      <TableCaption>A list of all categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Id </TableHead>
          <TableHead>Name</TableHead>
          <TableHead class="text-right"> Created at </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="isLoading">
          <TableRow v-for="index in 10" :key="index">
            <TableCell class="font-medium">
              <Skeleton class="h-4 w-full" />
            </TableCell>
            <TableCell> <Skeleton class="h-4 w-full" /></TableCell>
            <TableCell class="text-right">
              <Skeleton class="h-4 w-full" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow v-for="category in filteredCategories" :key="category.id">
            <TableCell class="font-medium"> {{ category.id }} </TableCell>
            <TableCell>{{ category.name }}</TableCell>
            <TableCell class="text-right">
              {{ tableDateFormatter(category.createdAt) }}
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
