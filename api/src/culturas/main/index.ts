import { routerAdapter } from "@/protocols/router-adapter";
import { Router } from "express";
import { listarCulturasController } from "./culturas.build";

export const culturasRouters = (app: Router) => {
  app.get("/cultura", routerAdapter(listarCulturasController));
  return app;
};
