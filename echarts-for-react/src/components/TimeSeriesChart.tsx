import ReactECharts from "echarts-for-react";

export default function TimeSeriesChart() {
  const option = {
    title: {
      text: "Stock Prices Over Time",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["Tech Corp", "Finance Inc", "Health Ltd"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      scale: true,
    },
    series: [
      {
        name: "Tech Corp",
        type: "line",
        data: [
          ["2024-01-01", 120],
          ["2024-01-15", 132],
          ["2024-02-01", 145],
          ["2024-02-15", 138],
          ["2024-03-01", 155],
          ["2024-03-15", 162],
          ["2024-04-01", 158],
          ["2024-04-15", 175],
        ],
        lineStyle: {
          color: "#5470c6",
        },
      },
      {
        name: "Finance Inc",
        type: "line",
        data: [
          ["2024-01-01", 85],
          ["2024-01-15", 88],
          ["2024-02-01", 92],
          ["2024-02-15", 87],
          ["2024-03-01", 95],
          ["2024-03-15", 98],
          ["2024-04-01", 102],
          ["2024-04-15", 108],
        ],
        lineStyle: {
          color: "#91cc75",
        },
      },
      {
        name: "Health Ltd",
        type: "line",
        data: [
          ["2024-01-01", 65],
          ["2024-01-15", 68],
          ["2024-02-01", 72],
          ["2024-02-15", 75],
          ["2024-03-01", 78],
          ["2024-03-15", 82],
          ["2024-04-01", 85],
          ["2024-04-15", 88],
        ],

        lineStyle: {
          color: "#fac858",
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px" }} />;
}
