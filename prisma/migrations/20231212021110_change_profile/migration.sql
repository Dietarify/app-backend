/*
  Warnings:

  - You are about to drop the column `weight` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `currentWeight` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightTarget` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "weight",
ADD COLUMN     "currentWeight" INTEGER NOT NULL,
ADD COLUMN     "weightTarget" INTEGER NOT NULL;
