"use client"
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

async function getPrayerTimes(city) {
  const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=2`);
  const data = await response.json();
  return { city, timings: data.data.timings };
}

const cities = ['Barishal', 'Chattogram', 'Dhaka', 'Khulna', 'Rajshahi', 'Rangpur', 'Mymensingh', 'Sylhet'];

const PrayerTimesPage = () => {
  const [prayerTimesData, setPrayerTimesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(cities.map(city => getPrayerTimes(city)));
      setPrayerTimesData(data);
    };

    fetchData();
  }, []);

  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable arrows
    nextArrow: <SampleNextArrow />, // Custom next arrow component
    prevArrow: <SamplePrevArrow />, // Custom previous arrow component
  };

  if (prayerTimesData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Typography variant="h1" className="text-3xl font-bold mb-6">
        Prayer Times for Cities in Bangladesh
      </Typography>
      <Slider {...settings} className="w-full max-w-2xl">
        {prayerTimesData.map((data) => (
          <div key={data.city}>
            <Card className="mb-8">
              <CardBody>
                <Typography variant="h2" className="text-2xl font-semibold mb-4">
                  {data.city}
                </Typography>
                <ul>
                  {Object.keys(data.timings).map((time) => (
                    <li key={time} className="border-b last:border-b-0 py-2 flex justify-between">
                      <span className="font-medium">{time}</span>
                      <span>{data.timings[time]}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
      onClick={onClick}
    />
  );
};

export default PrayerTimesPage;
