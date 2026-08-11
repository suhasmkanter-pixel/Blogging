'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'

interface Tiptapprops {
    data: string,
    setEditorChange: (html: string) => void
}

const Tiptap = ({ setEditorChange, data }: Tiptapprops) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      
      Placeholder.configure({
        placeholder: "Start writing your post here...",
      }),
    ],
    content: data,
    immediatelyRender: false,
    
    // THIS FORCES THE INNER EDITOR AREA TO BE STYLED LIKE NOTION
    editorProps: {
      attributes: {
        class: 'prose prose-zinc max-w-none focus:outline-none min-h-[400px] p-6 cursor-text text-zinc-900',
      },
    },
    
    onUpdate: ({ editor }) => {
      const html = editor.getHTML(); 
      setEditorChange(html);
    }
  })

  if (!editor) return null;

  return (
    // Clean White Card Container matching your image
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden relative">
      
      {/* BUBBLE MENU */}
      <BubbleMenu editor={editor} >
        <div className="flex items-center gap-1 bg-zinc-900 text-white p-1.5 rounded-lg shadow-xl border border-zinc-800">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded text-xs font-bold hover:bg-zinc-800 ${editor.isActive('bold') ? 'bg-blue-600' : ''}`}
          >
            B
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded text-xs italic hover:bg-zinc-800 ${editor.isActive('italic') ? 'bg-blue-600' : ''}`}
          >
            I
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 rounded text-xs underline hover:bg-zinc-800 ${editor.isActive('underline') ? 'bg-blue-600' : ''}`}
          >
            U
          </button>
          <div className="w-px h-4 bg-zinc-700 mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded text-xs font-semibold hover:bg-zinc-800 ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600' : ''}`}
          >
            H1
          </button>
          <button
            type="button" 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded text-xs font-semibold hover:bg-zinc-800 ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600' : ''}`}
          >
            H2
          </button>
        </div>
      </BubbleMenu>

      {/* COMPONENT CONTENT ENGINE */}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
