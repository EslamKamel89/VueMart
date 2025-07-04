<script setup lang="ts">
import { Search, SearchX } from "lucide-vue-next";
import type { PaginationMeta } from "~/types/custom";
import type { User } from "~/types/db";
const users = ref<User[]>([]);
const search = ref<string>();
const createModel = ref(false);
const editModel = ref(false);
const isLoading = ref(false);
const paginationMeta = ref<PaginationMeta>();
const page = ref(1);

const fetch = async () => {
  isLoading.value = true;
  try {
    [users.value, paginationMeta.value] = await $fetch<
      [User[], PaginationMeta]
    >("/api/admin/users", {
      params: {
        page: page.value,
        limit: 10,
        search: search.value ?? "",
      },
    });
  } catch (error) {
    handleApiError(error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(() => {
  fetch();
});
const refetchData = () => {
  createModel.value = false;
  editModel.value = false;
  fetch();
};
const handlePageChange = (pageNum: number) => {
  page.value = pageNum;
  refetchData();
};
const handleSearch = () => {
  page.value = 1;
  refetchData();
};
const handleClearSearch = () => {
  page.value = 1;
  search.value = "";
  refetchData();
};
</script>

<template>
  <div class="w-full">
    <!-- Search & Create Dialog -->
    <form @submit.prevent="handleSearch" class="h-full w-full">
      <div class="my-2 flex w-full justify-center space-x-2">
        <div class="flex w-full grow-1 !rounded-e-none">
          <input
            placeholder="Search.."
            v-model="search"
            class="w-full rounded-s-lg rounded-e-none border border-e-0 border-gray-700 ps-4 placeholder:text-xs"
          />
          <Button
            type="button"
            v-if="search"
            class="!rounded-none"
            @click="handleClearSearch"
          >
            <SearchX />
          </Button>

          <Button type="submit" class="!rounded-s-none">
            <Search />
          </Button>
        </div>
        <!--
        <Dialog v-model:open="createModel">
          <DialogTrigger>
            <Button type="button">+ User</Button>
          </DialogTrigger>
          <DialogContent
            class="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] overflow-y-auto p-0"
          >
            <AdminProductForm
              @submit="refetchData"
              type="create"
              :categories="categories ?? []"
            />
          </DialogContent>
        </Dialog>
        -->
      </div>
    </form>

    <!-- Desktop Table (Visible on lg+) -->
    <div class="hidden overflow-x-auto md:block">
      <Table :users="users">
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="isLoading">
            <TableRow v-for="index in 10" :key="index">
              <TableCell class="font-medium">
                <Skeleton class="h-4 w-full" />
              </TableCell>
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell><Skeleton class="h-4 w-full" /></TableCell>
              <TableCell class="text-right">
                <Skeleton class="h-4 w-full" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <template v-if="users.length">
              <TableRow v-for="(user, index) in users" :key="user.id">
                <TableCell class="font-medium">{{ index + 1 }}</TableCell>
                <TableCell>
                  {{ user.name }}
                </TableCell>

                <TableCell>{{ user.email }}</TableCell>
                <TableCell>{{
                  user.authAccounts?.length
                    ? user.authAccounts[0].providerId
                    : user.verifiedAt
                      ? "Verified"
                      : "Not verified"
                }}</TableCell>
                <TableCell> {{ tableDateFormatter(user.createdAt) }}</TableCell>
                <TableCell class="text-right">
                  <!--
                    <AdminProductActions
                    :product="product"
                    @submit="refetchData"
                    :categories="categories ?? []"
                    />
                  -->
                </TableCell>
              </TableRow>
            </template>
            <template v-else>
              <TableRow>
                <TableCell colspan="7">
                  <div
                    class="text-muted-foreground my-4 flex w-full items-center justify-center text-xs"
                  >
                    No Users found
                  </div>
                </TableCell>
              </TableRow>
            </template>
          </template>
        </TableBody>
      </Table>
    </div>

    <!-- Mobile Card View (Visible on sm/md) -->
    <div class="space-y-3 md:hidden">
      <template v-if="isLoading">
        <Card v-for="index in 10" :key="index" class="animate-pulse p-4">
          <div class="space-y-2">
            <Skeleton class="h-4 w-1/4" />
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-3/4" />
          </div>
        </Card>
      </template>
      <template v-else>
        <template v-if="users.length">
          <Card
            v-for="(user, index) in users"
            :key="user.id"
            class="hover:bg-muted p-4 transition-colors"
          >
            <div class="flex flex-col space-y-2">
              <p
                class="bg-primary border-primary shadow-primary w-fit rounded-full border px-2 py-1 text-sm text-white shadow"
              >
                {{ index + 1 }}
              </p>
              <h3 class="text-lg font-bold">{{ user.name }}</h3>
              <Separator />

              <SharedCustomToolTip description="User Email">
                <div class="">{{ user.email }}</div>
              </SharedCustomToolTip>

              <div class="mt-4 flex w-full flex-col items-end space-y-1">
                <p class="text-right text-sm text-gray-500 dark:text-gray-400">
                  {{ tableDateFormatter(user.createdAt) }}
                </p>
                <!--
                  <AdminProductActions
                  :product="product"
                  @submit="refetchData"
                  :categories="categories ?? []"
                  />
                -->
              </div>
            </div>
          </Card>
        </template>
        <template v-else>
          <Card class="hover:bg-muted p-4 transition-colors">
            <div class="flex w-full flex-row justify-center">
              <h3 class="text-muted-foreground text-xs">No Users found</h3>
            </div>
          </Card>
        </template>
      </template>
    </div>
    <SharedPagination
      v-if="paginationMeta"
      :pagination-meta="paginationMeta"
      @page-change="handlePageChange"
    />
  </div>
</template>
