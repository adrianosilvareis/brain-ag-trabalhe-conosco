export abstract class ExcluirProdutorUseCase {
  abstract excluirProdutor(id: number): Promise<void>;
}
