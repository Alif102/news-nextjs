import React from 'react';
import BreakingNewsSlider from './BreakingNewsSlider';
import AllPost from './AllPost';
import Add1 from './Add1';
import Add from './Add';
import PrayerHome from './PrayerHome';

const HomeLayout = () => {
  return (
    <div>
      <div className='grid md:grid-cols-12  gap-3 grid-cols-1 '>
        <div className='col-span-2'>
          <div className='hidden md:block'>
            <Add1 />
          </div>
        </div>

        <div className='col-span-10 mx-auto'>
          <div className='flex gap-9 flex-col md:flex-row'>
            <BreakingNewsSlider />
            <AllPost />
          </div>
          <Add />
          <PrayerHome/>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
