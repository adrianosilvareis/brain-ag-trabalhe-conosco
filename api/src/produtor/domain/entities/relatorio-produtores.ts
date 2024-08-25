export class RelatorioProdutores {
  constructor(
    public totalFazendas: number,
    public totalHectares: number,
    public totalFazendasPorEstado: { [key: string]: number },
    public totalFazendasPorCultura: { [key: string]: number },
    public usoSolo: {
      agricultavel: number;
      vegetacao: number;
    }
  ) {}
}
