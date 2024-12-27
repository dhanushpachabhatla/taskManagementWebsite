import React from 'react'
import ProjectCard from '../common/ProjectCard/ProjectCard'
type Props = {}

function AllProjects({}: Props) {
  return (
    <div className='overflow-auto flex gap-10 flex-wrap justify-center mt-7'>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
    </div>
  )
}

export default AllProjects