import { Routes, Route } from "react-router-dom";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import BarChartPage from "./pages/BarChartPage";
import LineChartPage from "./pages/LineChartPage";
import TimeSeriesPage from "./pages/TimeSeriesPage";

/**
 * App Component - Route Configuration
 *
 * Defines all application routes with the RootLayout wrapper
 * that includes the collapsible sidebar navigation.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="bar-chart" element={<BarChartPage />} />
        <Route path="line-chart" element={<LineChartPage />} />
        <Route path="time-series" element={<TimeSeriesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
