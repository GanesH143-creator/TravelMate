import React, { useEffect } from 'react';

export default function Toast({ show, onClose, message = 'Saved' }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose && onClose(), 2500);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-black/90 text-white px-4 py-2 rounded shadow-lg">
        {message}
      </div>
    </div>
  );
}
