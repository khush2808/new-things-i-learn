/**
 * Options Data API Service
 *
 * This service handles fetching options contract data from the JSON file.
 * The data includes underlying price, implied volatilities, greeks, and other metrics.
 */

export interface OptionsData {
  contract: string;
  time: string;
  expiry: string;
  strike: number;
  underlying: number;
  rate: number;
  call_price: number;
  put_price: number;
  call_iv: number;
  put_iv: number;
  call_delta: number;
  put_delta: number;
  call_gamma: number;
  put_gamma: number;
  call_vega: number;
  put_vega: number;
  call_theta: number;
  put_theta: number;
  atm: number;
  dte: number;
}

// Import JSON data at build time (bundled by Vite)
import sampleData from "../../json-data/sample.json";

/**
 * Fetches options data from the sample JSON file
 * Simulates API call with network delay for realistic loading experience
 * Uses build-time import for better performance
 *
 * @returns Promise resolving to array of options data points
 */
export async function fetchOptionsDataFromAPI(): Promise<OptionsData[]> {
  try {
    // Simulate network delay (500-1500ms)
    const delay = Math.random() * 1000 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Data is already bundled at build time
    console.log("length", sampleData.results.length);
    return sampleData.results as OptionsData[];
  } catch (error) {
    console.error("Error fetching options data:", error);
    throw new Error("Failed to fetch options data");
  }
}
