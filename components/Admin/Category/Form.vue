<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { Category } from "~/types/db";
const props = defineProps<{
  type: "create" | "edit" | "view";
  category?: Category;
}>();
const formSchema = toTypedSchema(categorySchema);
const form = useForm({
  validationSchema: formSchema,
});
const isLoading = ref(false);
const submit = form.handleSubmit(async (values) => {
  if (props.type == "view") return;
  isLoading.value = true;
  let category: Category;
  try {
    if (props.type == "create") {
      category = await $fetch<Category>("/api/admin/categories", {
        method: "POST",
        body: values,
      });
    } else if (props.type == "edit") {
      category = await $fetch<Category>(
        `/api/admin/categories/${props.category?.id}`,
        {
          method: "PUT",
          body: values,
        },
      );
    }
    showSuccessToaster({
      title: "Success",
      description: `Category ${props.type == "create" ? "created" : "updated"} succesfully`,
    });
    emit("submit");
  } catch (error) {
    handleApiError(error);
  } finally {
    isLoading.value = false;
  }
});
const emit = defineEmits<{
  submit: [];
}>();
onMounted(() => {
  if (props.type == "edit" || props.type == "view") {
    form.setValues({
      name: props.category?.name,
    });
  }
});
</script>
<template>
  <DialogHeader>
    <DialogTitle>Create Category</DialogTitle>
  </DialogHeader>
  <form @submit.prevent="submit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem class="!gap-1">
        <FormLabel class="my-1">Name</FormLabel>
        <FormControl>
          <Input
            placeholder="Category name"
            :disabled="type == 'view'"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      v-if="type != 'view'"
      type="submit"
      :disabled="isLoading"
      class="mt-4"
      >{{ type == "create" ? "Create" : "Update" }}</Button
    >
  </form>
</template>
