import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
);

Input.displayName = "Input";
import { getStockTimeSeries } from "../services/stockService";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockData, setStockData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState('1D');

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem("stockTicker") as HTMLInputElement;
    const stockTicker = input.value;

    try {
      const data = await getStockTimeSeries(stockTicker);
      setStockData(data);
    } catch (err) {
      setError("Failed to fetch stock data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterDataByTimeRange = () => {
    const now = new Date();
    let filteredData;

    switch (timeRange) {
      case '1D':
        filteredData = stockData.slice(-1);
        break;
      case '1W':
        filteredData = stockData.slice(-7);
        break;
      case '1M':
        filteredData = stockData.slice(-30);
        break;
      case '1Y':
        filteredData = stockData.slice(-365);
        break;
      default:
        filteredData = stockData;
    }

    return filteredData;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li className="mb-4"><a href="#" className="hover:underline">Home</a></li>
            <li className="mb-4"><a href="#" className="hover:underline">Analytics</a></li>
            <li className="mb-4"><a href="#" className="hover:underline">Reports</a></li>
            <li><a href="#" className="hover:underline">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Search Input Field */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Search Stock</h2>
          <form className="flex space-x-2" onSubmit={handleSearch}>
            <Input name="stockTicker" placeholder="Enter stock ticker..." className="w-full" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Search</button>
          </form>
        </section>

        {/* Time Range Selector */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Select Time Range</h2>
          <div className="flex space-x-4">
            {['1D', '1W', '1M', '1Y'].map((range) => (
              <button
                key={range}
                className={`px-4 py-2 rounded ${timeRange === range ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </section>

        {/* Loading/Error State */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Chart Section */}
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Chart</h2>
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            {stockData.length > 0 ? (
              <p>Chart Placeholder with Data for {timeRange}</p>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;