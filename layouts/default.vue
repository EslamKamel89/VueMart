<template>
  <div class="flex min-h-screen flex-col">
    <!-- Navbar -->
    <header class="border-b bg-white">
      <div
        class="container mx-auto flex items-center justify-between px-4 py-3"
      >
        <!-- Logo -->
        <div class="text-xl font-bold text-gray-800">VueMart</div>

        <!-- Desktop Nav -->
        <nav class="hidden space-x-6 md:flex">
          <a href="/" class="hover:text-primary text-sm font-medium">Home</a>
          <a href="/shop" class="hover:text-primary text-sm font-medium"
            >Shop</a
          >
          <a href="/categories" class="hover:text-primary text-sm font-medium"
            >Categories</a
          >
          <a href="/about" class="hover:text-primary text-sm font-medium"
            >About</a
          >
          <a href="/contact" class="hover:text-primary text-sm font-medium"
            >Contact</a
          >
        </nav>

        <!-- Right Icons -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <Button variant="ghost" size="icon">
            <Search />
          </Button>

          <!-- Cart -->
          <Button variant="ghost" size="icon">
            <ShoppingCart />
          </Button>

          <!-- Profile -->
          <Button variant="ghost" size="icon">
            <CircleUserRound />
          </Button>

          <!-- Mobile Menu Button -->
          <Button
            variant="ghost"
            size="icon"
            class="md:hidden"
            @click="toggleMobileMenu"
          >
            <Menu v-if="!mobileMenuOpen" />
            <X v-else />
          </Button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="border-t bg-white md:hidden">
        <nav class="container mx-auto space-y-2 px-4 py-2">
          <a href="/" class="hover:text-primary block text-sm font-medium"
            >Home</a
          >
          <a href="/shop" class="hover:text-primary block text-sm font-medium"
            >Shop</a
          >
          <a
            href="/categories"
            class="hover:text-primary block text-sm font-medium"
            >Categories</a
          >
          <a href="/about" class="hover:text-primary block text-sm font-medium"
            >About</a
          >
          <a
            href="/contact"
            class="hover:text-primary block text-sm font-medium"
            >Contact</a
          >
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto w-full flex-grow px-4 py-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 pt-10 pb-6">
      <div class="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4">
        <!-- Company Info -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">VueMart</h3>
          <p class="text-sm text-gray-600">
            Your one-stop shop for quality products at unbeatable prices.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <a href="/about" class="hover:text-primary text-sm text-gray-600"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="/contact"
                class="hover:text-primary text-sm text-gray-600"
                >Contact</a
              >
            </li>
            <li>
              <a href="/faq" class="hover:text-primary text-sm text-gray-600"
                >FAQ</a
              >
            </li>
            <li>
              <a
                href="/shipping"
                class="hover:text-primary text-sm text-gray-600"
                >Shipping Policy</a
              >
            </li>
            <li>
              <a
                href="/returns"
                class="hover:text-primary text-sm text-gray-600"
                >Returns</a
              >
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase">Categories</h3>
          <ul class="space-y-2">
            <li>
              <a
                href="/electronics"
                class="hover:text-primary text-sm text-gray-600"
                >Electronics</a
              >
            </li>
            <li>
              <a
                href="/fashion"
                class="hover:text-primary text-sm text-gray-600"
                >Fashion</a
              >
            </li>
            <li>
              <a href="/home" class="hover:text-primary text-sm text-gray-600"
                >Home & Kitchen</a
              >
            </li>
            <li>
              <a href="/beauty" class="hover:text-primary text-sm text-gray-600"
                >Beauty</a
              >
            </li>
            <li>
              <a href="/sports" class="hover:text-primary text-sm text-gray-600"
                >Sports</a
              >
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="mb-4 text-sm font-semibold uppercase">Stay Updated</h3>
          <p class="mb-4 text-sm text-gray-600">
            Subscribe to our newsletter to get updates on new arrivals.
          </p>
          <form class="flex space-x-2">
            <Input type="email" placeholder="Your email" class="text-sm" />
            <Button type="submit" size="sm">Subscribe</Button>
          </form>
          <div class="mt-4 flex space-x-4">
            <Button variant="ghost" size="icon"
              ><i class="i-heroicons-facebook h-5 w-5"></i
            ></Button>
            <Button variant="ghost" size="icon"
              ><i class="i-heroicons-instagram h-5 w-5"></i
            ></Button>
            <Button variant="ghost" size="icon"
              ><i class="i-heroicons-twitter h-5 w-5"></i
            ></Button>
            <Button variant="ghost" size="icon"
              ><i class="i-heroicons-linkedin h-5 w-5"></i
            ></Button>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="container mx-auto mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500"
      >
        © {{ new Date().getFullYear() }} VueMart. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  CircleUserRound,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-vue-next";
import { ref } from "vue";
const mobileMenuOpen = ref(false);

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>
