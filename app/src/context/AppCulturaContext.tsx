import { createContext, useEffect, useState } from "react";
import { listarCultura } from "../services/cultura.api";

export type Cultura = {
  id: string;
  nome: string;
};

type AppContextType = {
  culturas: Cultura[];
};

export const AppCulturaContext = createContext({} as AppContextType);

export function AppCulturaProvider({ children }: { children: React.ReactNode }) {
  const [culturas, setCulturas] = useState<Cultura[]>([]);

  useEffect(() => {
    const fetchCultura = async () => {
      const data = await listarCultura();
      setCulturas(data);
    };

    fetchCultura();
  }, []);

  return (
    <AppCulturaContext.Provider value={{ culturas }}>{children}</AppCulturaContext.Provider>
  );
}