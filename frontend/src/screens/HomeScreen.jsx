// src/screens/HomeScreen.jsx
import React, { useState } from 'react';
import useOrders from '../hooks/useOrders';
import useCustomers from '../hooks/useCustomers';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import ModalNotification from '../components/ModalNotification';

export default function HomeScreen() {
  const { customers, createCustomer } = useCustomers();
  const { orders, createOrder } = useOrders();

  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });
  const [newOrder, setNewOrder] = useState({ customerId: 0, orderItems: [] });

  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');

  const showModal = (message, type) => {
    setModalMessage(message);
    setModalType(type);
  };

  const handleCustomerSubmit = () => {
    createCustomer(newCustomer).then((result) => {
      if (result && result.success) {
        showModal('Customer added successfully', 'success');
        setNewCustomer({ name: '', email: '' });
      } else {
        const errorMsg = result && result.error && result.error.message
          ? result.error.message
          : 'Failed to add customer';
        showModal(errorMsg, 'error');
      }
    });
  };

  const handleOrderSubmit = () => {
    createOrder(newOrder).then((result) => {
      if (result && result.success) {
        showModal('Order created successfully', 'success');
        setNewOrder({ customerId: 0, orderItems: [] });
      } else {
        const errorMsg = result && result.error && result.error.message
          ? result.error.message
          : 'Failed to create order';
        showModal(errorMsg, 'error');
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        🛒 Mini Sales Order Management
      </h1>

      {/* Customer Form */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">➕ Create New Customer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={newCustomer.name}
              onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              value={newCustomer.email}
              onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="john@example.com"
            />
          </div>
          <button
            onClick={handleCustomerSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Add Customer
          </button>
        </div>
      </section>

      {/* Order Form */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">📝 Create New Order</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Select Customer</label>
          <select
            value={newOrder.customerId}
            onChange={e => setNewOrder({ ...newOrder, customerId: parseInt(e.target.value) })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="0">-- Choose a customer --</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <OrderForm
          order={newOrder}
          setOrder={setNewOrder}
          onSubmit={handleOrderSubmit}
        />
      </section>

      {/* Order List */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <OrderList orders={orders} />
      </section>

      <ModalNotification
        message={modalMessage}
        type={modalType}
        onClose={() => setModalMessage('')}
      />
    </div>
  );
}
