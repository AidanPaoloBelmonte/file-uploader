-- DropForeignKey
ALTER TABLE "public"."Folders" DROP CONSTRAINT "Folders_parentID_fkey";

-- AlterTable
ALTER TABLE "Folders" ALTER COLUMN "parentID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
