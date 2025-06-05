import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  //   const session = await requireUserSession(event);
  const params = await getQuery(event);
  const limit = parseInt(params.limit as string) || 10;
  const page = parseInt(params.page as string) || 1;
  const search = (params.search || "") as string;
  const products = await prisma.product
    .paginate({
      select: {
        id: true,
        name: true,
        price: true,
        color: true,
        createdAt: true,
        updatedAt: true,
        category: { select: { id: true, name: true } },
      },
      where: {
        OR: [
          { name: { contains: search } },
          { color: { contains: search } },
          { category: { name: { contains: search } } },
        ],
      },
    })
    .withPages({
      limit,
      page,
    });
  return products;
});
