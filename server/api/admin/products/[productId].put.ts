import prisma from "~/utils/db";
import { productSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const body = await readValidatedBody(event, (data) =>
    productSchema.parse(data),
  );
  const productId = Number(getRouterParam(event, "productId"));
  let product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    throw createError({
      statusCode: 401,
      statusMessage: "Product not found in the database",
    });
  }
  product = await prisma.product.update({
    where: { id: productId },
    data: { ...body, images: undefined },
  });
  return product;
});
