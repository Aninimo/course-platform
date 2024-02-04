import { withServerSideAuth } from '@clerk/nextjs/ssr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Crown } from 'lucide-react';

import { client } from '../../services/apollo-client';
import { GET_COURSE } from '../../services/queries';
import { CourseProps, SubscriptionProps } from '../../interfaces';
import prismadb from '../../lib/prismadb';

interface Props {
  course: CourseProps;
  subscription: SubscriptionProps;
}

export default function CourseId({ course, subscription }: Props) {
  const startCourse = async () => {
    if (course.isPremium === false || (course.isPremium === true && subscription.status === 'active')) {
      try {
        const response = await fetch('/api/startCourse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: course.name,
            image: course.image.url,
            chapter: course.chapter
          }),
        })
        const responseData = await response.json()
        toast.success('Course started successfully!');
      } catch (error: any) {
        toast.error(error);
      }
    } else {
      toast.error('You need to be a premium user to start this course');
    }
  };

  return (
    <main>
      <video autoPlay className='w-11/12 mt-8'>
        <source src={course.video.url} />
      </video>
      <div className='flex items-center gap-96'>
        <h1 className='font-bold text-3xl mt-8 mb-4'>{course.name}</h1>
        <span>by {course.teacher}</span>
      </div>
      <p>{course.description}</p>
      <div>
        {course.isPremium === true ? <Crown className='absolute ml-28 text-yellow-500 rotate-45' /> : ''}
        <button onClick={startCourse} className='bg-black p-2 px-4 rounded text-white mt-8 mb-8'>
          Start course
        </button>
        <ToastContainer />
      </div>
    </main>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, params }) => {
  const { userId } = req.auth;
  const id = params?.id;

  try {
    const { data } = await client.query({
      query: GET_COURSE,
      variables: {
        id: id,
      },
    });

    const subscription = await prismadb.subscription.findUnique({
      where: {
        userId: userId as string,
      },
    });

    return {
      props: {
        course: data.course,
        subscription,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
})
