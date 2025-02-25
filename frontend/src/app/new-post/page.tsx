"use client";

import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { createPost } from "@/store/features/posts/posts.action";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RichTextEditor } from "react-rich-text-editor-js";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const tags = useSelector((state: RootState) => state.tags.tags);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    `#${tags[0]?.name}`,
  ]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedTags([`#${tags[0]?.name}`]);
  };

  const handleCreatePost = () => {
    dispatch(
      createPost({
        heading: title,
        content: content,
        tags: tags
          .filter((tag) => selectedTags.includes(`#${tag.name}`))
          .map((tag) => tag.id),
      })
    );
    resetForm();
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
          <RichTextEditor
            editorContent={content}
            setEditorContent={setContent}
            height={"450px"}
            maxHeight={"800px"}
          />
          <select
            required
            onChange={(e) => {
              const options = [...e.target.selectedOptions];
              const values = options.map((option) => option.value);
              setSelectedTags(values);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 min-w-[250px]"
            multiple
            value={selectedTags}
          >
            {tags.map((tag) => (
              <option key={tag.id} value={`#${tag.name}`}>
                #{tag.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleCreatePost}
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
