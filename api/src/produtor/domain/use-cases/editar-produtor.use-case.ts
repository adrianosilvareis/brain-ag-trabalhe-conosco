import { Produtor } from "@/produtor/domain/entities/produtor";
import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";

export abstract class EditarProdutorUseCase {
  abstract editarProdutor(
    id: number,
    produtor: Partial<AddProdutorProps>
  ): Promise<Produtor>;
}
