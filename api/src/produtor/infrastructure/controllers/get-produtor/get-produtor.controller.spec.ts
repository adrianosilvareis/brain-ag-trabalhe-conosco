import { Produtor } from "@/produtor/domain/entities/produtor";
import { GetProdutorUseCase } from "@/produtor/domain/use-cases/get-produtor.use-case";
import { GetProdutorController } from "./get-produtor.controller";

describe("GetProdutorController", () => {
  it("deve retornar 200 e o produtor quando for sucesso", async () => {
    const useCaseSuccess = new GetProdutorUseCaseStub();
    useCaseSuccess.produtor = {
      id: 1,
      nomeProdutor: "Adriano",
      cpfCnpj: "12345678900",
      nomeFazenda: "Olhos D'água",
      cidade: "vitoria",
      estado: "ES",
      areaTotal: 500,
      areaAgricultavel: 300,
      areaVegetacao: 200,
      culturas: []
    };

    const sut = new GetProdutorController(useCaseSuccess);

    const response = await sut.execute({ id: 1 });
    expect(response).toEqual({
      status: 200,
      message: {
        id: 1,
        nomeProdutor: "Adriano",
        cpfCnpj: "12345678900",
        nomeFazenda: "Olhos D'água",
        cidade: "vitoria",
        estado: "ES",
        areaTotal: 500,
        areaAgricultavel: 300,
        areaVegetacao: 200,
        culturas: []
      }
    });
  });

  it("deve retornar 500 e a mensagem 'Erro ao retornar produtor' quando qualquer erro ocorrer", async () => {
    const useCaseThrow = new GetProdutorUseCaseStub();
    useCaseThrow.callback = () => {
      throw new Error();
    };
    const sut = new GetProdutorController(useCaseThrow);
    const response = await sut.execute({ id: 1 });
    expect(response).toEqual({
      status: 500,
      message: "Erro ao retornar produtor"
    });
  });
});

class GetProdutorUseCaseStub implements GetProdutorUseCase {
  produtor: Produtor | null = null;
  callback: () => void = () => {};

  async getProdutor(id: number): Promise<Produtor | null> {
    this.callback();
    return this.produtor;
  }
}
