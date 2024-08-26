import { zodResolver } from '@hookform/resolvers/zod';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { z } from "zod";

const produtorSchema = z.object({
  nomeProdutor: z.string().min(3),
  cpfCnpj: z
    .string({
      required_error: 'CPF/CNPJ é obrigatório.',
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length <= 14;
    }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CPF/CNPJ deve conter apenas números.'),
  nomeFazenda: z.string().min(3),
  cidade: z.string().min(3),
  estado: z.string().min(2),
  areaTotal: z.number().optional(),
  areaAgricultavel: z.coerce.number(),
  areaVegetacao: z.coerce.number(),
});

export type Produtor = z.infer<typeof produtorSchema>;

type ProdutorFormProps = {
  produtor?: Partial<Produtor> | null,
  handleProdutor: (data: Produtor) => void
}
function ProdutorForm({ produtor, handleProdutor }: ProdutorFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    getValues,
    reset
  } = useForm<Produtor>({
    resolver: zodResolver(produtorSchema),
  });

  useEffect(() => {
    if (produtor) {
      reset(produtor);
    }
  }, [reset, produtor]);

  function checkCpfCnpj(e: any) {
    const value = e.target.value.replace(/[^0-9]/g, '')
    const isValidCpf = value.length === 11 && cpf.isValid(value);
    const isValidCnpj = value.length === 14 && cnpj.isValid(value);
    if (isValidCpf || isValidCnpj) {
      clearErrors('cpfCnpj')
    } else {
      setError("cpfCnpj", { message: 'Cpf ou Cpnj Inválido' })
    }
  }

  function updateAreaTotal(e: any) {
    const { areaAgricultavel, areaVegetacao } = getValues();
    setValue('areaTotal', Number(areaAgricultavel) + Number(areaVegetacao))
  }
  return (
    <form onSubmit={handleSubmit(handleProdutor)} className="p-5 border-b border-gray-900/10 pb-12">
      <h1 className="text-base font-semibold leading-7 text-gray-900">Produtor</h1>
      <button type="submit" className="mt-6 rounded-md bg-blue-200 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">SAVE</button>
      <Link to="/list" className="mt-6 ml-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Voltar
      </Link>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">Nome do Produtor</label>
          <div className="mt-2">
            <input type="text" {...register("nomeProdutor")} id="nomeProdutor" className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            {errors.nomeProdutor && <span className="text-red-500">{errors.nomeProdutor.message}</span>}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-gray-900">Nome da Fazenda</label>
          <div className="mt-2">
            <input type="text" {...register("nomeFazenda")} id="nomeFazenda" className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            {errors.nomeFazenda && <span className="text-red-500">{errors.nomeFazenda.message}</span>}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">CPF/CNPJ</label>
          <div className="mt-2">
            <input type="text" {...register("cpfCnpj")} id="cpfCnpj" onChange={checkCpfCnpj} className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            {errors.cpfCnpj && <span className="text-red-500">{errors.cpfCnpj.message}</span>}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Cidade</label>
          <div className="mt-2">
            <input type="text" {...register("cidade")} id="cidade" className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            {errors.cidade && <span className="text-red-500">{errors.cidade.message}</span>}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Estado</label>
          <div className="mt-2">
            <input type="text" {...register("estado")} id="estado" className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            {errors.estado && <span className="text-red-500">{errors.estado.message}</span>}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Área Agricultável</label>
          <div className="mt-2">
            <input type="text" id="areaAgricultavel" {...register("areaAgricultavel")} onBlur={updateAreaTotal} className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            {errors.areaAgricultavel && <span className="text-red-500">{errors.areaAgricultavel.message}</span>}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Área Vegetação</label>
          <div className="mt-2">
            <input type="text" {...register("areaVegetacao")} onBlur={updateAreaTotal} id="areaVegetacao" className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            {errors.areaVegetacao && <span className="text-red-500">{errors.areaVegetacao.message}</span>}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium leading-6 text-gray-900">Área Total</label>
          <div className="mt-2">
            <input disabled type="text" {...register("areaTotal")} id="areaVegetacao" className="pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProdutorForm;