<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import type { Product } from "~/types/db";

const props = defineProps<{
  product: Product;
}>();
const emit = defineEmits<{
  submit: [];
}>();
const isLoading = ref(false);
const handleDelete = async () => {
  try {
    isLoading.value = true;
    const response = await $fetch(`/api/admin/products/${props.product.id}`, {
      method: "DELETE",
    });
    showSuccessToaster({
      title: "Success",
      description: response.message,
    });
    emit("submit");
  } catch (error) {
    handleApiError(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <SharedAreYouSure @continue="handleDelete">
    <template #trigger>
      <Button :disabled="isLoading" variant="destructive" size="sm">
        <Trash2 />
      </Button>
    </template>
  </SharedAreYouSure>
</template>
