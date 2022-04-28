import React from "react";
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import EditorComponent from "../../component/post/EditorComponent";
import { useState } from "react";

const PostWrite = () => {
  const [text, setText] = useState("");
  const handleText = (value) => {
    console.log(value);
    setText(value);
  };

  return (
    <>
      <h1>PostWrite</h1>
      <EditorComponent value={text} onChange={handleText} />
    </>
  );
};

export default PostWrite;
