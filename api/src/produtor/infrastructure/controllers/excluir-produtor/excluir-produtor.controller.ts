import { ExcluirProdutorUseCase } from "@/produtor/domain/use-cases/excluir-produtor.use-case";
import { Controller } from "@/protocols/controller";

export class ExcluirProdutorController extends Controller<{ id: number }> {
  constructor(private readonly excluirProdutor: ExcluirProdutorUseCase) {
    super();
  }

  async execute(body: {
    id: number;
  }): Promise<{ status: number; message: unknown }> {
    try {
      await this.excluirProdutor.excluirProdutor(body.id);

      return {
        status: 200,
        message: "Produtor excluído com sucesso"
      };
    } catch (error) {
      return {
        status: 500,
        message: "Erro ao excluir produtor"
      };
    }
  }
}
