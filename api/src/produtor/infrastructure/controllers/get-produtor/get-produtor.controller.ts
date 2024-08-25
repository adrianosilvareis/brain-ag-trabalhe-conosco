import { GetProdutorUseCase } from "@/produtor/domain/use-cases/get-produtor.use-case";
import { Controller } from "@/protocols/controller";

export class GetProdutorController extends Controller<{ id: number }> {
  constructor(private readonly getProdutor: GetProdutorUseCase) {
    super();
  }

  async execute(body: {
    id: number;
  }): Promise<{ status: number; message: unknown }> {
    try {
      const produtor = await this.getProdutor.getProdutor(body.id);

      return {
        status: 200,
        message: produtor
      };
    } catch (error) {
      return {
        status: 500,
        message: "Erro ao retornar produtor"
      };
    }
  }
}
