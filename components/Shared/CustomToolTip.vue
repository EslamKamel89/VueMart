<script setup lang="ts">
const props = defineProps<{
  description: string;
}>();
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <div class="w-fit">
          <slot />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ description }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
