import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { Plus, X } from 'lucide-react'

import prismadb from '../../lib/prismadb'
import { NoteProps } from '../../interfaces'

interface Props {
  notes: NoteProps[];
}

export default function NotePage({ notes }: Props) {
  const [createTitle, setCreateTitle] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: noteTitle }),
      });
      const responseData = await response.json()

      const newNoteId = responseData.id;

      router.push({
        pathname: `/notes/${newNoteId}`,
        query: { formData: responseData },
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleClose = () => {
    setCreateTitle(false);
  }

  return (
    <main className='p-4'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-2xl mb-4'>Your notes</h1>
        <button
          onClick={() => setCreateTitle((cur) => !cur)}
          className='flex px-4 gap-4'>
          Add note
          <Plus />
        </button>
      </div>
      {createTitle ? (
        <div >
          <div className='w-96 flex flex-col bg-gray-300 p-8 rounded mt-4 mb-4'>
            <button onClick={handleClose}>
              <X />
            </button>
            <div className='flex gap-4'>
              <input
                placeholder='Enter title'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className='mt-4 p-2 rounded'
              />
              <button
                onClick={handleCreate}
                className='bg-gray-400 rounded mt-4 px-8'>
                Add
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <ul>
        {notes.map((note) => (
          <li className='w-52 flex items-center gap-4 bg-gray-300 rounded p-2' key={note.id}>
            <div className='w-2 h-12 bg-zinc-900 rounded'>
            </div>
            <Link
            href={`/notes/${note.id}`}
            key={note.id}
            className='flex gap-2 text-2xl text-center'>
              <p>
                {note.title}
              </p>
          </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export const getServerSideProps = withServerSideAuth(async ({ req, res }) => {
  const { userId } = req.auth

  if (!userId) {
    res.writeHead(302, { Location: '/sign-in' })
    res.end();
    return { props: {} }
  }

  const notes = await prismadb.note.findMany({
    where: {
      userId: userId as string,
    },
  })

  return {
    props: {
      notes: JSON.parse(JSON.stringify(notes))
    }
  }
})
