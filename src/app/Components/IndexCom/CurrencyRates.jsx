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
    <div className=" p-6 rounded-lg shadow-md ">
      <h2 className="text-md  border-b border-black font-bold mb-4">Currency Exchange Rates</h2>
      {exchangeRates ? (
        <ul className="space-y-2">
          <li className='flex py-1 justify-between border-b last:border-b-0'><strong>BDT to USD</strong> {exchangeRates.BDT.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><strong>BDT to INR</strong> {exchangeRates.INR.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><strong>BDT to AED</strong> {exchangeRates.AED.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><strong>BDT to AFN</strong> {exchangeRates.AFN.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><strong>BDT to AUD</strong> {exchangeRates.AUD.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><strong>BDT to CAD</strong> {exchangeRates.CAD.toFixed(2)}</li>
          <li className='flex py-1 justify-between border-b last:border-b-0'><strong>BDT to BRL</strong> {exchangeRates.BRL.toFixed(2)}</li>
          {/* Add more currencies as needed */}
        </ul>
      ) : (
        <p>Loading exchange rates...</p>
      )}
    </div>
  );
};

export default CurrencyRates;
