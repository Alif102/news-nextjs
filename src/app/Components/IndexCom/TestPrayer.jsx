"use client"
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PrayerTime from './PrayerTime';

async function getPrayerTimes(city) {
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=2`);
  const data = await response.json();
  return { city, timings: data.data.timings };
}

const cities = ['Dhaka', 'Mymensingh', 'Sylhet', 'Rajshahi'];

const TestPrayer = () => {
  const [prayerTimesData, setPrayerTimesData] = useState([]);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const data = await Promise.all(cities.map(city => getPrayerTimes(city)));
      setPrayerTimesData(data);
    };

    fetchPrayerTimes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Prayer Times for Cities in Bangladesh</h1>
      {prayerTimesData.length > 0 && (
        <Slider {...settings} className="w-full max-w-md">
          {prayerTimesData.map((data) => (
            <div key={data.city}>
              <PrayerTime data={data} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TestPrayer;
