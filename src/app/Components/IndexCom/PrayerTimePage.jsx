import React from 'react';

async function getPrayerTimes() {
  const response = await fetch('http://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2');
  const data = await response.json();
  return data.data.timings;
}

const PrayerTimesPage = async () => {
  const prayerTimes = await getPrayerTimes();

  return (
    // <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 className="text-md px-3 font-bold mb-6">Prayer Times for Bangladesh</h1>

        {Object.keys(prayerTimes).slice(0, 7).map((time) => (
          
          <li key={time} className="border-b last:border-b-0 py-2 flex justify-between">
            
            <span className="font-medium">{time}</span>
            <span>{prayerTimes[time]}</span>
          </li>
        ))}
      </ul>
    // </div>
  );
};

export default PrayerTimesPage;
