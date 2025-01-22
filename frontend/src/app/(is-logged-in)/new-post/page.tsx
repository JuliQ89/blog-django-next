"use client";

import CKeditor from "@/components/common/CKeditor";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { useState } from "react";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const createPost = () => {
    console.log(title);
    console.log(content);
  };

  return (
    <HeaderContentLayout headerProps={{ hasSearchBar: false }}>
      <div className="w-full p-6">
        <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-[0.375rem] border border-gray-300">
          <div className="w-full flex flex-col gap-3 py-2">
            <textarea
              className="focus:outline-none placeholder:text-slate-700 placeholder:font-black placeholder:text-5xl text-5xl font-black text-slate-950 resize-none overflow-auto"
              placeholder="New post title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
          <CKeditor value={content} onChange={setContent} />
          <button
            onClick={createPost}
            className="btn-filled"
            style={{ width: "fit-content" }}
          >
            Publish
          </button>
        </div>
      </div>
    </HeaderContentLayout>
  );
};

export default CreatePost;
