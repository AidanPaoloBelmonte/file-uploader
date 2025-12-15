-- DropForeignKey
ALTER TABLE "public"."Files" DROP CONSTRAINT "Files_folderID_fkey";

-- AlterTable
ALTER TABLE "Files" ALTER COLUMN "folderID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
