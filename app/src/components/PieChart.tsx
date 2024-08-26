import ApexCharts from 'react-apexcharts';

type Data = {
  [key: string]: number
}

function PieChart({ data }: { data: Data }) {
  const state = {
    series: Object.values(data),
    options: {
      labels: Object.keys(data),
      stroke: {
        colors: ['#fff']
      },
      fill: {
        opacity: 0.8
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  return (
    <ApexCharts
      options={state.options}
      series={state.series}
      type='pie'
      width={400} />
  )
}

export default PieChart;