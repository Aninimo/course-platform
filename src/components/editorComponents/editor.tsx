import { useState } from 'react'
import { useRouter } from 'next/router'
import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import { ToastContainer, toast } from 'react-toastify'

import { Menu } from './menu'

interface EditorProps {
  noteId?: string;
  initialContent?: string;
}

type Levels = 1 | 2 | 3 | 4 | 5 | 6

const classes: Record<Levels, string> = {
  1: 'text-5xl font-bold my-2',
  2: 'text-4xl font-bold my-2',
  3: 'text-3xl font-bold my-2',
  4: 'text-2xl font-bold my-2',
  5: 'text-xl font-bold my-2',
  6: 'text-lg font-bold my-2',
};

export default function Editor({ noteId, initialContent }: EditorProps) {
  const [editorContent, setEditorContent] = useState(initialContent || '')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: 'pl-4 border-l-2 border-l-gray-500',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'px-5 list-disc my-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'px-5 list-decimal my-4',
          },
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }).extend({
        renderHTML(this, { node, HTMLAttributes }) {
          const { options } = this;
          const hasLevel = options.levels.includes(node.attrs.level);
          const level: Levels = hasLevel ? node.attrs.level : options.levels[0];
          return [
            `h${level}`,
            mergeAttributes(options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
      Underline,
    ],
    autofocus: false,
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML())
    },
  })

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId, content: editorContent }),
      })
      toast.success('Note save success!');
    } catch (error) {
      alert(error)
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.push({
        pathname: `/notes`,
      });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div className='mt-8'>
        <Menu
          editor={editor}
        />
        <EditorContent
          editor={editor}
          className='p-4 border' />
        <div className='flex justify-between'>
          <button
            onClick={handleSave}
            className='bg-slate-900 text-white rounded p-2 px-12 mt-8'>
            Save
          </button>
          <ToastContainer/>
          <button
            onClick={onDelete}
            className='bg-red-500 text-white rounded p-2 px-12 mt-8'>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
