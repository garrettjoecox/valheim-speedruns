-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rules" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leaderboardId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "proofUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    FOREIGN KEY ("leaderboardId") REFERENCES "Leaderboard" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.password_unique" ON "User"("password");
