"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const TiptapText = ({onContentChange, textData}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "text-base text-justify [&_ul]:list-disc [&_ol]:list-decimal [&_ul>li]:ml-10 [&_ol>li]:ml-6 md:text-lg xl:text-xl",
      },
    },
    content: `<article>
        ${textData}
    </article>`,
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(editor.getHTML());
      }
    },
  });

    useEffect(() => {
      if (!editor || !textData) return;
      
      const currentHtml = editor.getHTML();
      const newHtml = `<h1>${textData}</h1>`;
      
      if (currentHtml !== newHtml) {
        editor.commands.setContent(newHtml);
      }
    }, [textData, editor]);
  
  return <EditorContent editor={editor} />;
};

export default TiptapText;
