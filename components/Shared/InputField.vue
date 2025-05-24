<script setup lang="ts">
defineProps<{
  id: string;
  type: string;
  placeholder: string;
  name: string;
  label: string;
}>();
</script>
<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormControl>
        <div class="space-y-2">
          <Label :for="id" class="dark:text-white">{{ label }}</Label>
          <Input
            :id="id"
            :type="type"
            :placeholder="placeholder"
            v-bind="componentField"
            class="dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
