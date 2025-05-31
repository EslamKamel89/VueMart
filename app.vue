<template>
  <NuxtLayout>
    <NuxtPage />
    <div class="fixed right-5 bottom-5">
      <ClientOnly>
        <Toaster />
      </ClientOnly>
    </div>
  </NuxtLayout>
</template>
