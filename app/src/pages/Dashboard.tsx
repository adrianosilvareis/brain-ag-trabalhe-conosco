import { useEffect } from "react";
import PieChart from "../components/PieChart";
import PolarChart from "../components/PolarChart";
import { useProdutorContext } from "../hooks/useProdutorContext";

const Dashboard = () => {
  const { onDashboardLoad, relatorio } = useProdutorContext();

  useEffect(() => {
    onDashboardLoad();
  }, [onDashboardLoad]);

  if (!relatorio) {
    return <div>loading...</div>
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 text-center mb-20">
          <h1 className="text-6xl col-span-3 font-semibold text-gray-900">Dashboard</h1>
        </dl>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-2">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Em todo brasil</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{relatorio.totalFazendas} Fazendas</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">De todos os tipos de cultura.</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{Math.round(relatorio.totalHectares ?? 0)} Hectares</dd>
          </div>
        </dl>
        <dl className="mt-24 grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <PolarChart data={relatorio.totalFazendasPorCultura} />
            <dt className="text-base leading-7 text-gray-600">Total de fazendas por hectares/cultura</dt>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <PieChart data={relatorio.totalFazendasPorEstado} />
            <dt className="text-base leading-7 text-gray-600">Total de fazendas por estado</dt>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <PieChart data={relatorio.usoSolo} />
            <dt className="text-base leading-7 text-gray-600">De todos os tipos de cultura.</dt>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Dashboard;