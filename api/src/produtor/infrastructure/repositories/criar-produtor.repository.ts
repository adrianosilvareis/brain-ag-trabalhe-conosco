import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";
import { CriarProdutorUseCase } from "@/produtor/domain/use-cases/criar-produtor.use-case";

import { PrismaClient } from "@prisma/client";

export class CriarProdutorRepository implements CriarProdutorUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async criarProdutor(produtor: AddProdutorProps): Promise<void> {
    const createdProdutor = await this.prisma.produtor.create({
      data: {
        nomeProdutor: produtor.nomeProdutor,
        nomeFazenda: produtor.nomeFazenda,
        estado: produtor.estado,
        cidade: produtor.cidade,
        cpfCnpj: produtor.cpfCnpj,
        areaAgricultavel: produtor.areaAgricultavel,
        areaVegetacao: produtor.areaVegetacao,
        areaTotal: produtor.areaAgricultavel + produtor.areaVegetacao
      }
    });

    await this.prisma.culturasOnProdutor.createMany({
      data: produtor.culturas.map((cultura) => ({
        produtorId: Number(createdProdutor.id),
        culturaId: Number(cultura.culturaId),
        areaCultura: Number(cultura.areaCultura)
      }))
    });
  }
}
