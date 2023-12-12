/*
  Warnings:

  - You are about to drop the column `calories` on the `Foods` table. All the data in the column will be lost.
  - Added the required column `caloriesPerHundredGram` to the `Foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyPerHundredGram` to the `Foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Foods" DROP COLUMN "calories",
ADD COLUMN     "caloriesPerHundredGram" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "energyPerHundredGram" DOUBLE PRECISION NOT NULL;
