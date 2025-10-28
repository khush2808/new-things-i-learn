import { Link } from "react-router-dom";
import Echarts from "../components/EChartsExample";
import LineChart from "../components/LineChart";
import TimeSeriesChart from "../components/TimeSeriesChart";
import OptionsChart from "../components/OptionsChart";

/**
 * HomePage Component
 * 
 * Dashboard view showing all charts with navigation links
 * to individual chart pages.
 */
export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-6 p-6">
      <div className="">
        <h1 className="text-6xl font-bold p-6 bg-amber-600 m-6">
          You are a legend if you are reading this.
        </h1>
      </div>

      <div className="w-5/6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Container */}
        <div className="bg-pink-200 p-6 rounded-lg relative group hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Bar Chart</h2>
            <Link
              to="/bar-chart"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium text-sm"
            >
              View Full Page →
            </Link>
          </div>
          <Echarts />
        </div>

        {/* Line Chart Container */}
        <div className="bg-blue-200 p-6 rounded-lg relative group hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Line Chart</h2>
            <Link
              to="/line-chart"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              View Full Page →
            </Link>
          </div>
          <LineChart />
        </div>

        {/* Time Series Chart Container */}
        <div className="bg-green-200 p-6 rounded-lg lg:col-span-2 relative group hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Time Series Multi-line Chart
            </h2>
            <Link
              to="/time-series"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              View Full Page →
            </Link>
          </div>
          <TimeSeriesChart />
        </div>

        {/* Options Time Series Chart Container */}
        <div className="bg-purple-200 p-6 rounded-lg lg:col-span-2 relative group hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              Options Time Series Chart
            </h2>
            <Link
              to="/options-chart"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
            >
              View Full Page →
            </Link>
          </div>
          <OptionsChart />
        </div>
      </div>
    </div>
  );
}

