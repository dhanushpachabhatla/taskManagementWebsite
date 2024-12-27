import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
function SearchBar() {
  return (
    <div className='flex items-center'>
        {/* icon */}
        <div className=' flex items-center border-b-2 border-black dark:border-white h-[42px] w-11 justify-center '>
            <SearchIcon className='text-slate-500 outline-none' sx={{fontSize:"26px"}}/>
        </div>
        {/* input */}
        <div className='border-b-2 border-black dark:border-white'>
            <input type="text" placeholder='Search...' className='p-2 bg-transparent text-16px] outline-none text-slate-700 dark:text-slate-200' />
        </div>
    </div>
  )
}

export default SearchBar