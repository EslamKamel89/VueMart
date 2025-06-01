<template>
  <div class="bg-background text-foreground flex h-screen">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-card border-r transition-all duration-300',
        isSidebarCollapsed ? 'w-16' : 'w-44',
        isMobile
          ? '!fixed z-40 min-h-screen rounded-e-xl shadow hover:border-gray-400 hover:shadow-2xl'
          : '',
      ]"
    >
      <div class="flex items-center justify-between p-4">
        <div v-if="!isSidebarCollapsed" class="text-lg font-bold">VueMart</div>
        <Button variant="ghost" size="icon" @click="toggleSidebar">
          <Icon v-if="isSidebarCollapsed" name="i-lucide-menu"></Icon>
          <Icon v-else name="i-lucide-x"></Icon>
        </Button>
      </div>

      <nav class="space-y-2 p-2">
        <Card
          v-for="(item, index) in navItems"
          :key="index"
          class="hover:bg-muted flex cursor-pointer items-center gap-2 p-3 transition-all duration-500"
          :class="{
            'scale-105 border-gray-200 !bg-gray-100 shadow-2xl':
              route.path == item.path,
          }"
          @click="navigate(item.path)"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <div class="flex w-full items-center justify-start space-x-4">
                  <Icon
                    :name="`i-lucide-${item.icon}`"
                    class="text-primary w-16 shrink-0"
                  ></Icon>
                  <span
                    class="transition-all duration-1000"
                    :class="{ '!hidden': isSidebarCollapsed }"
                    >{{ item.title }}</span
                  >
                </div>
              </TooltipTrigger>
              <TooltipContent v-if="isSidebarCollapsed">
                <p>{{ item.title }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Card>
      </nav>
    </aside>

    <!-- Main Content -->
    <div
      class="flex flex-1 flex-col overflow-hidden"
      :class="{ 'ms-16': isMobile }"
    >
      <!-- Header -->
      <header class="bg-card flex items-center justify-between border-b p-4">
        <h1 class="text-xl font-semibold">Welcome back, John Doe</h1>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-full">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="goToProfile">Profile</DropdownMenuItem>
            <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <!-- Page Content -->
      <main class="overflow-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
const navItems = [
  { title: "Dashboard", icon: "home", path: "/admin" },
  { title: "Categories", icon: "shapes", path: "/admin/products" },
  { title: "Products", icon: "shopping-basket", path: "/admin/categories" },
  { title: "Payments", icon: "circle-dollar-sign", path: "/admin/payments" },
  { title: "Users", icon: "users", path: "/admin/users" },
];
const route = useRoute();
const router = useRouter();
function navigate(path: string) {
  router.push(path);
}

function goToProfile() {
  alert("Go to profile");
}

function logout() {
  alert("Logging out...");
}
</script>
