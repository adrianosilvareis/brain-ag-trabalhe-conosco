import { RelatorioProdutores } from "@/produtor/domain/entities/relatorio-produtores";
import { RelatorioProdutorUseCase } from "@/produtor/domain/use-cases/relatorio-produtor.use-case";
import { PrismaClient } from "@prisma/client";

export class RelatorioProdutorRepository implements RelatorioProdutorUseCase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async relatorioProdutor(): Promise<RelatorioProdutores> {
    const produtores = await this.prisma.produtor.findMany({
      include: {
        culturas: true
      }
    });

    const culturas = await this.prisma.cultura.findMany();

    const totalFazendas = produtores.length;
    const totalHectares = produtores.reduce(
      (acc, produtor) => acc + produtor.areaTotal,
      0
    );
    const totalFazendasPorEstado = produtores.reduce(
      (acc: { [key: string]: number }, produtor) => {
        acc[produtor.estado] = acc[produtor.estado] + 1 || 1;
        return acc;
      },
      {}
    );

    const totalFazendasPorCultura = produtores.reduce(
      (acc: { [key: string]: number }, produtor) => {
        produtor.culturas.forEach((cultura) => {
          const culturaName =
            culturas.find((c) => c.id === cultura.culturaId)?.nome ??
            cultura.culturaId;

          acc[culturaName] =
            acc[culturaName] + cultura.areaCultura || cultura.areaCultura;
        });
        return acc;
      },
      {}
    );

    const usoDoSolo = produtores.reduce(
      (acc, produtor) => {
        acc.agricultavel += produtor.areaAgricultavel;
        acc.vegetacao += produtor.areaVegetacao;
        return acc;
      },
      { agricultavel: 0, vegetacao: 0 }
    );

    return new RelatorioProdutores(
      totalFazendas,
      totalHectares,
      totalFazendasPorEstado,
      totalFazendasPorCultura,
      usoDoSolo
    );
  }
}
