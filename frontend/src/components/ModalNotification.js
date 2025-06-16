import React, { useEffect } from 'react';

export default function ModalNotification({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgColor =
    type === 'success'
      ? 'bg-green-600'
      : type === 'error'
      ? 'bg-red-600'
      : type === 'warning'
      ? 'bg-yellow-600'
      : 'bg-gray-600';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${bgColor} text-white`}
      >
        <div className="p-4">
          <p className="text-sm font-semibold">{type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Notice'}</p>
          <p className="mt-1 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
