-- CreateTable
CREATE TABLE "books" (
    "id" VARCHAR(100) NOT NULL,
    "tittle" VARCHAR(100) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "image" VARCHAR(100),
    "categories" VARCHAR(100) NOT NULL,
    "keywords" VARCHAR(100) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "publisher" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_tittle_key" ON "books"("tittle");
