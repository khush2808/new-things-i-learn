import { makeAutoObservable } from "mobx";
import { StockData, fetchStockDataFromAPI } from "../services/stockApi.js";

class StockStore {
  // Observable state
  data: StockData[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    // Makes all properties and methods observable/actions automatically
    makeAutoObservable(this);
  }

  /**
   * Action to fetch stock data from API
   */
  async fetchData(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const fetchedData = await fetchStockDataFromAPI();
      this.data = fetchedData;
    } catch (err) {
      this.error = err instanceof Error ? err.message : "Failed to fetch data";
      console.error("Error fetching stock data:", err);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Action to reset store to initial state
   */
  reset(): void {
    this.data = [];
    this.isLoading = false;
    this.error = null;
  }

  /**
   * Getter to check if data is available
   */
  get hasData(): boolean {
    return this.data.length > 0;
  }
}

// Create a singleton instance of the store
export const stockStore = new StockStore();
