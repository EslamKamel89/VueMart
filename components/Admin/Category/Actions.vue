<script setup lang="ts">
import { Eye, Pen, Trash2 } from "lucide-vue-next";
import type { Category } from "~/types/db";

const props = defineProps<{
  category: Category;
}>();
const emit = defineEmits<{
  submit: [];
}>();
const handleDelete = () => {
  pr("handle delete confirmed");
};
</script>
<template>
  <div class="flex justify-end space-x-1">
    <SharedAreYouSure @continue="handleDelete">
      <template #trigger>
        <Button variant="destructive" size="sm">
          <Trash2 />
        </Button>
      </template>
    </SharedAreYouSure>
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
