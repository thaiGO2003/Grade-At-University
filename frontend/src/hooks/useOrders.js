import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5223/api/orders');
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError(err);
    }
  };

  const createOrder = async (order) => {
    try {
      const response = await axios.post('http://localhost:5223/api/orders', order);
      setOrders((prev) => [...prev, response.data]);
      return { success: true };
    } catch (err) {
      // Enhanced error logging for backend response
      if (err.response) {
        console.error('Failed to create order:', err.response.data);
      } else {
        console.error('Failed to create order:', err);
      }
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, error, createOrder };
}
