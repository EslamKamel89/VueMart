import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const categoryId = Number(getRouterParam(event, "categoryId"));
  const category = await prisma.category.delete({
    where: { id: categoryId },
  });

  return { message: "Category Deleted" };
});
