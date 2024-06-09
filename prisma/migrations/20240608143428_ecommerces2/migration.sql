/*
  Warnings:

  - You are about to drop the `_CartToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_B_fkey";

-- DropTable
DROP TABLE "_CartToProduct";

-- CreateTable
CREATE TABLE "Pro_cart" (
    "id" SERIAL NOT NULL,
    "qu" INTEGER NOT NULL DEFAULT 1,
    "cartId" INTEGER,

    CONSTRAINT "Pro_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_product" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_product_AB_unique" ON "_product"("A", "B");

-- CreateIndex
CREATE INDEX "_product_B_index" ON "_product"("B");

-- AddForeignKey
ALTER TABLE "Pro_cart" ADD CONSTRAINT "Pro_cart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product" ADD CONSTRAINT "_product_A_fkey" FOREIGN KEY ("A") REFERENCES "Pro_cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product" ADD CONSTRAINT "_product_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
