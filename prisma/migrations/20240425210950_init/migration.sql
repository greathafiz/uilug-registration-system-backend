-- CreateTable
CREATE TABLE "students" (
    "student_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matric_number" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "admins" (
    "admin_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "skills" (
    "skill_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "skill_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "trainer_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "skills_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "trainers" ("trainer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "trainers" (
    "trainer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trainer_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "registrations" (
    "registration_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "date_registered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "registrations_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students" ("student_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registrations_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills" ("skill_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "students_matric_number_key" ON "students"("matric_number");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "skills_trainer_id_key" ON "skills"("trainer_id");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_student_id_key" ON "registrations"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_skill_id_key" ON "registrations"("skill_id");
