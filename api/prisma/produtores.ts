import { AddProdutorProps } from "@/produtor/domain/protocols/add-produtor.props";
import { faker } from "@faker-js/faker";

const cpfs = [
  "826.153.079-59",
  "913.406.857-01",
  "720.398.615-21",
  "805.631.492-05",
  "510.426.879-94",
  "658.127.043-17",
  "174.235.908-60",
  "375.269.481-55",
  "284.015.693-89",
  "417.682.093-40",
  "823.760.491-13",
  "394.517.862-28",
  "876.059.431-48",
  "476.859.102-76",
  "941.683.572-28",
  "051.238.647-17",
  "481.056.293-05",
  "239.817.604-50",
  "610.842.953-42",
  "063.715.928-40",
  "231.984.560-70",
  "426.130.785-53",
  "613.780.542-53",
  "943.671.528-55",
  "983.756.104-10",
  "914.758.603-66",
  "318.075.429-04",
  "504.681.932-51",
  "043.752.618-62",
  "483.602.791-87",
  "586.374.012-44",
  "318.279.054-41",
  "039.764.521-06",
  "128.304.967-87",
  "470.896.152-94",
  "571.349.862-09",
  "963.872.451-09",
  "947.620.183-50",
  "630.189.427-87",
  "862.497.103-96",
  "412.803.569-60",
  "518.026.943-15",
  "506.937.284-00",
  "102.578.946-67",
  "718.469.502-01",
  "205.749.316-43",
  "801.594.672-76",
  "827.630.549-00",
  "402.897.153-50",
  "054.729.186-85"
];

export function geraProdutor(): Omit<AddProdutorProps, "culturas"> {
  const areaAgricultavel = faker.number.float({ min: 100, max: 1000 });
  const areaVegetacao = faker.number.float({ min: 100, max: 1000 });
  const areaTotal = areaAgricultavel + areaVegetacao;

  return {
    nomeProdutor: faker.person.fullName(),
    cpfCnpj: cpfs.at(Math.floor(Math.random() * 51)) ?? "",
    nomeFazenda: faker.company.name(),
    cidade: faker.location.city(),
    estado: faker.location.state(),
    areaTotal: areaTotal,
    areaAgricultavel: areaAgricultavel,
    areaVegetacao: areaVegetacao
  };
}
