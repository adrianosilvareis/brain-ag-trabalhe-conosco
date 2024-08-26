import { createContext, useCallback, useEffect, useState } from "react";
import { Produtor } from "../interfaces/produtor";
import { createProdutor, excluirProdutor, getAllProdutores, getProdutorById, listarProdutores, updateProdutor } from "../services/produtor.api";

type AppContextType = {
  produtores: Produtor[];
  produtor: Produtor | null;
  onGetProdutor: (id: number) => void,
  onUpdateProdutor: (id: number, body: Partial<Produtor>) => void,
  onCreateProdutor: (body: Partial<Produtor>) => void,
  onFetchProdutores: () => void,
  onDeleteProdutor: (id: number) => void
};

export const AppProdutorContext = createContext({} as AppContextType);

export function AppProdutorProvider({ children }: { children: React.ReactNode }) {
  const [produtores, setProdutores] = useState<Produtor[]>([]);
  const [produtor, setProdutor] = useState<Produtor | null>(null);

  useEffect(() => {
    const fetchCultura = async () => {
      const data = await listarProdutores();
      setProdutores(data);
    };

    fetchCultura();
  }, []);

  const onGetProdutor = useCallback(async (id: number) => {
    const data = await getProdutorById(id);
    setProdutor(data);
  }, []);

  const onUpdateProdutor = useCallback(async (id: number, body: Partial<Produtor>) => {
    const data = await updateProdutor(id, body);
    setProdutor(data);
  }, []);

  const onCreateProdutor = useCallback(async (body: Partial<Produtor>) => {
    const data = await createProdutor(body);
    setProdutor(data);
  }, []);

  const onFetchProdutores = useCallback(async () => {
    const data = await getAllProdutores();
    setProdutores(data);
  }, []);

  const onDeleteProdutor = useCallback(async (id: number) => {
    await excluirProdutor(id);
    onFetchProdutores()
  }, [onFetchProdutores]);

  return (
    <AppProdutorContext.Provider value={{
      produtores: produtores,
      produtor: produtor,
      onGetProdutor: onGetProdutor,
      onUpdateProdutor: onUpdateProdutor,
      onCreateProdutor: onCreateProdutor,
      onFetchProdutores: onFetchProdutores,
      onDeleteProdutor: onDeleteProdutor
    }}>{children}</AppProdutorContext.Provider>
  );
}