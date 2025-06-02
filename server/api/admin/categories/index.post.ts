import prisma from "~/utils/db";
import { categorySchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const body = await readValidatedBody(event, (values) =>
    categorySchema.parse(values),
  );
  let category = await prisma.category.findUnique({
    where: { name: body.name },
  });
  if (category != null) {
    throw createError({
      statusCode: 401,
      statusMessage: "Category with this name already exist",
    });
  }
  category = await prisma.category.create({
    data: { name: body.name },
  });
  return category;
});
