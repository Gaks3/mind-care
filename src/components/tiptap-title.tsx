"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapTitle = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "text-3xl md:text-4xl font-semibold mb-6",
      },
    },
    content: `<h1>Article's Title</h1>`,
  });

  return <EditorContent editor={editor} />;
};

export default TiptapTitle;
