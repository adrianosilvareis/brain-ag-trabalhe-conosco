import { RelatorioProdutores } from "@/produtor/domain/entities/relatorio-produtores";

export abstract class RelatorioProdutorUseCase {
  abstract relatorioProdutor(): Promise<RelatorioProdutores>;
}
