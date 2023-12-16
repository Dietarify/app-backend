/*
  Warnings:

  - The primary key for the `DietHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DietHistory" DROP CONSTRAINT "DietHistory_pkey",
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "DietHistory_pkey" PRIMARY KEY ("timestamp");

-- CreateTable
CREATE TABLE "CalorieHistory" (
    "timestamp" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(30) NOT NULL,
    "consumedCalories" DOUBLE PRECISION NOT NULL,
    "caloriesNeeds" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CalorieHistory_pkey" PRIMARY KEY ("timestamp","userId")
);

-- AddForeignKey
ALTER TABLE "CalorieHistory" ADD CONSTRAINT "CalorieHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
