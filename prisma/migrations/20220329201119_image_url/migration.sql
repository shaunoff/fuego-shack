/*
  Warnings:

  - You are about to drop the column `assetId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_assetId_fkey";

-- DropIndex
DROP INDEX "Note_assetId_key";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "assetId",
ADD COLUMN     "imageUrl" TEXT;

-- DropTable
DROP TABLE "Asset";
