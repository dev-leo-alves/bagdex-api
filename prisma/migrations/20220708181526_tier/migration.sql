-- CreateTable
CREATE TABLE "tier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tier_name_key" ON "tier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tier_url_key" ON "tier"("url");
