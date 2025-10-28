import "./App.css";
import Echarts from "./components/EChartsExample.js";
import LineChart from "./components/LineChart.js";
import TimeSeriesChart from "./components/TimeSeriesChart.js";

function App() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center gap-6 p-6">
        <div className="">
          <h1 className="text-6xl font-bold p-6 bg-amber-600 m-6">You are a legend if you are reading this.</h1>
        </div>
        
        <div className="w-5/6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-pink-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Bar Chart</h2>
            <Echarts />
          </div>
          
          <div className="bg-blue-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Line Chart</h2>
            <LineChart />
          </div>
          
          <div className="bg-green-200 p-6 rounded-lg lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Time Series Multi-line Chart</h2>
            <TimeSeriesChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
