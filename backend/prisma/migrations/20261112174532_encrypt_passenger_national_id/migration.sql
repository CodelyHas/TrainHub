/*
  Warnings:

  - A unique constraint covering the columns `[nationalIdHash]` on the table `Passenger` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Passenger_nationalId_key";

-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "nationalIdHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_nationalIdHash_key" ON "Passenger"("nationalIdHash");
