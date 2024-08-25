import { CriarProdutorController } from "@/produtor/infrastructure/controllers/criar-produtor/criar-produtor.controller";
import { EditarProdutorController } from "@/produtor/infrastructure/controllers/editar-produtor/editar-produtor.controller";
import { ExcluirProdutorController } from "@/produtor/infrastructure/controllers/excluir-produtor/excluir-produtor.controller";
import { GetProdutorController } from "@/produtor/infrastructure/controllers/get-produtor/get-produtor.controller";
import { ListarProdutorController } from "@/produtor/infrastructure/controllers/listar-produtores/listar-produtores.controller";
import { CriarProdutorRepository } from "@/produtor/infrastructure/repositories/criar-produtor.repository";
import { EditarProdutorRepository } from "@/produtor/infrastructure/repositories/editar-produtor.repository";
import { ExcluirProdutorRepository } from "@/produtor/infrastructure/repositories/excluir-produtor.repository";
import { GetProdutorRepository } from "@/produtor/infrastructure/repositories/get-produtor.repository";
import { ListarProdutorRepository } from "@/produtor/infrastructure/repositories/listar-produtor.repository";
import { RelatorioProdutoresController } from "../infrastructure/controllers/relatorio-produtores/relatorio-produtores.controller";
import { RelatorioProdutorRepository } from "../infrastructure/repositories/relatorio-produtor.use-case";

export const listarProdutorController = new ListarProdutorController(
  new ListarProdutorRepository()
);

export const getProdutorController = new GetProdutorController(
  new GetProdutorRepository()
);

export const excluirProdutorController = new ExcluirProdutorController(
  new ExcluirProdutorRepository()
);

export const criarProdutorController = new CriarProdutorController(
  new CriarProdutorRepository()
);

export const editarProdutorController = new EditarProdutorController(
  new EditarProdutorRepository()
);

export const relatorioProdutorController = new RelatorioProdutoresController(
  new RelatorioProdutorRepository()
);
