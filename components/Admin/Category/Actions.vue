<script setup lang="ts">
import { Eye, Pen } from "lucide-vue-next";
import type { Category } from "~/types/db";

const props = defineProps<{
  category: Category;
}>();
const emit = defineEmits<{
  submit: [];
}>();
</script>
<template>
  <div class="flex justify-end space-x-1">
    <AdminCategoryDeleteAction :category="category" @submit="emit('submit')" />
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="sm">
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AdminCategoryForm
          @submit="emit('submit')"
          type="edit"
          :category="category"
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
        <AdminCategoryForm type="view" :category="category" />
      </DialogContent>
    </Dialog>
  </div>
</template>
