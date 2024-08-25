-- CreateTable
CREATE TABLE "Produtor" (
    "id" SERIAL NOT NULL,
    "nomeProdutor" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "nomeFazenda" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "areaTotal" DOUBLE PRECISION NOT NULL,
    "areaAgricultavel" DOUBLE PRECISION NOT NULL,
    "areaVegetacao" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Produtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CulturasOnProdutor" (
    "produtorId" INTEGER NOT NULL,
    "culturaId" INTEGER NOT NULL,
    "areaCultura" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CulturasOnProdutor_pkey" PRIMARY KEY ("produtorId","culturaId")
);

-- CreateTable
CREATE TABLE "Cultura" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Cultura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produtor_cpfCnpj_key" ON "Produtor"("cpfCnpj");

-- AddForeignKey
ALTER TABLE "CulturasOnProdutor" ADD CONSTRAINT "CulturasOnProdutor_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CulturasOnProdutor" ADD CONSTRAINT "CulturasOnProdutor_culturaId_fkey" FOREIGN KEY ("culturaId") REFERENCES "Cultura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
