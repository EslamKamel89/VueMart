<script setup lang="ts">
import { Eye, Pen } from "lucide-vue-next";
import type { Category, Product } from "~/types/db";

const props = defineProps<{
  product: Product;
  categories: Category[];
}>();
const emit = defineEmits<{
  submit: [];
}>();
</script>
<template>
  <div class="flex justify-end space-x-1">
    <AdminProductDeleteAction :product="product" @submit="emit('submit')" />
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AdminProductForm
          @submit="emit('submit')"
          type="edit"
          :product="product"
          :categories="categories"
        />
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AdminProductForm
          type="view"
          :product="product"
          :categories="categories"
        />
      </DialogContent>
    </Dialog>
  </div>
</template>
