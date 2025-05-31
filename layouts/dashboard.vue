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
        <div v-if="!isSidebarCollapsed" class="text-lg font-bold">MyShop</div>
        <Button variant="ghost" size="icon" @click="toggleSidebar">
          <Icon v-if="isSidebarCollapsed" name="i-lucide-menu"></Icon>
          <Icon v-else name="i-lucide-x"></Icon>
        </Button>
      </div>

      <nav class="space-y-2 p-2">
        <Card
          v-for="(item, index) in navItems"
          :key="index"
          class="hover:bg-muted flex cursor-pointer items-center gap-2 p-3"
          @click="navigate(item.path)"
        >
          <div class="flex w-full justify-start space-x-4">
            <Icon :name="`i-lucide-${item.icon}`" class="text-primary"></Icon>
            <span v-if="!isSidebarCollapsed">{{ item.title }}</span>
          </div>
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
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card class="p-6">
            <h2 class="text-muted-foreground text-sm font-medium">
              Total Users
            </h2>
            <p class="mt-2 text-2xl font-bold">1,234</p>
            <p class="mt-1 text-xs text-green-500">+12% from last month</p>
          </Card>

          <Card class="p-6">
            <h2 class="text-muted-foreground text-sm font-medium">
              Total Orders
            </h2>
            <p class="mt-2 text-2xl font-bold">567</p>
            <p class="mt-1 text-xs text-green-500">+8% from last month</p>
          </Card>

          <Card class="p-6">
            <h2 class="text-muted-foreground text-sm font-medium">Earnings</h2>
            <p class="mt-2 text-2xl font-bold">$9,876</p>
            <p class="mt-1 text-xs text-red-500">-2% from last month</p>
          </Card>
        </div>
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
  { title: "Dashboard", icon: "home", path: "/" },
  { title: "Orders", icon: "shopping-cart", path: "/orders" },
  { title: "Products", icon: "package", path: "/products" },
  { title: "Settings", icon: "settings", path: "/settings" },
];

function navigate(path: string) {
  // Replace with real router.push if using Vue Router
  alert("Navigating to " + path);
}

function goToProfile() {
  alert("Go to profile");
}

function logout() {
  alert("Logging out...");
}
</script>
