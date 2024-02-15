-- DropIndex
DROP INDEX "BloodRecord_userId_key";

-- AlterTable
ALTER TABLE "BloodRecord" ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL DEFAULT 0;
