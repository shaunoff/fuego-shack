import type { Brand, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Brand } from "@prisma/client";

export function createBrand({
  name,
  description,
  city,
  state,
  country,
  logoUrl,
}: Pick<
  Brand,
  "name" | "description" | "logoUrl" | "city" | "state" | "country"
>) {
  return prisma.brand.create({
    data: {
      name,
      description,
      city,
      state,
      country,
      logoUrl,
    },
  });
}

export function getBrands({ orderBy }: { orderBy?: Prisma.SortOrder }) {
  return prisma.brand.findMany({
    // select: { id: true, name: true, logoUrl: true, description: true },
    orderBy: { updatedAt: orderBy },
  });
}

export function findBrand({ id }: Pick<Brand, "id">) {
  return prisma.brand.findUnique({
    where: { id },
  });
}

export function updateBrand({
  brandId,
  ...data
}: Pick<
  Brand,
  "name" | "description" | "logoUrl" | "city" | "state" | "country"
> & { brandId: string }) {
  return prisma.brand.update({
    where: { id: brandId },
    data,
  });
}
