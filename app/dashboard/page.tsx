import React from 'react'
import DashboardHeader from '../components/dashboard/dashboardHeader'
import DashboardSubHeader from '../components/dashboard/dashboardSubHeader'
import AllProjects from '../components/dashboard/AllProjects'
import StatsRightSideBar from '../components/common/StatsRightSideBar/StatsRightSideBar'
import DarkModeToggle from '../components/common/DarkModeToggle/DarkModeToggleButton'
function Dashboard() {
  return (
    <div style={{marginTop:"80px"}} className=' bg-slate-100 dark:bg-neutral-950 w-full min-h-screen flex'>
      <div className='w-[78%] flex flex-col gap-4 p-10 border-r-2 dark:border-r-0'>
       
        <DashboardHeader/>
        <DashboardSubHeader/>
        <AllProjects/>
      </div>
      <StatsRightSideBar/>
    </div>
  )
}

export default Dashboard
