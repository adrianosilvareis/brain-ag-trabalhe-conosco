import { ListarCulturaUseCase } from "@/culturas/domain/use-cases/listar-culturas.use-case";
import { Cultura } from "@prisma/client";
import { ListarCulturasController } from "./listar-culturas.controller";

describe("ListarCulturasController", () => {
  it("deve retornar 200 e a lista de culturas quando for sucesso", async () => {
    const sut = new ListarCulturasController(new ListarCulturasUseCaseStub());
    const response = await sut.execute();
    expect(response).toEqual({
      status: 200,
      message: []
    });
  });

  it("deve retornar 500 e a mensagem 'Erro ao listar produtores' quando qualquer erro ocorrer", async () => {
    const useCaseThrow = new ListarCulturasUseCaseStub();
    useCaseThrow.callback = () => {
      throw new Error();
    };
    const sut = new ListarCulturasController(useCaseThrow);
    const response = await sut.execute();
    expect(response).toEqual({
      status: 500,
      message: "Erro ao listar culturas"
    });
  });
});

class ListarCulturasUseCaseStub implements ListarCulturaUseCase {
  lista: Cultura[] = [];
  callback: () => void = () => {};

  async listarCultura(): Promise<Cultura[]> {
    this.callback();
    return this.lista;
  }
}
