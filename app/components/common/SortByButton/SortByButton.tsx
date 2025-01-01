'use client';
import { useState } from 'react';
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  onCategoryChange: (category: string) => void;
  onSortByChange: (sortBy: string) => void;
};

const SortByButton = ({ onCategoryChange, onSortByChange }: Props) => {
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleCategory = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setCategory(value);
    onCategoryChange(value);
  };

  const handleSortBy = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSortBy(value);
    onSortByChange(value);
  };

  return (
    <div className="flex  sm:gap-1 md:gap-5 lg:gap-10">
      <div className="flex gap-1 lg:gap-2 font-semibold p-1">
        <span className="text-blue-800 dark:text-slate-300 items-center flex  lg:text-base ">Category</span>
        <FormControl variant="standard" sx={{ minWidth: 120 }} className='lg:w-28 w-16'>
          <Select value={category} onChange={handleCategory} displayEmpty className="dark:bg-slate-100 rounded-md lg:w-28 w-20 pl-1">
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="ToDo">ToDo</MenuItem>
            <MenuItem value="On Progress">On Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex gap-1 lg:gap-2 font-semibold p-1">
        <span className="text-blue-800 dark:text-slate-300 items-center flex  lg:text-base ">Sort By</span>
        <FormControl variant="standard" sx={{ minWidth: 120 }} className='lg:w-28 w-16'>
          <Select value={sortBy} onChange={handleSortBy} displayEmpty className="dark:bg-slate-100 rounded-md lg:w-28 w-20 pl-1">
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Recent">Recent</MenuItem>
            <MenuItem value="Due-Date">Due-Date</MenuItem>
            <MenuItem value="P-High">P-High</MenuItem>
            <MenuItem value="P-Med">P-Med</MenuItem>
            <MenuItem value="P-Low">P-Low</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SortByButton;
