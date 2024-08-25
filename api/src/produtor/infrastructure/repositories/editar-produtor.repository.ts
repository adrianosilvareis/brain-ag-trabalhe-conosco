import { Produtor } from "@/produtor/domain/entities/produtor";
import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";
import { EditarProdutorUseCase } from "@/produtor/domain/use-cases/editar-produtor.use-case";

import { PrismaClient } from "@prisma/client";

export class EditarProdutorRepository implements EditarProdutorUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async editarProdutor(
    id: number,
    produtor: Partial<AddProdutorProps>
  ): Promise<Produtor> {
    const { culturas, ...produtorData } = produtor;

    if (culturas?.length) {
      await this.prisma.culturasOnProdutor.deleteMany({
        where: {
          produtorId: id
        }
      });
      await this.prisma.culturasOnProdutor.createMany({
        data: culturas.map((cultura) => ({
          culturaId: cultura.idCultura,
          areaCultura: cultura.areaCultura,
          produtorId: id
        }))
      });
    }
    const produtorAtualizado = await this.prisma.produtor.update({
      where: { id: Number(id) },
      data: {
        ...produtorData
      },
      include: {
        culturas: true
      }
    });

    return produtorAtualizado;
  }
}
