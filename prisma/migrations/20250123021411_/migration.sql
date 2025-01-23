/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Cheklist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cheklist_date_key" ON "Cheklist"("date");
