/*
  Warnings:

  - You are about to drop the column `cartItemId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cartItemId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_orderId_fkey";

-- DropIndex
DROP INDEX "Product_cartItemId_key";

-- DropIndex
DROP INDEX "Product_orderId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cartItemId",
DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
