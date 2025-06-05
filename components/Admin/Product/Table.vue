<script setup lang="ts">
import type { Product } from "~/types/db";

const products = ref<Product[]>([]);
const search = ref<string>();
const createModel = ref(false);
const editModel = ref(false);
const isLoading = ref(false);
const fetch = async () => {
  isLoading.value = true;
  try {
    products.value = await $fetch<Product[]>("/api/admin/products");
  } catch (error) {
    handleApiError(error);
  } finally {
    isLoading.value = false;
  }
};
const filteredProducts = computed(() => {
  if (!search.value) return products.value;
  const cleanSearch = search.value?.trim().toLowerCase()!;
  return products.value.filter(
    (product) =>
      product.name.trim().toLowerCase().includes(cleanSearch) ||
      product.category?.name.trim().toLowerCase().includes(cleanSearch) ||
      product.color?.trim().toLowerCase().includes(cleanSearch),
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
      <Input
        placeholder="Search by name or color or category"
        v-model="search"
      />
      <Dialog v-model:open="createModel">
        <DialogTrigger>
          <Button>+ Product</Button>
        </DialogTrigger>
        <DialogContent>
          <AdminProductForm @submit="refetchData" type="create" />
        </DialogContent>
      </Dialog>
    </div>

    <!-- Desktop Table (Visible on lg+) -->
    <div class="hidden overflow-x-auto md:block">
      <Table :products="products">
        <TableCaption>A list of all products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
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
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell class="text-right">
                <Skeleton class="h-4 w-full" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow v-for="product in filteredProducts" :key="product.id">
              <TableCell class="font-medium">{{ product.id }}</TableCell>
              <TableCell>
                {{ product.name }}
              </TableCell>
              <TableCell>
                <SharedColor :color="product.color" />
              </TableCell>
              <TableCell>{{ product.price }}</TableCell>
              <TableCell>{{ product.category?.name }}</TableCell>
              <TableCell>
                {{ tableDateFormatter(product.createdAt) }}</TableCell
              >
              <TableCell class="text-right">
                <AdminProductActions :product="product" @submit="refetchData" />
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
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-1/2" />
          </div>
        </Card>
      </template>
      <template v-else>
        <Card
          v-for="product in filteredProducts"
          :key="product.id"
          class="hover:bg-muted p-4 transition-colors"
        >
          <div class="flex flex-col space-y-2">
            <p class="text-muted-foreground text-sm">ID: {{ product.id }}</p>
            <h3 class="text-lg font-bold">{{ product.name }}</h3>
            <Separator />
            <SharedCustomToolTip description="Product Color" class="">
              <div>
                <SharedColor :color="product.color" />
              </div>
            </SharedCustomToolTip>
            <SharedCustomToolTip description="Product Price">
              <div class="">${{ product.price }}</div>
            </SharedCustomToolTip>
            <SharedCustomToolTip description="Category Name">
              <div class="">{{ product.category?.name }}</div>
            </SharedCustomToolTip>
            <div class="mt-4 flex w-full flex-col items-end space-y-1">
              <p class="text-right text-sm text-gray-500 dark:text-gray-400">
                {{ tableDateFormatter(product.createdAt) }}
              </p>
              <AdminProductActions :product="product" @submit="refetchData" />
            </div>
          </div>
        </Card>
      </template>
    </div>
  </div>
</template>
