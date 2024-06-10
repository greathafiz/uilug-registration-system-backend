/*
  Warnings:

  - You are about to drop the column `whatsAppLink` on the `skills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "skills" DROP COLUMN "whatsAppLink";

-- AlterTable
ALTER TABLE "trainers" ADD COLUMN     "whatsAppLink" TEXT;
