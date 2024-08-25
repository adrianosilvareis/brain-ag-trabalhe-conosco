import { ExcluirProdutorUseCase } from "@/produtor/domain/use-cases/excluir-produtor.use-case";
import { PrismaClient } from "@prisma/client";

export class ExcluirProdutorRepository implements ExcluirProdutorUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async excluirProdutor(idProdutor: number): Promise<void> {
    const culturas = await this.prisma.culturasOnProdutor.findMany({
      where: {
        produtorId: Number(idProdutor)
      }
    });

    if (culturas.length > 0) {
      await this.prisma.culturasOnProdutor.deleteMany({
        where: {
          produtorId: Number(idProdutor)
        }
      });
    }

    await this.prisma.produtor.delete({
      where: {
        id: Number(idProdutor)
      }
    });
  }
}
