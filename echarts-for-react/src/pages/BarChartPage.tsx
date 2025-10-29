import { Link } from "react-router-dom";
import Echarts from "../components/EChartsExample";

/**
 * BarChartPage Component
 *
 * Dedicated page for viewing the Bar Chart in full detail.
 */
export default function BarChartPage() {
  return (
    <div className="w-full min-h-screen p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Bar Chart - Sample Sales Data
        </h1>
        <p className="text-gray-600 text-lg">
          Weekly sales performance visualization
        </p>
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <Echarts />
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">About this Chart</h3>
        <p className="text-blue-800">
          This bar chart displays weekly sales data across different days of the
          week. The visualization helps identify trends and peak sales periods.
        </p>
      </div>
    </div>
  );
}



