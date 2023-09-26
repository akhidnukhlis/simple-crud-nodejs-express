/*
  Warnings:

  - You are about to drop the column `userUsername` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `userUsername` on the `categories` table. All the data in the column will be lost.
  - Added the required column `username` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_userUsername_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_userUsername_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "userUsername",
ADD COLUMN     "username" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "userUsername",
ADD COLUMN     "username" VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
