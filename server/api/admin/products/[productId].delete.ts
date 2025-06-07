import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const productId = Number(getRouterParam(event, "productId"));
  const product = await prisma.product.delete({
    where: { id: productId },
  });

  return { message: "Product Deleted" };
});
