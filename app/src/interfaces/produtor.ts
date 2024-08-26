import { Culturas } from "./culturas";

export interface Produtor {
  id: number;
  nomeProdutor: string;
  cpfCnpj: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  culturas: Culturas[];
}
