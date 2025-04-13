"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const TiptapTitle = ({onContentChange, titleData}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "text-3xl md:text-4xl font-semibold mb-6",
      },
    },
    content: `<h1>${titleData}</h1>`,
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(editor.getText());
      }
    },
  });

  useEffect(() => {
    if (!editor || !titleData) return;
    
    const currentHtml = editor.getHTML();
    const newHtml = `<h1>${titleData}</h1>`;
    
    if (currentHtml !== newHtml) {
      editor.commands.setContent(newHtml);
    }
  }, [titleData, editor]);

  return <EditorContent editor={editor} />;
};

export default TiptapTitle;
