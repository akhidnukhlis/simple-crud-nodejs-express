/*
  Warnings:

  - Added the required column `userUsername` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "userUsername" VARCHAR(100) NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "categories" (
    "id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "userUsername" VARCHAR(100) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
