import { Produtor } from "@/produtor/domain/entities/produtor";

export abstract class GetProdutorUseCase {
  abstract getProdutor(id: number): Promise<Produtor | null>;
}
