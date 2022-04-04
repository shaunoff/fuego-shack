/*
  Warnings:

  - You are about to drop the column `noteId` on the `Asset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[assetId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_noteId_fkey";

-- DropIndex
DROP INDEX "Asset_noteId_key";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "noteId";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "assetId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Note_assetId_key" ON "Note"("assetId");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("asset_id") ON DELETE SET NULL ON UPDATE CASCADE;
