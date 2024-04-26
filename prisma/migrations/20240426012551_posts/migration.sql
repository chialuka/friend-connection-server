-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "postId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "post" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("postId")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
