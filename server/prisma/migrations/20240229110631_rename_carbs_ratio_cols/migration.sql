/*
  Warnings:

  - You are about to drop the column `carbRatio` on the `BloodRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BloodRecord" DROP COLUMN "carbRatio",
ADD COLUMN     "carbsRatio" DOUBLE PRECISION NOT NULL DEFAULT 1;
