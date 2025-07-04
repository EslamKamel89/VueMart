import prisma from "~/utils/db";
import { categorySchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const body = await readValidatedBody(event, (values) =>
    categorySchema.parse(values),
  );
  const categoryId = Number(getRouterParam(event, "categoryId"));
  let category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw createError({
      statusCode: 401,
      statusMessage: "Category not found in the database",
    });
  }
  category = await prisma.category.update({
    where: { id: categoryId },
    data: { name: body.name },
  });
  return category;
});
