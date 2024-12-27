import React from 'react'
import AddIcon from '@mui/icons-material/Add';
const AddProject = () => {
  return (
    <div>
      <button className='bg-blue-800 rounded-lg p-2 flex gap-1'>
        <AddIcon  sx={{fontSize:"22px"}}/>
        <span>Add Task</span>
      </button>
    </div>
  )
}

export default AddProject
