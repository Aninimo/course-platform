import { GetServerSidePropsContext } from 'next'

import Editor from '../../components/editorComponents/editor'
import prismadb from '../../lib/prismadb'
import { NoteProps } from '../../interfaces'

interface Props{
  note: NoteProps;
}

export default function NoteDetailsPage({ note }: Props) {
  
  return (
    <main className='p-4'>
      <h1 className='font-bold text-2xl'>
        Title: {note.title}
      </h1>
      <Editor noteId={note.id} initialContent={note.content} />
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const noteId = context.params?.noteId as string; 
  
  try{
     const note = await prismadb.note.findUnique({
      where: {
        id: noteId
      }
    })

    if (!note) {
      return {
        props: {
          note: null,
        }
      }
    }

    return{
      props: {
        note: JSON.parse(JSON.stringify(note))
      },
    }
  }catch (error){
    return{
      props:{
        note: null
      }
    }
  }
}
