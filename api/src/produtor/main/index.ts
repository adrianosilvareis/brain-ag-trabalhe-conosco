import { routerAdapter } from "@/protocols/router-adapter";
import { Router } from "express";
import {
  criarProdutorController,
  editarProdutorController,
  excluirProdutorController,
  getProdutorController,
  listarProdutorController,
  relatorioProdutorController
} from "./produtores.build";

export const produtoresRouters = (app: Router) => {
  app.get("/produtor", routerAdapter(listarProdutorController));
  app.get("/produtor/relatorio", routerAdapter(relatorioProdutorController));
  app.post("/produtor", routerAdapter(criarProdutorController));
  app.get("/produtor/:id", routerAdapter(getProdutorController));
  app.put("/produtor/:id", routerAdapter(editarProdutorController));
  app.delete("/produtor/:id", routerAdapter(excluirProdutorController));
  return app;
};
