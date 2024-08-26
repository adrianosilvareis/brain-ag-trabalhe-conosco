export interface Relatorio {
  totalFazendas: number;
  totalHectares: number;
  totalFazendasPorEstado: { [key: string]: number };
  totalFazendasPorCultura: { [key: string]: number };
  usoSolo: {
    agricultavel: number;
    vegetacao: number;
  };
}
