import ReactECharts from "echarts-for-react";

export default function LineChart() {
  const option = {
    title: {
      text: "Monthly Sales Trend",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Sales"],
    },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Sales",
        type: "line",
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1540, 1200, 1100, 1380, 1520],
        smooth: true,
        lineStyle: {
          color: "#5470c6",
          width: 3,
        },
        itemStyle: {
          color: "#5470c6",
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px" }} />;
}