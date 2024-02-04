import Link from 'next/link'
import { Clock, Flame } from 'lucide-react'

import { CourseProps } from '../interfaces'

interface Props{
  course: CourseProps;
}

export function CourseCard({ course }: Props){
  return(
    <div className='bg-gray-200 rounded p-4 mt-8'>
      <div className='flex flex-col items-center gap-8 md:flex-row lg:flex-row '>
       <img 
         src={course.image.url}
         className='w-8'
        />
        <div>
          <strong>
            {course.name}
          </strong>
          <p>
            by {course.teacher}
          </p>
        </div>
        <p className='flex items gap-2'>
          <Clock/>
          {course.hour}
        </p>
        <p className='flex items-center gap-2'>
          <Flame/>
          {course.ranting}
        </p>
        <Link
          className='bg-black p-2 px-4 rounded text-white'
          href={`/course/${course.id}`}>
          View course
        </Link>
      </div>
    </div>
  )
}
