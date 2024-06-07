-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applyer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appler_id" INTEGER NOT NULL,
    "cv" TEXT,

    CONSTRAINT "Applyer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applyer_email_key" ON "Applyer"("email");

-- AddForeignKey
ALTER TABLE "Applyer" ADD CONSTRAINT "Applyer_appler_id_fkey" FOREIGN KEY ("appler_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
