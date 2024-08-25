import { ListarCulturasController } from "@/culturas/infrastructure/controller/listar-culturas.controller";
import { ListarCulturasRepository } from "@/culturas/infrastructure/repositories/listar-culturas.repository";

export const listarCulturasController = new ListarCulturasController(
  new ListarCulturasRepository()
);
