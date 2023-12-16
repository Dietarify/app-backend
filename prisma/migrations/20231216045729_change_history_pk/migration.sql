/*
  Warnings:

  - The primary key for the `DietHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DietHistory` table. All the data in the column will be lost.
  - The primary key for the `WeightHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WeightHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DietHistory" DROP CONSTRAINT "DietHistory_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "DietHistory_pkey" PRIMARY KEY ("timestamp", "userId");

-- AlterTable
ALTER TABLE "WeightHistory" DROP CONSTRAINT "WeightHistory_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "WeightHistory_pkey" PRIMARY KEY ("timestamp", "userId");
