import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = 'your_alpha_vantage_api_key'; // Replace with your actual API key
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol: string, functionType: string = 'TIME_SERIES_DAILY') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: functionType,
        symbol,
        apikey: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    toast.error('Error fetching stock data. Please try again.');
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const getStockTimeSeries = async (symbol: string) => {
  try {
    const data = await fetchStockData(symbol, 'TIME_SERIES_DAILY');
    const timeSeries = data['Time Series (Daily)'];

    if (!timeSeries) {
      throw new Error('Time series data not found');
    }

    return Object.entries(timeSeries).map(([date, values]) => {
      const typedValues = values as { [key: string]: string };
      return {
        date,
        closingPrice: parseFloat(typedValues['4. close']),
      };
    });
  } catch (error) {
    toast.error('Error parsing stock time series data. Please try again.');
    console.error('Error parsing stock time series data:', error);
    throw error;
  }
};