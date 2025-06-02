import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const categories = await prisma.category.findMany();
  return categories;
});
