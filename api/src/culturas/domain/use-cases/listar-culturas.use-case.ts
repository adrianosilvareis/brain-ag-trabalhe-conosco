import { Culturas } from "@/culturas/domain/entities/culturas";

export abstract class ListarCulturaUseCase {
  abstract listarCultura(): Promise<Culturas[]>;
}
