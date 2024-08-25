import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";
import { CriarProdutorUseCase } from "@/produtor/domain/use-cases/criar-produtor.use-case";
import { CriarProdutorController } from "./criar-produtor.controller";

describe("CriarProdutorController", () => {
  it("deve retornar 200 e o produtor quando for sucesso", async () => {
    const useCaseSuccess = new CriarProdutorUseCaseStub();

    const sut = new CriarProdutorController(useCaseSuccess);

    const response = await sut.execute({
      nomeProdutor: "Adriano",
      cpfCnpj: "12345678900",
      nomeFazenda: "Olhos D'água",
      cidade: "vitoria",
      estado: "ES",
      areaTotal: 500,
      areaAgricultavel: 300,
      areaVegetacao: 200,
      culturas: []
    });

    expect(response).toEqual({
      status: 201,
      message: "Produtor criado com sucesso"
    });
  });

  it("deve retornar 500 e a mensagem 'Erro ao retornar produtor' quando qualquer erro ocorrer", async () => {
    const useCaseThrow = new CriarProdutorUseCaseStub();
    useCaseThrow.callback = () => {
      throw new Error();
    };
    const sut = new CriarProdutorController(useCaseThrow);
    const response = await sut.execute({
      nomeProdutor: "Adriano",
      cpfCnpj: "12345678900",
      nomeFazenda: "Olhos D'água",
      cidade: "vitoria",
      estado: "ES",
      areaTotal: 500,
      areaAgricultavel: 300,
      areaVegetacao: 200,
      culturas: []
    });

    expect(response).toEqual({
      status: 500,
      message: "Erro ao criar produtor"
    });
  });
});

class CriarProdutorUseCaseStub implements CriarProdutorUseCase {
  callback: () => void = () => {};

  async criarProdutor(produtor: AddProdutorProps): Promise<void> {
    this.callback();
  }
}
