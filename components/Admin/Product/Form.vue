<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { PaintRoller } from "lucide-vue-next";
import { useForm } from "vee-validate";
import type { Category, Product } from "~/types/db";
const props = defineProps<{
  type: "create" | "edit" | "view";
  product?: Product;
  categories: Category[];
}>();
const formSchema = toTypedSchema(productSchema);
const form = useForm({
  validationSchema: formSchema,
});
const isLoading = ref(false);
const submit = form.handleSubmit(async (values) => {
  if (props.type == "view") return;
  isLoading.value = true;
  let product: Product;
  try {
    if (props.type == "create") {
      product = await $fetch<Product>("/api/admin/products", {
        method: "POST",
        body: values,
      });
    } else if (props.type == "edit") {
      product = await $fetch<Product>(
        `/api/admin/products/${props.product?.id}`,
        {
          method: "PUT",
          body: values,
        },
      );
    }
    showSuccessToaster({
      title: "Success",
      description: `Product ${props.type == "create" ? "created" : "updated"} succesfully`,
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
      name: props.product?.name,
      categoryId: props.product?.category?.id,
      color: props.product?.color,
      price: props.product?.price,
    });
  }
});
</script>
<template>
  <div class="h-full max-h-screen w-full !overflow-y-auto p-2">
    <DialogHeader>
      <DialogTitle>Create Product</DialogTitle>
    </DialogHeader>
    <div class="flex flex-col space-y-3">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="!gap-1">
          <FormLabel class="my-1">Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Product name"
              :disabled="type == 'view'"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <div
        class="flex flex-col items-start space-x-6 lg:flex-row lg:items-start"
      >
        <FormField v-slot="{ componentField }" name="categoryId">
          <FormItem>
            <FormLabel>Category</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="color">
          <FormItem class="!gap-1">
            <FormLabel class="my-1">Color</FormLabel>
            <FormControl>
              <div class="flex space-x-2">
                <label for="pick-color">
                  <div class="border-primary bg-primary/10 rounded px-3 py-2">
                    <PaintRoller />
                  </div>
                </label>
                <Input
                  id="pick-color"
                  type="color"
                  placeholder="Color"
                  :disabled="type == 'view'"
                  v-bind="componentField"
                  class="sr-only"
                />
                <SharedColor
                  v-if="form.values.color"
                  :color="form.values.color"
                />
              </div>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="price">
          <FormItem class="!gap-1">
            <FormLabel class="my-1">Price</FormLabel>
            <FormControl>
              <Input
                placeholder="Price"
                :disabled="type == 'view'"
                v-bind="componentField"
                type="number"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <AdminProductImagesForm
        :images="(product?.images ?? []).map((image) => image.url)"
        @images-updated="(imgs) => form.setFieldValue('images', imgs)"
      />
      <Button
        @click="submit"
        v-if="type != 'view'"
        type="submit"
        :disabled="isLoading"
        class="mt-4"
        >{{ type == "create" ? "Create" : "Update" }}</Button
      >
    </div>
  </div>
</template>
