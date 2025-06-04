import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  // fakeCategories.forEach(async (category) => {
  //   await prisma.category.create({
  //     data: {
  //       name: category.name!,
  //       products: {
  //         createMany: {
  //           data: category.products!.map((product) => ({
  //             name: product.name!,
  //             color: product.color!,
  //             price: product.price!,
  //           })),
  //         },
  //       },
  //     },
  //   });
  // });
  let categories = await prisma.category.findMany({
    include: { products: true },
  });
  return {
    categories,
  };
});
