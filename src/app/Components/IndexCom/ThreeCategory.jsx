import React from 'react'
import ThreeCategory1 from './ThreeCategory1'
import ThreeCategory2 from './ThreeCategory2'
import ThreeCategory3 from './ThreeCategory3'

const ThreeCategory = () => {
  return (
    <div className='grid grid-cols-3 gap-3 mt-14 '>
      <ThreeCategory1/>
      <ThreeCategory2/>
      <ThreeCategory3/>
    </div>
  )
}

export default ThreeCategory
