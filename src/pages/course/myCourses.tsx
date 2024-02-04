import Link from 'next/link'
import { withServerSideAuth } from '@clerk/nextjs/ssr'

import prismadb from '../../lib/prismadb'
import { MyCoursesProps } from '../../interfaces'

interface Props {
  myCourses: MyCoursesProps[];
}

export default function MyCourses({ myCourses }: Props) {
  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold'>
        Your courses
      </h1>
      {myCourses.map((course) => (
        <div className='w-72 gap-4 mt-8 bg-gray-300 rounds p-4' key={course.id}>
          <Link href={`/course/chapter/${course.id}`}>
            <div className='flex items-center gap-4'>
              <img
                src={course.image}
                className='w-16'/>
              <h3>{course.name}</h3>
            </div>
          </Link>
        </div>
      ))}
    </main>
  )
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const { userId } = req.auth;

  if (!userId) {
    res.writeHead(302, { Location: '/sign-in' })
    res.end();
    return { props: {} }
  }

  const myCourses = await prismadb.course.findMany({
    where: {
      userId: userId as string
    }
  })

  return {
    props: {
      myCourses: JSON.parse(JSON.stringify(myCourses)),
    }
  }
})
