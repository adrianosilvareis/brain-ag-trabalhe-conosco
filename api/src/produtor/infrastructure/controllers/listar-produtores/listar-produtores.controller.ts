import { ListarProdutorUseCase } from "@/produtor/domain/use-cases/listar-produtor.use-case";
import { Controller } from "@/protocols/controller";

export class ListarProdutorController extends Controller {
  constructor(private readonly listarProdutor: ListarProdutorUseCase) {
    super();
  }

  async execute(): Promise<{ status: number; message: unknown }> {
    try {
      const produtores = await this.listarProdutor.listarProdutor();

      return {
        status: 200,
        message: produtores
      };
    } catch (error) {
      return {
        status: 500,
        message: "Erro ao listar produtores"
      };
    }
  }
}
