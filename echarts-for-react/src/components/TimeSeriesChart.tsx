import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ReactECharts from "echarts-for-react";
import { stockStore } from "../stores/StockStore";

/**
 * TimeSeriesChart Component
 *
 * This component is wrapped with observer() from mobx-react-lite
 * which makes it reactive to MobX store changes.
 *
 * The component only handles UI/rendering logic while business logic
 * is delegated to the MobX store.
 */
const TimeSeriesChart = observer(() => {
  // Load data on component mount
  useEffect(() => {
    if (!stockStore.hasData) {
      stockStore.fetchData();
    }
  }, []);

  // Build chart option from store data
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
        data: stockStore.data.map((d) => [d.date, d.techCorp]),
        lineStyle: {
          color: "#5470c6",
        },
      },
      {
        name: "Finance Inc",
        type: "line",
        data: stockStore.data.map((d) => [d.date, d.financeInc]),
        lineStyle: {
          color: "#91cc75",
        },
      },
      {
        name: "Health Ltd",
        type: "line",
        data: stockStore.data.map((d) => [d.date, d.healthLtd]),
        lineStyle: {
          color: "#fac858",
        },
      },
    ],
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => stockStore.fetchData()}
          disabled={stockStore.isLoading}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#5470c6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: stockStore.isLoading ? "not-allowed" : "pointer",
            opacity: stockStore.isLoading ? 0.6 : 1,
          }}
        >
          {stockStore.isLoading ? "Loading..." : "Refetch Data"}
        </button>
        {stockStore.error && (
          <span style={{ marginLeft: "16px", color: "red" }}>
            Error: {stockStore.error}
          </span>
        )}
      </div>
      {stockStore.isLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          Loading chart data...
        </div>
      ) : (
        <ReactECharts option={option} style={{ height: "400px" }} />
      )}
    </div>
  );
});

TimeSeriesChart.displayName = "TimeSeriesChart";

export default TimeSeriesChart;
