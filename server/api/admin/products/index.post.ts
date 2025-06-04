import prisma from "~/utils/db";
import slugify from "~/utils/slugify";
import { productSchema } from "~/utils/validation";
export default defineEventHandler(async (event) => {
  //   const session = await requireUserSession(event);
  const body = await readValidatedBody(event, (values) =>
    productSchema.parseAsync(values),
  );

  let product = await prisma.product.create({
    data: { ...body, images: undefined },
  });
  product = await prisma.product.update({
    where: { id: product.id },
    data: {
      slug: `${slugify(`${product.id}-${product.name}`)}`,
    },
  });
  return product;
});
