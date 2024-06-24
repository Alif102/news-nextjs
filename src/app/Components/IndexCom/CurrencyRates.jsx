"use client"
import React, { useEffect, useState } from 'react';

const CurrencyRates = () => {
  const [exchangeRates, setExchangeRates] = useState(null);

  async function fetchExchangeRates() {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  }

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">Currency Exchange Rates</h2>
      {exchangeRates ? (
        <ul className="space-y-2">
          <li><strong>BDT to USD:</strong> {exchangeRates.BDT.toFixed(2)}</li>
          <li><strong>BDT to INR:</strong> {exchangeRates.INR.toFixed(2)}</li>
          <li><strong>BDT to AED:</strong> {exchangeRates.AED.toFixed(2)}</li>
          <li><strong>BDT to AFN:</strong> {exchangeRates.AFN.toFixed(2)}</li>
          <li><strong>BDT to AUD:</strong> {exchangeRates.AUD.toFixed(2)}</li>
          <li><strong>BDT to CAD:</strong> {exchangeRates.CAD.toFixed(2)}</li>
          <li><strong>BDT to BRL:</strong> {exchangeRates.BRL.toFixed(2)}</li>
          {/* Add more currencies as needed */}
        </ul>
      ) : (
        <p>Loading exchange rates...</p>
      )}
    </div>
  );
};

export default CurrencyRates;
