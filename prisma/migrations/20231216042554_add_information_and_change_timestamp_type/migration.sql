-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "DietHistory" ALTER COLUMN "timestamp" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "nickname" TEXT;

-- AlterTable
ALTER TABLE "WeightHistory" ALTER COLUMN "timestamp" SET DATA TYPE DATE;
