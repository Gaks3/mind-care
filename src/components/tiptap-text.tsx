"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapText = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "text-base text-justify [&_ul]:list-disc [&_ol]:list-decimal [&_ul>li]:ml-10 [&_ol>li]:ml-6 md:text-lg xl:text-xl",
      },
    },
    content: `<article>
        <p>Article's Content</p>
    </article>`,
  });

  return <EditorContent editor={editor} />;
};

export default TiptapText;
