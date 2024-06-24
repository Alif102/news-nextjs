"use client"
import React, { useState, useEffect } from 'react';

async function getPrayerTimes(city) {
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=2`);
  const data = await response.json();
  return { city, timings: data.data.timings };
}

const cities = ['Barishal', 'Chattogram', 'Dhaka', 'Khulna', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Sylhet'];

const PrayerTimesCarousel = () => {
  const [prayerTimesData, setPrayerTimesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(cities.map(city => getPrayerTimes(city)));
      setPrayerTimesData(data);
    };
    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % prayerTimesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + prayerTimesData.length) % prayerTimesData.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Prayer Times for Cities in Bangladesh</h1>
      {prayerTimesData.length > 0 && (
        <div className="relative w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{prayerTimesData[currentIndex].city}</h2>
            <ul>
              {Object.keys(prayerTimesData[currentIndex].timings).map((time) => (
                <li key={time} className="border-b last:border-b-0 py-2 flex justify-between">
                  <span className="font-medium">{time}</span>
                  <span>{prayerTimesData[currentIndex].timings[time]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button onClick={prevSlide} className="text-2xl bg-gray-200 p-2 rounded-full">
              &larr;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button onClick={nextSlide} className="text-2xl bg-gray-200 p-2 rounded-full">
              &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerTimesCarousel;


