<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
  label: string;
}>();
</script>
<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormControl>
        <div class="flex items-center space-x-2">
          <Checkbox
            v-bind="componentField"
            :id="id"
            class="dark:border-gray-600 dark:bg-gray-700"
          />
          <Label :for="id" class="text-sm dark:text-gray-300">
            {{ label }}
          </Label>
        </div>
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
