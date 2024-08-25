import { RelatorioProdutores } from "@/produtor/domain/entities/relatorio-produtores";
import { RelatorioProdutorUseCase } from "@/produtor/domain/use-cases/relatorio-produtor.use-case";
import { RelatorioProdutoresController } from "./relatorio-produtores.controller";

describe("RelatorioProdutoresController", () => {
  it("deve retornar 200 e o relatorio quando for sucesso", async () => {
    const relatorio = new RelatorioProdutores(
      0,
      0,
      {},
      {},
      { agricultavel: 0, vegetacao: 0 }
    );
    const useCase = new RelatorioProdutorUseCaseStub();
    useCase.relatorio = relatorio;

    const sut = new RelatorioProdutoresController(useCase);
    const response = await sut.execute();
    expect(response).toEqual({
      status: 200,
      message: relatorio
    });
  });

  it("deve retornar 500 e a mensagem 'Erro ao listar produtores' quando qualquer erro ocorrer", async () => {
    const useCaseThrow = new RelatorioProdutorUseCaseStub();
    useCaseThrow.callback = () => {
      throw new Error();
    };
    const sut = new RelatorioProdutoresController(useCaseThrow);
    const response = await sut.execute();
    expect(response).toEqual({
      status: 500,
      message: "Erro ao listar produtores"
    });
  });
});

class RelatorioProdutorUseCaseStub implements RelatorioProdutorUseCase {
  relatorio!: RelatorioProdutores;
  callback: () => void = () => {};

  async relatorioProdutor(): Promise<RelatorioProdutores> {
    this.callback();
    return this.relatorio;
  }
}
