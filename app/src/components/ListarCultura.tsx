import { useState } from "react"
import { useCulturaContext } from "../hooks/useCulturaContext"
import { Culturas } from "../interfaces/culturas"

type ListarCulturaProps = {
  culturasProdutor: Culturas[]
  onAddCultura: (cultura: Culturas) => void,
  onRemoveCultura: (culturaId: number) => void
}

type CulturaProps = {
  culturaId: number,
  areaCultura: number
}

function ListarCultura({ culturasProdutor, onAddCultura, onRemoveCultura }: ListarCulturaProps) {
  const { culturas } = useCulturaContext();
  const [disabled, setDisabled] = useState<boolean>(true);

  const [formData, setFormData] = useState<CulturaProps>({
    culturaId: 0,
    areaCultura: 0,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const updated = {
      ...formData,
      [name]: value
    };

    setFormData(updated);
    setDisabled(!updated.areaCultura || !updated.culturaId);
  };

  const addCultura = () => {
    onAddCultura(formData);
    setFormData({
      culturaId: 0,
      areaCultura: 0,
    });
    setDisabled(true);
  }

  if (!culturas.length) {
    return <div>Carregando...</div>
  }

  const list = culturasProdutor.map(cultura => {
    return {
      id: cultura.culturaId,
      name: culturas.find(c => Number(c.id) === Number(cultura.culturaId))?.nome,
      area: cultura.areaCultura
    }
  })

  return (
    <div className="grid grid-cols-3 gap-3 p-5">
      <h1 className="col-span-3 text-base font-semibold leading-7 text-gray-900">Culturas do produtor</h1>
      <div>
        <label className="text-sm font-medium leading-6 text-gray-900">Culturas</label>
        <select onChange={handleChange} value={formData.culturaId} id="cultura" name="culturaId" className="w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600" >
          <option value="0">Selecione uma cultura</option>)
          {
            culturas.map(cultura =>
              <option key={cultura.id} value={cultura.id}>{cultura.nome}</option>)
          }
        </select>
      </div>
      <div>
        <label className="text-sm font-medium leading-6 text-gray-900">Área de cultura</label>
        <input onChange={handleChange} value={formData.areaCultura} placeholder="Área" type="text" name="areaCultura" id="areaCultura" className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600" />
      </div>
      <div>
        <button disabled={disabled} onClick={addCultura} type="button" className="mt-6 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Adicionar Cultura</button>
      </div>
      <div className="col-span-2">

        <ul className="divide-y divide-gray-100">

          {
            list.length === 0 ? <li className="pl-5 flex justify-between gap-x-6 py-5 shadow">Nenhuma cultura registrada para este produtor</li> :
              list.map((cultura, index) => (
                <li className="flex justify-between gap-x-6 py-5 shadow" key={index}>
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900 pl-5">{cultura.name}</p>
                    </div>
                  </div>
                  <div className="shrink-0 items-end pr-5">{cultura.area} hectares
                    <button onClick={() => onRemoveCultura(cultura.id)} type="button" className="ml-2 rounded-md bg-red-300 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500">X</button>
                  </div>
                </li>
              ))
          }
        </ul>
      </div>
    </div>
  );
}

export default ListarCultura;