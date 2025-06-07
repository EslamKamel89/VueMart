import prisma from "~/utils/db";
import { fakeCategories } from "~/utils/fakeData";

export default defineEventHandler(async (event) => {
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  fakeCategories.forEach(async (category) => {
    let categories = await prisma.category.create({
      data: {
        name: category.name!,
        products: {
          createMany: {
            data: category.products!.map((product) => ({
              name: product.name!,
              color: product.color!,
              price: product.price!,
            })),
          },
        },
      },
      include: { products: true },
    });
    categories.products.forEach(async (product) => {
      const randomId = Math.floor(Math.random() * 100) + 1;
      await prisma.image.createMany({
        data: Array.from({ length: 4 }, (_, index) => ({
          url: `https://picsum.photos/id/${randomId + index}/200/300`,
          productId: product.id,
        })),
      });
    });
  });
  let categories = await prisma.category.findMany({
    include: { products: { include: { images: true } } },
  });
  return {
    categories,
  };
});
