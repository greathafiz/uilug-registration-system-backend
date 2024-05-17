/*
  Warnings:

  - You are about to drop the column `fullName` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slots` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_skills" (
    "skill_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "skill_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "slots" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "skills_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers" ("trainer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_skills" ("createdAt", "description", "skill_id", "skill_name", "trainer_id", "updatedAt") SELECT "createdAt", "description", "skill_id", "skill_name", "trainer_id", "updatedAt" FROM "skills";
DROP TABLE "skills";
ALTER TABLE "new_skills" RENAME TO "skills";
CREATE UNIQUE INDEX "skills_trainer_id_key" ON "skills"("trainer_id");
CREATE TABLE "new_students" (
    "student_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matric_number" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_students" ("email", "matric_number", "student_id") SELECT "email", "matric_number", "student_id" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE UNIQUE INDEX "students_matric_number_key" ON "students"("matric_number");
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");
