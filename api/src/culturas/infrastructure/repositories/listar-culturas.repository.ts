import { Culturas } from "@/culturas/domain/entities/culturas";
import { ListarCulturaUseCase } from "@/culturas/domain/use-cases/listar-culturas.use-case";
import { PrismaClient } from "@prisma/client";

export class ListarCulturasRepository implements ListarCulturaUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async listarCultura(): Promise<Culturas[]> {
    const culturas = await this.prisma.cultura.findMany();

    return culturas.map((cultura) => {
      return new Culturas(cultura.id, cultura.nome);
    });
  }
}
