import { useEffect } from "react";
import { useProdutorContext } from "../hooks/useProdutorContext";

function ProdutorList() {
  const { onFetchProdutores, produtores, onDeleteProdutor } = useProdutorContext();

  useEffect(() => {
    if (produtores.length === 0) {
      onFetchProdutores();
    }
  }, [onFetchProdutores, produtores]);

  function novo() {

  }

  function editar(id: number) {

  }

  function excluir(id: number) {
    onDeleteProdutor(id)
  }

  return (
    <div className="p-5">

      <h1 className="col-span-3 text-base font-semibold leading-7 text-gray-900">Produtores</h1>
      <button onClick={novo} className="m-1 rounded-md bg-blue-200 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Adicionar Produtor</button>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2">Nome do Produtor</th>
            <th className="py-2">Nome da Fazenda</th>
            <th className="py-2">Área total da fazenda</th>
            <th className="py-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {
            produtores.map((produtor, index) => (
              <tr key={index}>
                <td className="py-2">{produtor.nomeProdutor}</td>
                <td className="py-2">{produtor.nomeFazenda}</td>
                <td className="py-2">{Math.round(produtor.areaTotal)} Hectares</td>
                <td className="py-2">
                  <button onClick={() => editar(produtor.id)} className="m-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Editar</button>
                  <button onClick={() => excluir(produtor.id)} className="m-1 rounded-md bg-red-200 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Excluir</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default ProdutorList;