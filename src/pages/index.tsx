import { useState } from 'react'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { UserButton, useUser } from '@clerk/nextjs'
import { Search } from 'lucide-react'

import { CourseCard } from '../components/courseCard'
import { Card } from '../components/card'
import { Graph } from '../components/graph'
import { CardSubscription } from '../components/cardSubscription'
import { client } from '../services/apollo-client'
import { GET_CATEGORIES, GET_COURSES } from '../services/queries'
import { getGraph } from '../actions/get-graph'
import { CourseProps, CategoryProps } from '../interfaces'
import prismadb from '../lib/prismadb'

interface MyPageProps{
  categories: CategoryProps[];
  courses: CourseProps[];
  course: any; 
  graph: any; 
  isPro: boolean; 
}
export default function App(props: MyPageProps) {
  const categories = props.categories;
  const allCourses = props.courses
  const courseInProgress = props.course
  const graph = props.graph
  const isPro = props.isPro

  const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null);

  const { user } = useUser()

  const filteredCourses = selectedCategory
    ? allCourses.filter((course) =>
      course.categories.some((category) => category.id === selectedCategory.id)
    )
    : allCourses
  
  return (
    <main className='flex flex-col lg:flex-row lg:gap-12 p-4 lg:pt-8 md:flex-col gap-12'>
      <div className='w-full lg:w-1/2'>
        <div className='bg-gray-200 rounded p-4 flex flex-col items-center mb-12 md:flex-row md:gap-64 lg:flex-row lg:gap-64'>
          <div className='lg:mr-64 mb-4 lg:mb-0 sm:mb-0'>
            <h1 className='text-2xl font-bold'>Hello {user?.fullName}</h1>
            <p>It&apos;s good to see you again</p>
          </div>
          <img
            className='w-32'
            src='https://cdn-icons-png.flaticon.com/128/4344/4344942.png'
            alt='Profile Image'
          />
        </div>
        <h1 className='font-bold text-2xl'>Courses</h1>
        <ul className='flex md:gap-16 mt-2 sm:flex gap-8'>
          {categories.map((category) => (
            <li key={category.id}>
              <p
                className={`cursor-pointer ${selectedCategory && selectedCategory.id === category.id
                    ? 'font-bold'
                    : ''
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.name}
              </p>
            </li>
          ))}
        </ul>
        <ul className='mb-4'>
          {filteredCourses?.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center gap-8'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search...'
              className='w-80 rounded p-2 bg-gray-200 pl-12'
            />
            <Search className='absolute left-2 top-1/2 transform -translate-y-1/2' />
          </div>
          <UserButton afterSignOutUrl='/' />
        </div>
        <div className='flex gap-8 mt-4'>
          <Card number={courseInProgress.length} description='in progress' />
        </div>
        <h2 className='font-bold mt-4 text-xl'>
          Your statistics
        </h2>
        <Graph data={graph} />
        <CardSubscription isPro={isPro} />
      </div>
    </main>
  )
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const { userId } = req.auth

  if (!userId) {
    res.writeHead(302, { Location: '/sign-in' })
    res.end();
    return { props: {} }
  }

  const { data: categoriesData } = await client.query({
    query: GET_CATEGORIES,
  })

  const { data: coursesData } = await client.query({
    query: GET_COURSES,
  })

  const graph = await getGraph(userId as string)

  const course = await prismadb.course.findMany({
    where: {
      userId: userId
    }
  })

  const isPro = await prismadb.subscription.findUnique({
    where: {
      userId: userId
    }
  })

  return {
    props: {
      categories: categoriesData.categories,
      courses: coursesData.courses,
      graph,
      isPro,
      course: JSON.parse(JSON.stringify(course)),
    }
  }
})
