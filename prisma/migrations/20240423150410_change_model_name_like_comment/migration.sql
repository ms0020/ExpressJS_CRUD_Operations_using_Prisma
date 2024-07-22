/*
  Warnings:

  - You are about to drop the `LikeComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikeComment" DROP CONSTRAINT "LikeComment_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "LikeComment" DROP CONSTRAINT "LikeComment_user_id_fkey";

-- DropTable
DROP TABLE "LikeComment";

-- CreateTable
CREATE TABLE "likeComment" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likeComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likeComment" ADD CONSTRAINT "likeComment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likeComment" ADD CONSTRAINT "likeComment_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;