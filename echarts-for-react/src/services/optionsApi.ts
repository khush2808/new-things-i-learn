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

/**
 * Fetches options data from the sample JSON file
 * Simulates API call with network delay for realistic loading experience
 * 
 * @returns Promise resolving to array of options data points
 */
export async function fetchOptionsDataFromAPI(): Promise<OptionsData[]> {
  try {
    // Simulate network delay (500-1500ms)
    const delay = Math.random() * 1000 + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Fetch data from the JSON file
    const response = await fetch('/json-data/sample.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // The JSON has a "results" property containing the array
    return data.results as OptionsData[];
  } catch (error) {
    console.error('Error fetching options data:', error);
    throw new Error('Failed to fetch options data');
  }
}

