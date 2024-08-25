import { Produtor } from "@/produtor/domain/entities/produtor";
import { PrismaClient } from "@prisma/client";
import { culturas } from "./culturas";
import { geraProdutor } from "./produtores";

const prisma = new PrismaClient();

const produtores: Omit<Produtor, "culturas">[] = [];
for (let i = 0; i < 15; i++) {
  produtores.push({ id: i + 1, ...geraProdutor() });
}

const findCultura = (i: number) => {
  if (culturas.length > i) {
    return i + 1;
  }
  return findCultura(i - culturas.length);
};

async function main() {
  const hasCultura = await prisma.cultura.findFirst();
  if (hasCultura) return;

  await prisma.cultura.createMany({
    data: culturas.map((cultura, i) => ({ id: i + 1, nome: cultura }))
  });

  await prisma.produtor.createMany({
    data: produtores
  });

  const culturasOnProdutor = produtores.map((produtor, i) => {
    const culturaId = findCultura(i);
    return {
      produtorId: produtor.id,
      culturaId: culturaId,
      areaCultura: produtor.areaAgricultavel
    };
  });

  await prisma.culturasOnProdutor.createMany({
    data: culturasOnProdutor
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
