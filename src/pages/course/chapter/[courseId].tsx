import { useState, useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'

import { ChapterProps } from '../../../interfaces'
import prismadb from '../../../lib/prismadb'

interface Props {
  chapter: ChapterProps[];
}

export default function ChapterPage({ chapter }: Props){
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  const handleMarkAsCompleted = () => {
    setCurrentChapterIndex(currentChapterIndex + 1)
  }

  useEffect(() => {
    if (currentChapterIndex === chapter.length) {
      setCompleted(true);
    }
  },[currentChapterIndex, chapter])

  const currentChapter = chapter[currentChapterIndex] || {};

  return(
    <main className='p-4'>
      <video autoPlay className='w-11/12 mt-8'>
        <source src={currentChapter.video} />
      </video>
      <div className='flex justify-between mt-8'>
        <h1 className='font-bold text-2xl'>
          {currentChapter.name}
        </h1>
        {completed ? (
          <p>Congratulations! You&apos; ve completed all chapters.</p>
        ) : (
          <button
            onClick={handleMarkAsCompleted}
            disabled={completed}
            className='bg-slate-900 text-white rounded px-8'>
            Mark as completed
          </button>
        )}
      </div>     
      <p className='mt-4'>
        {currentChapter.description}
      </p>
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const courseId = context.params?.courseId as string; 
  
  try {
    const chapter = await prismadb.chapter.findMany({
      where: {
        courseId: courseId
      }
    })

    return {
      props: {
        chapter
      },
    }
  } catch (error) {
    return {
      props: {
        chapter: null
      }
    }
  }
}
