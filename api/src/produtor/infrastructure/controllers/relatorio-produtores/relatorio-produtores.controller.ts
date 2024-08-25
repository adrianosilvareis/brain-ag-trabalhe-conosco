import { RelatorioProdutorUseCase } from "@/produtor/domain/use-cases/relatorio-produtor.use-case";
import { Controller } from "@/protocols/controller";

export class RelatorioProdutoresController extends Controller {
  constructor(private readonly relatorio: RelatorioProdutorUseCase) {
    super();
  }

  async execute(): Promise<{ status: number; message: unknown }> {
    try {
      const relatorio = await this.relatorio.relatorioProdutor();

      return {
        status: 200,
        message: relatorio
      };
    } catch (error) {
      return {
        status: 500,
        message: "Erro ao listar produtores"
      };
    }
  }
}
