import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ReactECharts from "echarts-for-react";
import { optionsStore } from "../stores/OptionsStore";

// Spinner component
const Spinner = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      animation: "spin 0.6s linear infinite",
      display: "inline-block",
      verticalAlign: "middle",
    }}
  >
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
      strokeDasharray="31.4 31.4"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * OptionsChart Component
 *
 * Displays a time series chart with three metrics:
 * - Underlying price (left Y-axis)
 * - Call IV (right Y-axis)
 * - Put IV (right Y-axis)
 *
 * This component is wrapped with observer() from mobx-react-lite
 * to make it reactive to MobX store changes.
 */
const OptionsChart = observer(() => {
  // Load data on component mount
  useEffect(() => {
    if (!optionsStore.hasData) {
      optionsStore.fetchData();
    }
  }, []);

  // Build chart option from store data
  const option = {
    title: {
      text: `${optionsStore.contractName || "Options"} Time Series`,
      subtext: "Underlying Price & Implied Volatility",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      formatter: (
        params: Array<{
          axisValue: string | number;
          seriesName: string;
          value: number[];
          marker: string;
        }>
      ) => {
        const time = new Date(params[0].axisValue).toLocaleString();
        let result = `<strong>${time}</strong><br/>`;
        params.forEach((param) => {
          const value = param.seriesName.includes("IV")
            ? (param.value[1] * 100).toFixed(2) + "%"
            : param.value[1].toFixed(4);
          result += `${param.marker} ${param.seriesName}: ${value}<br/>`;
        });
        return result;
      },
    },
    legend: {
      data: ["Underlying Price", "Call IV", "Put IV"],
      bottom: "10px",
      left: "center",
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "15%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
      axisLabel: {
        formatter: (value: number) => {
          const date = new Date(value);
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Underlying Price",
        position: "left",
        axisLabel: {
          formatter: "{value}",
        },
        splitLine: {
          lineStyle: {
            type: "solid",
          },
        },
      },
      {
        type: "value",
        name: "IV (%)",
        position: "right",
        min: 0,
        max: 0.5,
        axisLabel: {
          formatter: (value: number) => (value * 100).toFixed(1) + "%",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "Underlying Price",
        type: "line",
        yAxisIndex: 0,
        data: optionsStore.data.map((d) => [d.time, d.underlying]),
        lineStyle: {
          color: "#5470c6",
          width: 2,
        },
        itemStyle: {
          color: "#5470c6",
        },
        symbol: "circle",
        symbolSize: 6,
        smooth: true,
      },
      {
        name: "Call IV",
        type: "line",
        yAxisIndex: 1,
        data: optionsStore.data.map((d) => [d.time, d.call_iv]),
        lineStyle: {
          color: "#91cc75",
          width: 2,
        },
        itemStyle: {
          color: "#91cc75",
        },
        symbol: "circle",
        symbolSize: 6,
        smooth: true,
      },
      {
        name: "Put IV",
        type: "line",
        yAxisIndex: 1,
        data: optionsStore.data.map((d) => [d.time, d.put_iv]),
        lineStyle: {
          color: "#ee6666",
          width: 2,
        },
        itemStyle: {
          color: "#ee6666",
        },
        symbol: "circle",
        symbolSize: 6,
        smooth: true,
      },
    ],
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => optionsStore.fetchData()}
          disabled={optionsStore.isLoading}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#5470c6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: optionsStore.isLoading ? "not-allowed" : "pointer",
            opacity: optionsStore.isLoading ? 0.6 : 1,
          }}
        >
          {optionsStore.isLoading ? (
            <>
              <Spinner size={16} />{" "}
              <span style={{ marginLeft: "8px" }}>Loading...</span>
            </>
          ) : (
            "Refetch Data"
          )}
        </button>
        {optionsStore.error && (
          <span style={{ marginLeft: "16px", color: "red" }}>
            Error: {optionsStore.error}
          </span>
        )}
      </div>
      {optionsStore.isLoading && !optionsStore.hasData ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          <Spinner size={40} />
          <div style={{ marginTop: "16px" }}>Loading chart data...</div>
        </div>
      ) : (
        <ReactECharts option={option} style={{ height: "400px" }} />
      )}
    </div>
  );
});

OptionsChart.displayName = "OptionsChart";

export default OptionsChart;
