// InvoiceButton.jsx
import React from 'react';
import { saveAs } from 'file-saver';
import generateInvoicePDF from '../../../config/pdfGenerator';

const InvoiceButton = ({ order }) => {
  const handleDownload = async () => {
    try {
      if (!order || typeof order !== 'object') {
        console.error("No invoice data provided");
        return;
      }

      const pdfBytes = await generateInvoicePDF(order);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, `invoice-${order.id || 'order'}.pdf`);
    } catch (error) {
      console.error("Failed to generate invoice:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Download Invoice
    </button>
  );
};

export default InvoiceButton;
