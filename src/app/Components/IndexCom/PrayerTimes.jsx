"use client"
import React, { useState, useEffect } from 'react';

async function getPrayerTimes(city) {
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=2`);
  const data = await response.json();
  return { city, timings: data.data.timings };
}

const cities = ['Dhaka', 'Mymensingh', 'Barishal', 'Chattogram', 'Khulna', 'Rajshahi', 'Rangpur', 'Sylhet'];

const PrayerTimesCarousel = () => {
  const [prayerTimesData, setPrayerTimesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(cities.map(city => getPrayerTimes(city)));
      setPrayerTimesData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {prayerTimesData.map((cityData, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{cityData.city}</h2>
          <ul>
            {Object.entries(cityData.timings).map(([prayer, time]) => (
              <li key={prayer}>
                <strong>{prayer}</strong>: {time}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PrayerTimesCarousel;
