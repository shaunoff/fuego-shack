import type { User, Note, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Note } from "@prisma/client";

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    where: { id, userId },
  });
}

export function getNoteListItems({
  userId,
  orderBy,
}: {
  userId: User["id"];
  orderBy?: Prisma.SortOrder;
}) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true, imageUrl: true, body: true },
    orderBy: { updatedAt: orderBy },
  });
}

export function createNote({
  body,
  title,
  userId,
  imageUrl,
}: Pick<Note, "body" | "title" | "imageUrl"> & {
  userId: User["id"];
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
      imageUrl,
    },
  });
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  });
}
