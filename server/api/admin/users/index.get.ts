import prisma from "~/utils/db";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const params = await getQuery<{
    limit?: string;
    page?: string;
    search?: string;
  }>(event);
  const limit = parseInt(params.limit ?? "10");
  const page = parseInt(params.page ?? "1");
  const users = await prisma.user
    .paginate({
      where: {
        OR: [
          { email: { contains: params.search?.toLowerCase() } },
          { name: { contains: params.search?.toLowerCase() } },
        ],
      },
      include: {
        authAccounts: true,
      },
    })
    .withPages({
      limit,
      page,
    });
  return users;
});
