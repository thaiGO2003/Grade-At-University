import React from 'react';

function OrderList({ orders }) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Order ID</th>
                        <th className="border p-2">Customer</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="border p-4 text-center text-gray-500">
                                No orders yet.
                            </td>
                        </tr>
                    ) : (
                        orders.map(order => (
                            <tr key={order.id}>
                                <td className="border p-2">{order.id}</td>
                                <td className="border p-2">{order.customer?.name || "N/A"}</td>
                                <td className="border p-2">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </td>
                                <td className="border p-2">
                                    {order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
