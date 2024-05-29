/*
  Warnings:

  - Added the required column `department` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_students" (
    "student_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matric_number" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "level" TEXT NOT NULL
);
INSERT INTO "new_students" ("email", "full_name", "matric_number", "student_id") SELECT "email", "full_name", "matric_number", "student_id" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE UNIQUE INDEX "students_matric_number_key" ON "students"("matric_number");
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
