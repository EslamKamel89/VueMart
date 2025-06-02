<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const formSchema = toTypedSchema(categorySchema);
const form = useForm({
  validationSchema: formSchema,
});
const submit = form.handleSubmit((values) => {
  pr(values, "create category form");
  emit("submit");
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
    <Button type="submit" class="mt-4">Create</Button>
  </form>
</template>
