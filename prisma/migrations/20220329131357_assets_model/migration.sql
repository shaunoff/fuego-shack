-- CreateTable
CREATE TABLE "Asset" (
    "asset_id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "version_id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "bytes" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "placeholder" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "access_mode" TEXT NOT NULL,
    "original_filename" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("asset_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_public_id_key" ON "Asset"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_noteId_key" ON "Asset"("noteId");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
