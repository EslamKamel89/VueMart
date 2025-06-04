import type { Category, Product } from "~/types/db";

export const fakeCategories: Partial<
  Omit<Category, "products"> & { products: Partial<Product>[] }
>[] = [
  {
    name: "Electronics",
    products: [
      { name: "Smartphone X1", color: "#542784", price: 799.99, categoryId: 1 },
      {
        name: "Wireless Noise-Canceling Headphones",
        color: "#3E6B9C",
        price: 199.99,
        categoryId: 1,
      },
      {
        name: "4K Ultra HD Smart TV",
        color: "#A0A0A0",
        price: 699.0,
        categoryId: 1,
      },
    ],
  },
  {
    name: "Books",
    products: [
      { name: "The Art of War", color: "#2D2D2D", price: 14.99, categoryId: 2 },
      {
        name: "To Kill a Mockingbird",
        color: "#4A3F35",
        price: 9.99,
        categoryId: 2,
      },
      {
        name: "Digital Fortress",
        color: "#1E5AAC",
        price: 12.99,
        categoryId: 2,
      },
    ],
  },
  {
    name: "Clothing",
    products: [
      {
        name: "Men’s Casual T-Shirt",
        color: "#FFFFFF",
        price: 24.99,
        categoryId: 3,
      },
      {
        name: "Women’s Denim Jeans",
        color: "#1A3B6F",
        price: 49.99,
        categoryId: 3,
      },
      {
        name: "Winter Wool Coat",
        color: "#3A3A3A",
        price: 129.99,
        categoryId: 3,
      },
    ],
  },
  {
    name: "Home & Kitchen",
    products: [
      {
        name: "Non-Stick Cookware Set",
        color: "#C4A484",
        price: 89.99,
        categoryId: 4,
      },
      {
        name: "Modern LED Table Lamp",
        color: "#F5F5DC",
        price: 34.99,
        categoryId: 4,
      },
      {
        name: "Stainless Steel Chef Knife",
        color: "#C0C0C0",
        price: 49.99,
        categoryId: 4,
      },
    ],
  },
  {
    name: "Sports & Outdoors",
    products: [
      {
        name: "Adjustable Dumbbell Set",
        color: "#0047AB",
        price: 129.99,
        categoryId: 5,
      },
      {
        name: "Hiking Backpack 40L",
        color: "#2B4E2B",
        price: 79.99,
        categoryId: 5,
      },
      {
        name: "Yoga Mat (Non-Slip)",
        color: "#C19A6B",
        price: 29.99,
        categoryId: 5,
      },
    ],
  },
  {
    name: "Beauty & Personal Care",
    products: [
      {
        name: "Hydrating Facial Serum",
        color: "#F8C8DC",
        price: 29.99,
        categoryId: 6,
      },
      {
        name: "Natural Lip Balm SPF 15",
        color: "#E3256B",
        price: 9.99,
        categoryId: 6,
      },
      {
        name: "Organic Shampoo & Conditioner Set",
        color: "#8CC084",
        price: 19.99,
        categoryId: 6,
      },
    ],
  },
  {
    name: "Toys & Games",
    products: [
      {
        name: "Wooden Building Blocks Set",
        color: "#D2691E",
        price: 24.99,
        categoryId: 7,
      },
      {
        name: "Board Game - Strategy Master",
        color: "#008080",
        price: 39.99,
        categoryId: 7,
      },
      {
        name: "Remote Control Car",
        color: "#FF0000",
        price: 49.99,
        categoryId: 7,
      },
    ],
  },
  {
    name: "Health & Wellness",
    products: [
      {
        name: "Vitamin C Supplement",
        color: "#F2F2F2",
        price: 14.99,
        categoryId: 8,
      },
      {
        name: "Electric Toothbrush",
        color: "#000000",
        price: 39.99,
        categoryId: 8,
      },
      {
        name: "Fitness Tracker Watch",
        color: "#4A4A4A",
        price: 59.99,
        categoryId: 8,
      },
    ],
  },
  {
    name: "Automotive",
    products: [
      {
        name: "Car Vacuum Cleaner",
        color: "#808080",
        price: 29.99,
        categoryId: 9,
      },
      {
        name: "Leather Car Seat Covers",
        color: "#000000",
        price: 199.99,
        categoryId: 9,
      },
      {
        name: "Bluetooth Car FM Transmitter",
        color: "#4D4D4D",
        price: 19.99,
        categoryId: 9,
      },
    ],
  },
  {
    name: "Grocery",
    products: [
      {
        name: "Organic Whole Milk",
        color: "#FFFFF0",
        price: 4.99,
        categoryId: 10,
      },
      {
        name: "Whole Wheat Bread Loaf",
        color: "#D2B48C",
        price: 2.99,
        categoryId: 10,
      },
      {
        name: "Mixed Nuts Pack",
        color: "#A0522D",
        price: 8.99,
        categoryId: 10,
      },
    ],
  },
];
