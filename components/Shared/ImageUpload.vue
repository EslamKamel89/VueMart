<script setup lang="ts">
export type ImageUploadApi = {
  resetImages: () => void;
};
const props = defineProps<{
  label: string;
}>();
const files = ref<FileList>();
const inputElement = ref<HTMLInputElement>();
const filesArray = ref<File[]>([]);

const emit = defineEmits<{
  onChange: [files: FileList];
}>();
const resetImages = () => {
  if (inputElement.value) {
    inputElement.value.files = null;
    files.value = undefined;
    filesArray.value = [];
  }
};
defineExpose<ImageUploadApi>({ resetImages });
const handleFileChange = (event: Event) => {
  const newFiles = (event.target as HTMLInputElement).files;
  if (newFiles) {
    files.value = newFiles;
    filesArray.value = Array.from(newFiles);
    emit("onChange", newFiles);
  }
};

const handleFileRemove = (index: number) => {
  if (!files.value) return;
  filesArray.value = filesArray.value.filter((_, i) => i !== index);
  updateFileInput();
};

const updateFileInput = () => {
  const dataTransfer = new DataTransfer();

  filesArray.value.forEach((file) => {
    dataTransfer.items.add(file);
  });

  files.value = dataTransfer.files;

  // const fileInput = document.getElementById(
  //   "dropzone-file",
  // ) as HTMLInputElement;
  if (inputElement.value) {
    inputElement.value.files = dataTransfer.files;
  }
  emit("onChange", files.value);
};

const getPreviewUrl = (file: File) => URL.createObjectURL(file);
</script>

<template>
  <div class="my-4">
    <h3 class="mb-2 font-semibold">{{ label }}</h3>
    <div class="flex w-full flex-col space-y-4">
      <div class="flex w-full items-center justify-center">
        <label
          for="dropzone-file"
          class="flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div
            class="flex flex-row items-center justify-center space-x-2 pt-5 pb-6"
          >
            <svg
              class="mb-4 h-8 w-8 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            ref="inputElement"
            type="file"
            class="hidden"
            @change="handleFileChange"
            :multiple="true"
          />
        </label>
      </div>
      <template v-if="files">
        <div
          class="mx-auto my-2 flex w-full animate-pulse flex-wrap space-y-2 space-x-2"
        >
          <div v-for="(file, index) in files" :key="file.name" class="relative">
            <!--
              <Trash
              @click="handleFileRemove(index)"
              class="absolute -top-2 -right-2 h-10 w-10 cursor-pointer rounded-full bg-white px-2 py-1 text-red-500"
              />
            -->
            <img
              :src="getPreviewUrl(file)"
              alt=""
              class="h-16 rounded-lg border"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
