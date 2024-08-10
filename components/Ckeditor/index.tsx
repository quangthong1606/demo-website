// pages/add-new-blog.tsx
import React, { ReactNode, useState } from "react";
import TextEditor from "./TextEditor";
import { Button } from "antd";

type Props = {
  onEmit: (data: { content: string }) => void;
};

const Editor: React.FC<Props> = ({ onEmit }) => {
  const [newBlogData, setNewBlogData] = useState<any>({});

  const handleSubmit = () => {
    onEmit(newBlogData);
  };

  return (
    <div className="pb-8">
      <TextEditor setNewBlogData={setNewBlogData} newBlogData={newBlogData} />
      <div className="pt-5 text-center">
        <Button onClick={handleSubmit} type="default" htmlType="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Editor;
