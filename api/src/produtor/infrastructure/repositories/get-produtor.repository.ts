import { CulturaDaFazenda } from "@/produtor/domain/entities/culturaDaFazenda";
import { Produtor } from "@/produtor/domain/entities/produtor";
import { GetProdutorUseCase } from "@/produtor/domain/use-cases/get-produtor.use-case";
import { PrismaClient } from "@prisma/client";

export class GetProdutorRepository implements GetProdutorUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getProdutor(idProdutor: number): Promise<Produtor | null> {
    const produtor = await this.prisma.produtor.findUnique({
      where: {
        id: Number(idProdutor)
      },
      include: {
        culturas: true
      }
    });

    if (!produtor) {
      return null;
    }

    return new Produtor(
      produtor.id,
      produtor.nomeProdutor,
      produtor.cpfCnpj,
      produtor.nomeFazenda,
      produtor.cidade,
      produtor.estado,
      produtor.areaTotal,
      produtor.areaAgricultavel,
      produtor.areaVegetacao,
      produtor.culturas.map(
        (cultura) =>
          new CulturaDaFazenda(cultura.culturaId, cultura.areaCultura)
      )
    );
  }
}
