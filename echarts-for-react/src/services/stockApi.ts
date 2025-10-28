export interface StockData {
  date: string;
  techCorp: number;
  financeInc: number;
  healthLtd: number;
}

/**
 * Simulates an API call that returns stock price data
 * In a real scenario, this would be an actual API endpoint
 * 
 * @returns Promise resolving to array of stock data points
 */
export async function fetchStockDataFromAPI(): Promise<StockData[]> {
  // Simulate network delay (500-1500ms)
  const delay = Math.random() * 1000 + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate generating new stock prices with some randomness
  const baseDate = new Date("2024-01-01");
  const data: StockData[] = [];

  let techPrice = 120;
  let financePrice = 85;
  let healthPrice = 65;

  for (let i = 0; i < 8; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i * 15);

    // Add some random variation to simulate market movements
    techPrice += (Math.random() - 0.4) * 20;
    financePrice += (Math.random() - 0.3) * 10;
    healthPrice += (Math.random() - 0.2) * 8;

    data.push({
      date: date.toISOString().split("T")[0],
      techCorp: Math.round(techPrice * 10) / 10,
      financeInc: Math.round(financePrice * 10) / 10,
      healthLtd: Math.round(healthPrice * 10) / 10,
    });
  }

  return data;
}
