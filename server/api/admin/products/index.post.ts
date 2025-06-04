import prisma from "~/utils/db";
import { productSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  //   const session = await requireUserSession(event);
  const body = await readValidatedBody(event, (values) =>
    productSchema.parse(values),
  );

  let product = await prisma.product.create({
    data: { ...body, images: undefined },
  });
  product = await prisma.product.update({
    where: { id: product.id },
    data: {
      slug: `${product.id}-${slugify(`${product.id}-${product.name}`)}`,
    },
  });
  return product;
});
