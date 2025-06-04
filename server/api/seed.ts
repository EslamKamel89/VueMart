import prisma from "~/utils/db";
import { fakeCategories } from "~/utils/fakeData";

export default defineEventHandler(async (event) => {
  let categories = await prisma.category.findMany();
  if (categories.length == 0) {
    categories = await prisma.category.createManyAndReturn({
      data: fakeCategories as { name: string }[],
    });
  }
  return {
    categories,
  };
});
