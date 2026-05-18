/*
  Warnings:

  - You are about to drop the column `availableSeats` on the `TrainSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `TrainSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `TrainSchedule` table. All the data in the column will be lost.
  - Added the required column `seatClass` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessAvailableSeats` to the `TrainSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessCapacity` to the `TrainSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessPrice` to the `TrainSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `economyAvailableSeats` to the `TrainSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `economyCapacity` to the `TrainSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `economyPrice` to the `TrainSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeatClass" AS ENUM ('ECONOMY', 'BUSINESS');

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "seatClass" "SeatClass" NOT NULL;

-- AlterTable
ALTER TABLE "TrainSchedule" DROP COLUMN "availableSeats",
DROP COLUMN "capacity",
DROP COLUMN "price",
ADD COLUMN     "businessAvailableSeats" INTEGER NOT NULL,
ADD COLUMN     "businessCapacity" INTEGER NOT NULL,
ADD COLUMN     "businessPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "economyAvailableSeats" INTEGER NOT NULL,
ADD COLUMN     "economyCapacity" INTEGER NOT NULL,
ADD COLUMN     "economyPrice" DOUBLE PRECISION NOT NULL;
