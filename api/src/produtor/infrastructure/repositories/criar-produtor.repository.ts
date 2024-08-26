import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";
import { CriarProdutorUseCase } from "@/produtor/domain/use-cases/criar-produtor.use-case";

import { PrismaClient } from "@prisma/client";

export class CriarProdutorRepository implements CriarProdutorUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async criarProdutor(produtor: AddProdutorProps): Promise<void> {
    const maxIdResult = await this.prisma.produtor.findFirst({
      orderBy: {
        id: "desc"
      },
      select: {
        id: true
      }
    });
    const newId = maxIdResult ? maxIdResult.id + 1 : 1;
    await this.prisma.produtor.create({
      data: {
        id: newId,
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

    if (produtor && produtor.culturas?.length > 0) {
      await this.prisma.culturasOnProdutor.createMany({
        data: produtor.culturas.map((cultura) => ({
          produtorId: Number(newId),
          culturaId: Number(cultura.culturaId),
          areaCultura: Number(cultura.areaCultura)
        }))
      });
    }
  }
}
