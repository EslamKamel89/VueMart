<script setup lang="ts">
import { ImageOff } from "lucide-vue-next";
import type { Image } from "~/types/db";

const props = defineProps<{
  images: Image[];
}>();
</script>
<template>
  <template v-if="images?.length">
    <div class="flex -space-x-2">
      <div v-for="image in images">
        <Avatar>
          <AvatarImage :src="image.url" :alt="'Product Image'" />
        </Avatar>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex w-full justify-start md:justify-center">
      <ImageOff />
    </div>
  </template>
</template>
