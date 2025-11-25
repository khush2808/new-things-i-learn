import { Link } from "react-router-dom";
import LineChart from "../components/LineChart";

/**
 * LineChartPage Component
 * 
 * Dedicated page for viewing the Line Chart in full detail.
 */
export default function LineChartPage() {
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
          Line Chart - Monthly Sales Trend
        </h1>
        <p className="text-gray-600 text-lg">
          Annual sales performance trend analysis
        </p>
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <LineChart />
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-2">About this Chart</h3>
        <p className="text-green-800">
          This line chart shows monthly sales trends throughout the year.
          The smooth curve helps visualize growth patterns and seasonal variations.
        </p>
      </div>
    </div>
  );
}





