-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "parent_organisation_id" INTEGER,
    "title" TEXT NOT NULL,
    "document" TEXT,
    "content" TEXT,
    "document_category_id" INTEGER,
    "remarks" TEXT,
    "permission" TEXT,
    "priority" INTEGER,
    "status" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
