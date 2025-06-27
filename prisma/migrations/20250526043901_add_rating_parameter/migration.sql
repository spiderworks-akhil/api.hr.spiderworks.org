-- CreateTable
CREATE TABLE "RatingParameter" (
    "id" SERIAL NOT NULL,
    "parent_organisation_id" INTEGER,
    "name" TEXT NOT NULL,
    "ratable_by_client" INTEGER,
    "ratable_by_manager" INTEGER,
    "ratable_by_self" INTEGER,
    "remarks" TEXT,
    "status" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RatingParameter_pkey" PRIMARY KEY ("id")
);
