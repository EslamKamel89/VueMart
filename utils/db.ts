import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";
const prismaClientSingletoon = () => {
  return new PrismaClient().$extends(
    pagination({
      pages: {
        limit: 10, // default items per page
        includePageCount: true,
      },
      cursor: {
        limit: 10,
        getCursor: (item) => item.id?.toString() || "",
        parseCursor: (cursor) => ({ id: Number(cursor) }),
      },
    }),
  );
};
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingletoon>;
} & typeof global;
const prisma = globalThis.prismaGlobal ?? prismaClientSingletoon();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma;
