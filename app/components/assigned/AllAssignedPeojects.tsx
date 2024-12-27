import React from 'react'
import AssignedTaskCard from './AssignedTaskCard'
type Props = {}

function AllAssignedTasks({}: Props) {
  return (
    <div className='overflow-auto flex gap-10 flex-wrap justify-center mt-7'>
        <AssignedTaskCard/>
        <AssignedTaskCard/>
        <AssignedTaskCard/>
        <AssignedTaskCard/>
        <AssignedTaskCard/>
        <AssignedTaskCard/>
    </div>
  )
}

export default AllAssignedTasks