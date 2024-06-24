import React from 'react'
import IndexPages from './Pages/IndexPages'
import PrayerTimesPage from './Components/IndexCom/PrayerTimes'
// import CurrencyRates from './Components/IndexCom/CurrencyRates'


const page = () => {
  return (
    <div>
 
    <IndexPages/>
    {/* <CurrencyRates/> */}
    <PrayerTimesPage/>
      
    </div>
  )
}

export default page
