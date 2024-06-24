import React from 'react';

async function getPrayerTimes(city) {
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=2`);
  const data = await response.json();
  return { city, timings: data.data.timings };
}

const cities = ['Barishal', 'Chattogram', 'Dhaka', 'Khulna', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Sylhet'];

const PrayerTimesPage = async () => {
  const prayerTimesData = await Promise.all(cities.map(city => getPrayerTimes(city)));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Prayer Times for Cities in Bangladesh</h1>
      {prayerTimesData.map((data) => (
        <div key={data.city} className="mb-8">
         
          <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">{data.city}</h2>
            {Object.keys(data.timings).map((time) => (
              <li key={time} className="border-b last:border-b-0 py-2 flex justify-between">
                <span className="font-medium">{time}</span>
                <span>{data.timings[time]}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PrayerTimesPage;
