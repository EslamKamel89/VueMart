<script setup lang="ts">
import type { Category } from "~/types/db";

const props = defineProps<{
  categories: Category[];
}>();
const search = ref<string>();
const open = ref(false);
const filteredCategories = computed(() => {
  if (!search.value) return props.categories;
  return props.categories.filter((category) =>
    category.name
      .trim()
      .toLowerCase()
      .includes(search.value?.trim().toLowerCase()!),
  );
});
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
          <AdminCategoryCreate @submit="open = false" />
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
        <TableRow v-for="category in filteredCategories" :key="category.id">
          <TableCell class="font-medium"> {{ category.id }} </TableCell>
          <TableCell>{{ category.name }}</TableCell>
          <TableCell class="text-right">
            {{ tableDateFormatter(category.createdAt) }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
