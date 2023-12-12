-- CreateTable
CREATE TABLE "Foods" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "Foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DietHistory" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(30) NOT NULL,
    "eatenFoodId" INTEGER NOT NULL,

    CONSTRAINT "DietHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" VARCHAR(30) NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "WeightHistory" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(30) NOT NULL,
    "currentWeight" INTEGER NOT NULL,

    CONSTRAINT "WeightHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DietHistory" ADD CONSTRAINT "DietHistory_eatenFoodId_fkey" FOREIGN KEY ("eatenFoodId") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietHistory" ADD CONSTRAINT "DietHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightHistory" ADD CONSTRAINT "WeightHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
