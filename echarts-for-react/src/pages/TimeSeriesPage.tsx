import { Link } from "react-router-dom";
import TimeSeriesChart from "../components/TimeSeriesChart";

/**
 * TimeSeriesPage Component
 * 
 * Dedicated page for viewing the Time Series Chart in full detail.
 */
export default function TimeSeriesPage() {
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
          Time Series Chart - Stock Prices
        </h1>
        <p className="text-gray-600 text-lg">
          Multi-company stock price comparison over time
        </p>
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <TimeSeriesChart />
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold text-purple-900 mb-2">About this Chart</h3>
        <p className="text-purple-800 mb-3">
          This time series chart tracks stock prices for Tech Corp, Finance Inc, and Health Ltd
          over time. The chart uses MobX for state management and supports real-time data updates.
        </p>
        <ul className="list-disc list-inside text-purple-800 space-y-1">
          <li>Interactive tooltips with detailed price information</li>
          <li>Zoom and pan capabilities for detailed analysis</li>
          <li>Live data fetching with the "Refetch Data" button</li>
        </ul>
      </div>
    </div>
  );
}




