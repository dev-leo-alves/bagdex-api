/*
  Warnings:

  - The primary key for the `tier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tier` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_tier" ("id", "name", "url") SELECT "id", "name", "url" FROM "tier";
DROP TABLE "tier";
ALTER TABLE "new_tier" RENAME TO "tier";
CREATE UNIQUE INDEX "tier_name_key" ON "tier"("name");
CREATE UNIQUE INDEX "tier_url_key" ON "tier"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
