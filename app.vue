<template>
  <NuxtLayout>
    <NuxtPage />
    <div class="fixed right-0 bottom-0">
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </div>
  </NuxtLayout>
</template>
