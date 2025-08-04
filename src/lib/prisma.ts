import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Check if Prisma client is available
let prismaClient: PrismaClient | undefined;

try {
  prismaClient = new PrismaClient({
    log: ["query"],
  });
} catch (error) {
  console.warn("Prisma client not available. Please run 'npx prisma generate' to generate the client.");
  
  // In development, create a mock client
  if (process.env.NODE_ENV !== "production") {
    console.log("Using mock Prisma client for development");
    prismaClient = {
      // Mock the most commonly used methods
      user: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async (data: any) => ({ id: 'mock-id', ...data.data }),
        update: async (data: any) => ({ id: 'mock-id', ...data.data }),
        delete: async () => ({ id: 'mock-id' }),
      },
      account: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async (data: any) => ({ id: 'mock-id', ...data.data }),
        update: async (data: any) => ({ id: 'mock-id', ...data.data }),
        delete: async () => ({ id: 'mock-id' }),
      },
      session: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async (data: any) => ({ id: 'mock-id', ...data.data }),
        update: async (data: any) => ({ id: 'mock-id', ...data.data }),
        delete: async () => ({ id: 'mock-id' }),
      },
      verificationToken: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async (data: any) => ({ id: 'mock-id', ...data.data }),
        update: async (data: any) => ({ id: 'mock-id', ...data.data }),
        delete: async () => ({ id: 'mock-id' }),
      },
      $connect: async () => {},
      $disconnect: async () => {},
    } as any;
  } else {
    throw new Error("Prisma client is required in production. Please run 'npx prisma generate'.");
  }
}

export const prisma = globalForPrisma.prisma ?? prismaClient;

if (process.env.NODE_ENV !== "production" && prismaClient) {
  globalForPrisma.prisma = prismaClient;
} 