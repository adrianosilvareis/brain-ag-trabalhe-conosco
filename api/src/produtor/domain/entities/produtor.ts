import { CulturaDaFazenda } from "./culturaDaFazenda";

export class Produtor {
  constructor(
    public id: number,
    public nomeProdutor: string,
    public cpfCnpj: string,
    public nomeFazenda: string,
    public cidade: string,
    public estado: string,
    public areaTotal: number,
    public areaAgricultavel: number,
    public areaVegetacao: number,
    public culturas: CulturaDaFazenda[]
  ) {}
}
