/*
  Warnings:

  - You are about to drop the column `amount` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `maxTeamMembers` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `minTeamMembers` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "amount",
DROP COLUMN "maxTeamMembers",
DROP COLUMN "minTeamMembers";
