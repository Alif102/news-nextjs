import React from 'react';
import BreakingNewsSlider from './BreakingNewsSlider';
import AllPost from './AllPost';
import Add1 from './Add1';
import Add from './Add';
import PrayerTimesPage from './PrayerTimePage';

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
    
        </div>
      </div>

      <div className='grid grid-cols-12 gap-5'>

        <div className=' col-span-9'> 
          <h1>content</h1>
        </div>
        <div className=' col-span-3 mr-9'> 
        <PrayerTimesPage/>
        </div>

      </div>
    </div>
  );
};

export default HomeLayout;
