import { useEffect, useState } from "react";
import ListarCultura from "../components/ListarCultura";
import ProdutorForm, { Produtor as ProdutorFormulario } from "../components/ProdutorForm";
import { useProdutorContext } from "../hooks/useProdutorContext";
import { Culturas } from "../interfaces/culturas";
import { Produtor } from "../interfaces/produtor";

function ProdutoPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [culturasProdutor, setCulturasProdutor] = useState<Culturas[]>([]);
  const [formData, setFormData] = useState<Partial<Produtor> | null>(null);

  const { onGetProdutor, produtor, onUpdateProdutor } = useProdutorContext();

  useEffect(() => {
    if (!produtor) {
      onGetProdutor(1);
    }
    if (loading && produtor !== null) {
      setCulturasProdutor(produtor?.culturas ?? []);
      setFormData({
        ...produtor,
        cpfCnpj: produtor.cpfCnpj.replace(/[^0-9]/g, ''),
      });
      setLoading(false);
    }
  }, [onGetProdutor, loading, produtor]);

  const onAddCultura = (props: Culturas) => {
    const culturas = [...culturasProdutor, props];
    setCulturasProdutor(culturas);
    setFormData({
      ...formData,
      culturas
    });
  };
  const onRemoveCultura = (culturaId: number) => {
    const culturas = culturasProdutor.filter(cultura => cultura.culturaId !== culturaId);
    setCulturasProdutor(culturas);
    setFormData({
      ...formData,
      culturas
    });
  };

  function handleProdutor(data: ProdutorFormulario) {
    const updated = {
      ...formData,
      ...data
    };

    setFormData(updated)
    onUpdateProdutor((formData?.id as number), updated as Partial<Produtor>);
  }


  if (formData === null) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      <ProdutorForm produtor={formData} handleProdutor={handleProdutor} />

      <ListarCultura culturasProdutor={culturasProdutor} onAddCultura={onAddCultura} onRemoveCultura={onRemoveCultura} />
    </div >
  )
}

export default ProdutoPage;