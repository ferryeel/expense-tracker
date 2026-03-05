import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma_v3: ReturnType<typeof createPrismaClient> | undefined;
}

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = global.__prisma_v3 ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") global.__prisma_v3 = prisma;
