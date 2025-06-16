import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5223/api/customers');
      setCustomers(response.data);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (customer) => {
    try {
      const response = await axios.post('http://localhost:5223/api/customers', customer);
      setCustomers((prev) => [...prev, response.data]);
      return { success: true };
    } catch (err) {
      console.error('Failed to create customer:', err);
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, loading, error, createCustomer };
}
