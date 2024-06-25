import React from 'react';

async function getPrayerTimes() {
  const response = await fetch('http://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2');
  const data = await response.json();
  return data.data.timings;
}

const PrayerTimesPage = async () => {
  const prayerTimes = await getPrayerTimes();
  const prayerTimesArray = Object.keys(prayerTimes).slice(0, 7);

  // Filter out the 3rd element (index 2)
  const filteredPrayerTimes = prayerTimesArray.filter((_, index) => index !== 4);

  return (
    
      <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 className="text-md px-3 font-bold mb-6">Prayer Times for Dhaka, Bangladesh</h1>

        {filteredPrayerTimes.map((time) => (
          <li key={time} className="border-b last:border-b-0 py-2 flex justify-between">
            <span className="font-medium">{time}</span>
            <span>{prayerTimes[time]}</span>
          </li>
        ))}
      </ul>
 
  );
};

export default PrayerTimesPage;
