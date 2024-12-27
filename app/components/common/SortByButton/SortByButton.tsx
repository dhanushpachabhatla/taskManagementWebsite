"use client"
import { useState } from 'react';
import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
type Props = {}

const SortByButton = (props: Props) => {
  const [Category,setCategory] = useState('')
  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
    console.log(event.target.value)
  }
  const [SortBy,setSortBy] = useState('')
  const handleSortBy = (event: SelectChangeEvent) => {
    setSortBy(event.target.value)
    console.log(event.target.value)
  }
  return (
    <div className='flex gap-10'>
    <div className='flex gap-2 font-semibold p-1 '>
        <span className='text-blue-800 dark:text-slate-300 items-center flex'>Category</span>
            <div className='flex gap-1 items-center cursor-pointer border-b-slate-50'>
                <span className='text-slate-500'> 
                <div>
            <FormControl variant='standard' sx={{ minWidth: 120 }} className='dark:text-slate-100' >
                <Select
                    labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
                    value={Category}
                    onChange={handleCategory}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    className='dark:bg-slate-100 rounded-md pl-1'
                    sx={{zIndex:"2"}}
                >
                    <MenuItem value="" >
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"ToDo"}>ToDo</MenuItem>
                    <MenuItem value={"On Progress"}>On Progress</MenuItem>
                    <MenuItem value={"one"}>Done</MenuItem>
                </Select>
            </FormControl>
        </div>
                   </span>
                {/* <KeyboardArrowDownIcon sx={{fontSize:"20px"}} className='text-slate-900 dark:text-slate-300' /> */}
            </div>
    </div>
    <div className='flex gap-3 font-semibold p-1 '>
        <span className='text-blue-800 dark:text-slate-300 items-center flex'>Sort By</span>
            <div className='flex gap-1 items-center cursor-pointer border-b-slate-50'>
                <span className='text-slate-500'>
                <div>
            <FormControl variant='standard' sx={{ minWidth: 120 }}>
                <Select
                    value={SortBy}
                    onChange={handleSortBy}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    className='dark:bg-slate-100 rounded-md pl-1'
                    sx={{zIndex:"2"}}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Recent"}>Recent</MenuItem>
                    <MenuItem value={"Due-Date"}>Due-Date</MenuItem>
                    <MenuItem value={"P-High"}>P-High</MenuItem>
                    <MenuItem value={"P-Med"}>P-Med</MenuItem>
                    <MenuItem value={"P-Low"}>P-Low</MenuItem>
                </Select>
            </FormControl>
        </div>
                </span>
                {/* <KeyboardArrowDownIcon sx={{fontSize:"20px"}} className='text-slate-900 dark:text-slate-300' /> */}
            </div>
    </div>
    </div>
  )
}

export default SortByButton