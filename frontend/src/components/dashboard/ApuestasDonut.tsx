import ReactECharts from "echarts-for-react"

function ApuestasDonut() {
  const options = {
    tooltip: {
      trigger: "item"
    },
    legend: {
      bottom: 0
    },
    series: [
      {
        name: "Apuestas",
        type: "pie",
        radius: ["45%", "70%"],
        data: [
          {
            value: 8,
            name: "Ganadas"
          },
          {
            value: 4,
            name: "Perdidas"
          }
        ]
      }
    ]
  }

  return (
    <ReactECharts
      option={options}
      style={{ height: 320 }}
    />
  )
}

export default ApuestasDonut