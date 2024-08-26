import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";
import { EditarProdutorUseCase } from "@/produtor/domain/use-cases/editar-produtor.use-case";
import { Controller } from "@/protocols/controller";

type EditProps = { id: number } & Partial<AddProdutorProps>;

export class EditarProdutorController extends Controller<EditProps> {
  constructor(private readonly editarProdutor: EditarProdutorUseCase) {
    super();
  }

  async execute(
    body: EditProps
  ): Promise<{ status: number; message: unknown }> {
    try {
      const { id, ...produtorData } = body;
      const produtor = await this.editarProdutor.editarProdutor(
        body.id,
        produtorData
      );

      return {
        status: 201,
        message: produtor
      };
    } catch (error) {
      return {
        status: 500,
        message: "Erro ao editar produtor"
      };
    }
  }
}
