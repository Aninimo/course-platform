import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  RotateCw,
  RotateCcw,
  Strikethrough,
  Underline,
  Quote
} from 'lucide-react'

interface Props {
  editor: any;
}

export function Menu({ editor }: Props) {
  return (
    <div className='flex justify-center flex-wrap py-4 px-2 bg-slate-900 text-white rounded-t-lg gap-4 mb-4'>
      <button
        onClick={() => editor.chain().focus().undo().run()}>
        <RotateCcw />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <RotateCw />
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <Underline />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered />
      </button>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold />
      </button>
      <button  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 />
      </button>
    </div>
  )
}
