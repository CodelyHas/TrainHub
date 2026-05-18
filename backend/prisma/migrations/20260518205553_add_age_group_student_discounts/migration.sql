/*
  Warnings:

  - Added the required column `discountRate` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('ADULT', 'CHILD');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('NONE', 'CHILD', 'STUDENT');

-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "ageGroup" "AgeGroup" NOT NULL DEFAULT 'ADULT',
ADD COLUMN     "isStudent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "discountRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discountType" "DiscountType" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL;
