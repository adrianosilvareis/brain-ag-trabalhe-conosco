import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListarCultura from "../components/ListarCultura";
import ProdutorForm, { Produtor as ProdutorFormulario } from "../components/ProdutorForm";
import { useProdutorContext } from "../hooks/useProdutorContext";
import { Culturas } from "../interfaces/culturas";
import { Produtor } from "../interfaces/produtor";

function ProdutorPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isNew = location.pathname === '/new';
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [culturasProdutor, setCulturasProdutor] = useState<Culturas[]>([]);
  const [formData, setFormData] = useState<Partial<Produtor> | null>(null);

  const { onGetProdutor, produtor, onUpdateProdutor, onCreateProdutor, onFetchProdutores } = useProdutorContext();

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }
    if (!produtor || produtor?.id !== Number(id)) {
      onGetProdutor(Number(id));
    }
    if (loading && produtor !== null && produtor?.id === Number(id)) {
      setCulturasProdutor(produtor?.culturas ?? []);
      setFormData({
        ...produtor,
        cpfCnpj: produtor.cpfCnpj.replace(/[^0-9]/g, ''),
      });
      setLoading(false);
    }
  }, [onGetProdutor, loading, produtor, id, isNew]);

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
    if (isNew) {
      onCreateProdutor(updated);
      setTimeout(() => {
        onFetchProdutores();
      }, 500);
      navigate('/list')
      return;
    }
    onUpdateProdutor((formData?.id as number), updated as Partial<Produtor>);
  }

  return (
    <div>
      <ProdutorForm produtor={formData} handleProdutor={handleProdutor} />

      <ListarCultura culturasProdutor={culturasProdutor} onAddCultura={onAddCultura} onRemoveCultura={onRemoveCultura} />
    </div >
  )
}

export default ProdutorPage;