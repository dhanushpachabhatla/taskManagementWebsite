import React from 'react'
import SearchBar from '../common/SeachBar/SearchBar'
import AddProject from '../common/AddProject/AddProject'
function dashboardHeader() {
  return (
    <div className='flex justify-between'>
        <SearchBar/>
        <AddProject/>
    </div>
  )
}

export default dashboardHeader