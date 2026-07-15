-- AlterTable
ALTER TABLE "QuestionAnswer" ADD COLUMN "roundType" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "resumeName" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InterviewSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "skills" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'full',
    "level" TEXT NOT NULL DEFAULT 'easy',
    "roundScores" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_InterviewSession" ("category", "createdAt", "date", "difficulty", "duration", "id", "role", "score", "skills") SELECT "category", "createdAt", "date", "difficulty", "duration", "id", "role", "score", "skills" FROM "InterviewSession";
DROP TABLE "InterviewSession";
ALTER TABLE "new_InterviewSession" RENAME TO "InterviewSession";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
