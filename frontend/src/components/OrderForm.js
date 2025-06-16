// src/components/OrderForm.jsx
import React, { useState } from 'react';

export default function OrderForm({ order, setOrder, onSubmit }) {
  const [item, setItem] = useState({ productName: '', quantity: 1, unitPrice: 1000 });

  const handleAddItem = () => {
    if (!item.productName || item.quantity <= 0 || item.unitPrice <= 0) return;
    setOrder({
      ...order,
      orderItems: [...order.orderItems, item],
    });
    setItem({ productName: '', quantity: 1, unitPrice: 1000 });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Product Name</label>
          <input
            type="text"
            value={item.productName}
            placeholder="e.g. iPhone 15"
            onChange={(e) => setItem({ ...item, productName: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            step="1"
            value={item.quantity}
            onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value) || 1 })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Unit Price (VND)</label>
          <input
            type="number"
            min="1000"
            step="1000"
            value={item.unitPrice}
            onChange={(e) => setItem({ ...item, unitPrice: parseInt(e.target.value) || 1000 })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleAddItem}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          ➕ Add Item
        </button>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-2">🧾 Order Items:</h3>
        {order.orderItems.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {order.orderItems.map((it, idx) => (
              <li key={idx}>
                {it.productName} – Qty: {it.quantity} ×{' '}
                <span className="font-medium">
                  {it.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>{' '}
                ={' '}
                <span className="font-semibold">
                  {(it.quantity * it.unitPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={onSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow w-full"
      >
        ✅ Submit Order
      </button>
    </div>
  );
}
