import { Produtor } from "@/produtor/domain/entities/produtor";
import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";
import { EditarProdutorUseCase } from "@/produtor/domain/use-cases/editar-produtor.use-case";
import { EditarProdutorController } from "./editar-produtor.controller";

describe("EditarProdutorController", () => {
  it("deve retornar 200 e o produtor quando for sucesso", async () => {
    const useCaseSuccess = new EditarProdutorUseCaseStub();

    const produtor = {
      id: 1,
      nomeProdutor: "Update",
      cpfCnpj: "12345678900",
      nomeFazenda: "Olhos D'água",
      cidade: "vitoria",
      estado: "ES",
      areaTotal: 500,
      areaAgricultavel: 300,
      areaVegetacao: 200,
      culturas: []
    };

    useCaseSuccess.produtor = produtor;

    const sut = new EditarProdutorController(useCaseSuccess);

    const response = await sut.execute(produtor);

    expect(response).toEqual({
      status: 201,
      message: produtor
    });
  });

  it("deve retornar 500 e a mensagem 'Erro ao retornar produtor' quando qualquer erro ocorrer", async () => {
    const useCaseThrow = new EditarProdutorUseCaseStub();
    useCaseThrow.callback = () => {
      throw new Error();
    };
    const sut = new EditarProdutorController(useCaseThrow);
    const response = await sut.execute({
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
    });

    expect(response).toEqual({
      status: 500,
      message: "Erro ao criar produtor"
    });
  });
});

class EditarProdutorUseCaseStub implements EditarProdutorUseCase {
  produtor!: Produtor;

  callback: () => void = () => {};

  async editarProdutor(
    id: number,
    produtor: Partial<AddProdutorProps>
  ): Promise<Produtor> {
    this.callback();
    return this.produtor;
  }
}
