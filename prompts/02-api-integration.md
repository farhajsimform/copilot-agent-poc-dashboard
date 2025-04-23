# 🔗 API Integration: Stock Data

### Prompt 1:
> Create a `.env.local` file and add a placeholder for the API key:
> ```
> NEXT_PUBLIC_ALPHA_VANTAGE_KEY=your_api_key
> ```

### Prompt 2:
> Implement a service file in `src/services/stockService.ts` that fetches data from Alpha Vantage API using axios.

### Prompt 3:
> Write a function called `getStockTimeSeries` that accepts a stock symbol and returns parsed time series data (date and closing price).