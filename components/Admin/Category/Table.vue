<script setup lang="ts">
defineProps<{
  // categories: Category[];
}>();
</script>

<template>
  <Table>
    <TableCaption>A list of all categories.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]"> Invoice </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right"> Amount </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium"> INV001 </TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell class="text-right"> $250.00 </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
