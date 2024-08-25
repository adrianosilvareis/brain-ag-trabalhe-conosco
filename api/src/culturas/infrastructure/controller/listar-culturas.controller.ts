import { ListarCulturaUseCase } from "@/culturas/domain/use-cases/listar-culturas.use-case";
import { Controller } from "@/protocols/controller";

export class ListarCulturasController extends Controller {
  constructor(private readonly listarCulturasUseCase: ListarCulturaUseCase) {
    super();
  }

  async execute(): Promise<{ status: number; message: unknown }> {
    try {
      const culturas = await this.listarCulturasUseCase.listarCultura();

      return {
        status: 200,
        message: culturas
      };
    } catch (err) {
      return {
        status: 500,
        message: "Erro ao listar culturas"
      };
    }
  }
}
