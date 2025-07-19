import React, { useState } from "react";

function UPIPayment({ subtotal }) {
  const [upiQR, setUpiQR] = useState("");

  const handleGenerateQR = () => {
    const upiLink = `upi://pay?pa=onkarjha2003@sbi&am=${subtotal}&tn=Payment for Order`;
    const qrUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(upiLink)}`;
    setUpiQR(qrUrl);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Pay via UPI</h3>
      <button onClick={handleGenerateQR}>Generate QR</button>
      {upiQR && (
        <div style={{ marginTop: "10px" }}>
          <img src={upiQR} alt="UPI QR Code" />
          <p><strong>Amount:</strong> ₹{subtotal}</p>
        </div>
      )}
    </div>
  );
}

export default UPIPayment;
