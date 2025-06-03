<script setup lang="ts">
import type { Category } from "~/types/db";

const categories = ref<Category[]>([]);
const search = ref<string>();
const createModel = ref(false);
const editModel = ref(false);
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
const refetchData = () => {
  createModel.value = false;
  editModel.value = false;
  fetch();
};
</script>

<template>
  <div class="w-full">
    <!-- Search & Create Dialog -->
    <div class="my-2 flex w-full justify-center space-x-2">
      <Input placeholder="Search..." v-model="search" />
      <Dialog v-model:open="createModel">
        <DialogTrigger>
          <Button>+ Category</Button>
        </DialogTrigger>
        <DialogContent>
          <AdminCategoryForm @submit="refetchData" type="create" />
        </DialogContent>
      </Dialog>
    </div>

    <!-- Desktop Table (Visible on lg+) -->
    <div class="hidden overflow-x-auto md:block">
      <Table :categories="categories">
        <TableCaption>A list of all categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="isLoading">
            <TableRow v-for="index in 10" :key="index">
              <TableCell class="font-medium">
                <Skeleton class="h-4 w-full" />
              </TableCell>
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell class="text-right">
                <Skeleton class="h-4 w-full" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow v-for="category in filteredCategories" :key="category.id">
              <TableCell class="font-medium">{{ category.id }}</TableCell>
              <TableCell>{{ category.name }}</TableCell>
              <TableCell>
                {{ tableDateFormatter(category.createdAt) }}</TableCell
              >
              <TableCell class="text-right">
                <AdminCategoryActions
                  :category="category"
                  @submit="refetchData"
                />
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- Mobile Card View (Visible on sm/md) -->
    <div class="space-y-3 md:hidden">
      <template v-if="isLoading">
        <Card v-for="index in 10" :key="index" class="animate-pulse p-4">
          <div class="space-y-2">
            <Skeleton class="h-4 w-1/4" />
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-1/2" />
          </div>
        </Card>
      </template>
      <template v-else>
        <Card
          v-for="category in filteredCategories"
          :key="category.id"
          class="hover:bg-muted p-4 transition-colors"
        >
          <div class="flex flex-col space-y-1">
            <p class="text-muted-foreground text-sm">ID: {{ category.id }}</p>
            <h3 class="text-lg font-semibold">{{ category.name }}</h3>
            <div class="mt-4 flex w-full flex-col items-end space-y-1">
              <p class="text-right text-sm text-gray-500 dark:text-gray-400">
                {{ tableDateFormatter(category.createdAt) }}
              </p>
              <AdminCategoryActions :category="category" />
            </div>
          </div>
        </Card>
      </template>
    </div>
  </div>
</template>
