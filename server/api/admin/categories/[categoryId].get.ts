import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const categoryId = Number(getRouterParam(event, "categoryId"));
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw createError({
      statusCode: 401,
      statusMessage: "Category not found in the database",
    });
  }
  return category;
});
