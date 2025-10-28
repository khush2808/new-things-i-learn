import ReactECharts from "echarts-for-react";

export default function MyChart() {
  const option = {
    title: {
      text: "Sample Chart",
    },
    tooltip: {},
    legend: {
      data: ["sales"],
    },
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {},
    series: [
      {
        name: "sales",
        type: "bar",
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px" }} />;
}
