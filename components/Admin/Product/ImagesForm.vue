<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import type { ImageUploadApi } from "~/components/Shared/ImageUpload.vue";
import type { Image } from "~/types/db";

const props = defineProps<{
  images: Image[];
}>();
const updatedImages = ref<Image[]>(props.images);
const imageUploadElement = ref<ImageUploadApi>();
const emit = defineEmits<{
  imagesUpdated: [imgs: Image[]];
}>();
const handleImageUpdate = async (imgFiles: FileList) => {
  const formData = new FormData();
  for (const img of imgFiles) {
    formData.append("images", img);
  }
  try {
    const { images } = await $fetch<{ images: Image[] }>(
      "/api/admin/products/images",
      {
        method: "POST",
        body: formData,
      },
    );
    // pr("upload image in ImagesForm component");
    updatedImages.value = [...updatedImages.value, ...images];
    imageUploadElement.value?.resetImages();
    emit("imagesUpdated", updatedImages.value);
  } catch (error) {
    handleApiError(error);
  }
};
const handleImageDelete = (imageId: number) => {
  updatedImages.value = updatedImages.value.filter((img) => img.id != imageId);
  emit("imagesUpdated", updatedImages.value);
};
</script>
<template>
  <div>
    <SharedImageUpload
      label="Attach products"
      @on-change="handleImageUpdate"
      ref="imageUploadElement"
    />
    <div class="flex flex-wrap space-y-2 space-x-5">
      <div v-for="image in updatedImages" :key="image.id" class="relative">
        <img :src="image.url" class="h-32 rounded shadow" />
        <Trash2
          @click="handleImageDelete(image.id)"
          class="absolute -top-4 -right-4 h-9 w-9 cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-red-500"
        />
      </div>
    </div>
  </div>
</template>
