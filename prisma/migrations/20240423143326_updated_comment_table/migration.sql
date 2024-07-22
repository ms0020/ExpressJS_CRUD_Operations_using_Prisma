/*
  Warnings:

  - You are about to drop the column `like_count` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "like_count",
ADD COLUMN     "likeComment_count" INTEGER NOT NULL DEFAULT 0;
