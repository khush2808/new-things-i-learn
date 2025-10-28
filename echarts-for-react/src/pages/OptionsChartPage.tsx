import { Link } from "react-router-dom";
import OptionsChart from "../components/OptionsChart";

/**
 * OptionsChartPage Component
 *
 * Dedicated page for viewing the Options Time Series Chart in full detail.
 * Displays underlying price, call IV, and put IV over time.
 */
export default function OptionsChartPage() {
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
          Options Chart - OMTYF26 Contract
        </h1>
        <p className="text-gray-600 text-lg">
          Underlying price and implied volatility time series
        </p>
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <OptionsChart />
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold text-purple-900 mb-2">About this Chart</h3>
        <p className="text-purple-800 mb-3">
          This time series chart displays options contract data for OMTYF26, including:
        </p>
        <ul className="list-disc list-inside text-purple-800 space-y-1">
          <li>
            <strong>Underlying Price</strong> (left axis): The current price of the
            underlying asset
          </li>
          <li>
            <strong>Call IV</strong> (right axis): Implied volatility of call options,
            representing market expectations of future volatility
          </li>
          <li>
            <strong>Put IV</strong> (right axis): Implied volatility of put options,
            often higher than call IV due to put premium
          </li>
        </ul>
        <p className="text-purple-800 mt-3">
          The dual Y-axis design allows you to compare price movements with volatility
          changes, which can indicate market sentiment and risk levels.
        </p>
      </div>
    </div>
  );
}

