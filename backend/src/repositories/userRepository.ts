import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const findById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const update = async (id: string, updates: Partial<User>): Promise<User | null> => {
  return prisma.user.update({
    where: { id },
    data: { ...updates, updatedAt: new Date() },
  });
};
