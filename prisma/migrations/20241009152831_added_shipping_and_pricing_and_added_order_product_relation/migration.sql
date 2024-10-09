/*
  Warnings:

  - You are about to drop the column `discountedPricePerBox` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerBottle` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerBox` on the `Product` table. All the data in the column will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discountedPricePerBox",
DROP COLUMN "pricePerBottle",
DROP COLUMN "pricePerBox",
ADD COLUMN     "bulkShippingCost" DOUBLE PRECISION,
ADD COLUMN     "bulkThreshold" INTEGER,
ADD COLUMN     "discountPricePerUnit" DOUBLE PRECISION,
ADD COLUMN     "palletShippingCost" DOUBLE PRECISION,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "maxCap" DROP NOT NULL,
ALTER COLUMN "baseShippingCost" DROP NOT NULL,
ALTER COLUMN "baseShippingCost" DROP DEFAULT;
