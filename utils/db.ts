import { PrismaClient } from "@prisma/client";
const prismaClientSingletoon = () => {
  return new PrismaClient();
};
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingletoon>;
} & typeof global;
const prisma = globalThis.prismaGlobal ?? prismaClientSingletoon();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma;
