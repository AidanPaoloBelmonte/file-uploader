-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "ownerID" INTEGER NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "folderID" INTEGER NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folders" (
    "id" SERIAL NOT NULL,
    "foldername" VARCHAR(255) NOT NULL,
    "ownerID" INTEGER NOT NULL,
    "parentID" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "Folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
