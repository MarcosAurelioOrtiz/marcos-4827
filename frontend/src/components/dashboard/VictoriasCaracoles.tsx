import ReactECharts from "echarts-for-react"

function VictoriasCaracoles() {
  const options = {
    tooltip: {
      trigger: "axis"
    },
    xAxis: {
      type: "category",
      data: [
        "Rango",
        "Maylo",
        "Scott",
        "Lento",
        "Rogelio",
        "Kicks"
      ]
    },
    yAxis: {
      type: "value",
      minInterval: 1
    },
    series: [
      {
        name: "Victorias",
        type: "bar",
        data: [2, 1, 1, 0, 1, 1]
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

export default VictoriasCaracoles