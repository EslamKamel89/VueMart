import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  //   const session = await requireUserSession(event);
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      color: true,
      createdAt: true,
      updatedAt: true,
      category: { select: { id: true, name: true } },
    },
  });
  return products;
});
