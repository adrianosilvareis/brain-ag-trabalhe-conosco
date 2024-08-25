import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";

export abstract class CriarProdutorUseCase {
  abstract criarProdutor(produtor: AddProdutorProps): Promise<void>;
}
