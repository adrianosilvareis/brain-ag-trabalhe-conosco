import { ExcluirProdutorUseCase } from "@/produtor/domain/use-cases/excluir-produtor.use-case";
import { ExcluirProdutorController } from "./excluir-produtor.controller";

describe("ExcluirProdutorController", () => {
  it("deve retornar 200 e a mensagem 'Produtor excluído com sucesso'", async () => {
    const useCaseSuccess = new ExcluirProdutorUseCaseStub();

    const sut = new ExcluirProdutorController(useCaseSuccess);

    const response = await sut.execute({ id: 1 });
    expect(response).toEqual({
      status: 200,
      message: "Produtor excluído com sucesso"
    });
  });

  it("deve retornar 500 e a mensagem 'Erro ao retornar produtor' quando qualquer erro ocorrer", async () => {
    const useCaseThrow = new ExcluirProdutorUseCaseStub();
    useCaseThrow.callback = () => {
      throw new Error();
    };
    const sut = new ExcluirProdutorController(useCaseThrow);
    const response = await sut.execute({ id: 1 });
    expect(response).toEqual({
      status: 500,
      message: "Erro ao excluir produtor"
    });
  });
});

class ExcluirProdutorUseCaseStub implements ExcluirProdutorUseCase {
  callback: () => void = () => {};

  async excluirProdutor(id: number): Promise<void> {
    this.callback();
  }
}
