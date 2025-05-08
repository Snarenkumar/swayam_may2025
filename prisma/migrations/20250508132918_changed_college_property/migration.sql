/*
  Warnings:

  - You are about to drop the column `college` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `collegeName` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "college",
ADD COLUMN     "collegeName" TEXT NOT NULL;
