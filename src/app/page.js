import React from 'react'
import IndexPages from './Pages/IndexPages'
import PrayerTimesPage from './Components/IndexCom/PrayerTimes'
import PrayerHome from './Components/IndexCom/PrayerHome'
// import CurrencyRates from './Components/IndexCom/CurrencyRates'


const page = () => {
  return (
    <div>
 
    <IndexPages/>
    {/* <CurrencyRates/> */}
    {/* <PrayerTimesPage/> */}
    <PrayerHome/>
      
    </div>
  )
}

export default page
