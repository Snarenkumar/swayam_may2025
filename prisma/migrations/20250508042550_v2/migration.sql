/*
  Warnings:

  - You are about to drop the column `maxPaticipants` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `minPaticipants` on the `events` table. All the data in the column will be lost.
  - Added the required column `name` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "maxPaticipants",
DROP COLUMN "minPaticipants",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "maxTeamMembers" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "minTeamMembers" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "usn" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
