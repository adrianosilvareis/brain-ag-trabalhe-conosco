import { Produtor } from "@/produtor/domain/entities/produtor";
import { ListarProdutorUseCase } from "@/produtor/domain/use-cases/listar-produtor.use-case";
import { PrismaClient } from "@prisma/client";

export class ListarProdutorRepository implements ListarProdutorUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async listarProdutor(): Promise<Produtor[]> {
    const produtores = await this.prisma.produtor.findMany();

    return produtores.map(
      (produtor) =>
        new Produtor(
          produtor.id,
          produtor.nomeProdutor,
          produtor.cpfCnpj,
          produtor.nomeFazenda,
          produtor.cidade,
          produtor.estado,
          produtor.areaTotal,
          produtor.areaAgricultavel,
          produtor.areaVegetacao,
          []
        )
    );
  }
}
