import React from 'react';
import AllPost from './AllPost';
import Add1 from './Add1';
import Add from './Add';
import PrayerTimesPage from './PrayerTimePage';
import CurrencyRates from './CurrencyRates';
import MainCategory from './MainCategory';
import SecondCategory from './SecondCategory';
import ThreeCategory from './ThreeCategory';
import FourthCategory from './FourthCategory';
import FifthCategory from './FifthCategory';
import MoreThreeCategory from './MoreThreeCategory';
import FifthMoreCategory from './FifthMoreCategory';

const HomeLayout = () => {
  return (
    <div>
      <div className='grid lg:grid-cols-12  gap-3 grid-cols-1 '>
        <div className='col-span-2'>
          <div className='hidden md:block'>
            <Add1 />
          </div>
        </div>

        <div className='lg:col-span-10 col-span-10 '>
        <div className='grid md:grid-cols-8 lg:grid-cols-8 grid-cols-1 gap-5 '>
              <div className='md:col-span-5  col-span-1'>
                <MainCategory />
              </div>
              <div className='md:col-span-3  col-span-1 px-2 h-[404px] w-[100%] mt-4 shadow-lg'>
                <AllPost />
              </div>
            </div>
          <Add />
    
        </div>
      </div>

      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-10  '>
          <SecondCategory/>

        </div>
        
        <div className='col-span-2'>
          <PrayerTimesPage/>

        </div>

      </div>

      <div>
        <ThreeCategory/>
      </div>

     

      <div className='grid mt-16 grid-cols-12  gap-5'>

<div className=' col-span-12'> 
  <MoreThreeCategory/>
</div>
{/* <div className=' col-span-3'> 
<CurrencyRates/>
</div> */}

</div>

{/* <div>
  <TestFile/>
</div> */}

   {/* fourth category */}

<div className='grid grid-cols-12 mt-16 gap-3'>
        <div className='col-span-10  '>
          <FourthCategory/>
      </div>
        
        <div className='col-span-2'>
          <CurrencyRates/>

        </div>

      </div>
                                {/* fifth category */}

<div className='grid grid-cols-12 mt-16 mb-6 gap-3'>
        <div className='col-span-10  '>
          <FifthCategory/>
      </div>
        
        <div className='col-span-2'>
          <Add1/>

        </div>

      </div>
<div className='grid grid-cols-12 mt-16 mb-6 gap-3'>
        <div className='col-span-12  '>
          <FifthMoreCategory/>
      </div>
        
        {/* <div className='col-span-2'>
          <Add1/>

        </div> */}

      </div>



    </div>
  );
};

export default HomeLayout;
