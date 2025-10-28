import { makeAutoObservable } from "mobx";
import { OptionsData, fetchOptionsDataFromAPI } from "../services/optionsApi";

/**
 * OptionsStore - MobX Store for Options Data Management
 *
 * This store manages the state for options contract data including:
 * - Data fetching and loading states
 * - Error handling
 * - Data persistence during component lifecycle
 */
class OptionsStore {
  // Observable state
  data: OptionsData[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    // Makes all properties and methods observable/actions automatically
    makeAutoObservable(this);
  }

  /**
   * Action to fetch options data from API
   */
  async fetchData(): Promise<void> {
    try {
      this.isLoading = true;
      this.error = null;
      const fetchedData = await fetchOptionsDataFromAPI();
      // Sort by time in ascending order (oldest to newest)
      this.data = fetchedData.sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
      );
    } catch (err) {
      this.error =
        err instanceof Error ? err.message : "Failed to fetch options data";
      console.error("Error fetching options data:", err);
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

  /**
   * Getter to get the contract name from data
   */
  get contractName(): string {
    return this.data.length > 0 ? this.data[0].contract : "";
  }
}

// Create a singleton instance of the store
export const optionsStore = new OptionsStore();
