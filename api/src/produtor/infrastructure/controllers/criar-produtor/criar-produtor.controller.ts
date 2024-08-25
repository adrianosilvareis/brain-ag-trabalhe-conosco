import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";
import { CriarProdutorUseCase } from "@/produtor/domain/use-cases/criar-produtor.use-case";
import { Controller } from "@/protocols/controller";

export class CriarProdutorController extends Controller<AddProdutorProps> {
  constructor(private readonly criarProdutor: CriarProdutorUseCase) {
    super();
  }

  async execute(
    body: AddProdutorProps
  ): Promise<{ status: number; message: unknown }> {
    try {
      const produtor = await this.criarProdutor.criarProdutor(body);

      return {
        status: 201,
        message: "Produtor criado com sucesso"
      };
    } catch (error) {
      return {
        status: 500,
        message: "Erro ao criar produtor"
      };
    }
  }
}
