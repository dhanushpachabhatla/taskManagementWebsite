import React from 'react'
import SortByButton from '../common/SortByButton/SortByButton'
const dashboardSubHeader = () => {
  return (
    <div className='mt-16 flex justify-between font-bold items-center'>
        <p className='text-[26px] font-bold text-neutral-700 dark:text-slate-200'>My Tasks</p>
        <SortByButton/>
    </div>
  )
}

export default dashboardSubHeader