import { Produtor } from "@/produtor/domain/entities/produtor";

export abstract class ListarProdutorUseCase {
  abstract listarProdutor(): Promise<Produtor[]>;
}
