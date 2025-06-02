<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const formSchema = toTypedSchema(categorySchema);
const form = useForm({
  validationSchema: formSchema,
});
const isLoading = ref(false);
const submit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const category = await $fetch("/api/admin/categories", {
      method: "POST",
      body: values,
    });
    showSuccessToaster({
      title: "Success",
      description: "Category created succesfully",
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
          <Input placeholder="Category name" v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="isLoading" class="mt-4">Create</Button>
  </form>
</template>
