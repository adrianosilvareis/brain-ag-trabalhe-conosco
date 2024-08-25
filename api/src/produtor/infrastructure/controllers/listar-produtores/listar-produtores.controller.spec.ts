import { Produtor } from "@/produtor/domain/entities/produtor";
import { ListarProdutorUseCase } from "@/produtor/domain/use-cases/listar-produtor.use-case";
import { ListarProdutorController } from "./listar-produtores.controller";

describe("ListarProdutoresController", () => {
  it("deve retornar 200 e a lista de produtores quando for sucesso", async () => {
    const sut = new ListarProdutorController(new ListarProdutorUseCaseStub());
    const response = await sut.execute();
    expect(response).toEqual({
      status: 200,
      message: []
    });
  });

  it("deve retornar 500 e a mensagem 'Erro ao listar produtores' quando qualquer erro ocorrer", async () => {
    const useCaseThrow = new ListarProdutorUseCaseStub();
    useCaseThrow.callback = () => {
      throw new Error();
    };
    const sut = new ListarProdutorController(useCaseThrow);
    const response = await sut.execute();
    expect(response).toEqual({
      status: 500,
      message: "Erro ao listar produtores"
    });
  });
});

class ListarProdutorUseCaseStub implements ListarProdutorUseCase {
  lista: Produtor[] = [];
  callback: () => void = () => {};

  async listarProdutor(): Promise<Produtor[]> {
    this.callback();
    return this.lista;
  }
}
