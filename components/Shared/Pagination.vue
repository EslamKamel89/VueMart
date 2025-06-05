<script setup lang="ts">
import type { PaginationMeta } from "~/types/custom";

const props = defineProps<{
  paginationMeta: PaginationMeta;
}>();
const emit = defineEmits<{
  pageChange: [newPage: number];
}>();
</script>
<template>
  <div
    class="mt-2 mb-4 flex w-full items-center justify-end space-x-2 pe-5"
    v-if="paginationMeta?.pageCount"
  >
    <div class="text-xs">Total Count: {{ paginationMeta?.totalCount }}</div>
    <div>-</div>
    <div class="pe-10 text-xs">
      Total Pages: {{ paginationMeta?.pageCount }}
    </div>
    <div
      v-for="page in paginationMeta?.pageCount"
      :key="page"
      class="bg-primary/5 cursor-pointer rounded-lg border px-2 py-2"
      @click="emit('pageChange', page)"
      :class="{
        '!bg-primary text-white': paginationMeta.currentPage == page,
      }"
    >
      {{ page }}
    </div>
  </div>
</template>
