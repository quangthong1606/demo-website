import React, { useEffect, useRef, useState } from "react";

const TextEditor: React.FC<any> = ({ newBlogData, setNewBlogData }) => {
  const config = {
    ckbox: {
      tokenUrl: `https://115760.cke-cs.com/token/dev/514ff875388d7092d405323fca100e87a4bc13847e40cd9ced7529d1a4f9?limit=10`,
      theme: "lark",
    },
    toolbar: [
      "ckbox",
      "imageUpload",
      "ckboxImageEdit",
      "|",
      "heading",
      "|",
      "undo",
      "redo",
      "|",
      "bold",
      "italic",
      "|",
      "blockQuote",
      "indent",
      "link",
      "|",
      "bulletedList",
      "numberedList",
    ],
  };

  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const handleUpdateBlogData = (data: string) => {
    setNewBlogData({ ...newBlogData, content: data });
  };

  return (
    <>
      {editorLoaded ? (
        <editorRef.current.CKEditor
          editor={editorRef.current.ClassicEditor}
          config={config}
          data={newBlogData?.content}
          onBlur={(event: any, editor: any) => {
            const data = editor.getData();
            handleUpdateBlogData(data);
          }}
        />
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default TextEditor;
