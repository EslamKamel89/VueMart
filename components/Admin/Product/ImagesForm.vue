<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";
import type { ImageUploadApi } from "~/components/Shared/ImageUpload.vue";

const props = defineProps<{
  images: string[];
}>();
const updatedImages = ref<string[]>(props.images);
const imageUploadElement = ref<ImageUploadApi>();
const emit = defineEmits<{
  imagesUpdated: [imgs: string[]];
}>();
const handleImageUpdate = async (imgFiles: FileList) => {
  //todo: handle image upload
  // update the updatedImages ref
  pr("upload image in ImagesForm component");
  imageUploadElement.value?.resetImages();
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
      <div v-for="image in updatedImages" :key="image" class="relative">
        <img :src="image" class="h-32 rounded shadow" />
        <Trash2
          class="absolute -top-4 -right-4 h-9 w-9 cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-red-500"
        />
      </div>
    </div>
  </div>
</template>
