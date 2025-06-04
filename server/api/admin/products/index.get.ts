import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  //   const session = await requireUserSession(event);
  const products = await prisma.product.findMany();
  return products;
});
