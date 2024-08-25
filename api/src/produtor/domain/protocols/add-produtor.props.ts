export interface AddProdutorCulturaProps {
  idCultura: number;
  areaCultura: number;
}

export interface AddProdutorProps {
  nomeProdutor: string;
  cpfCnpj: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  culturas: AddProdutorCulturaProps[];
}
