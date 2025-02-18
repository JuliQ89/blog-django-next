"use client";

import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { updatePost } from "@/store/features/posts/posts.action";
import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RichTextEditor } from "react-rich-text-editor-js";

const EditPost = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const post = useSelector((state: RootState) => state.posts.posts).find(
    (post) => post.id === params.id
  );
  const tags = useSelector((state: RootState) => state.tags.tags);
  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const isAuthor = post?.user.id === user_id;

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setTitle(post.heading);
      setSelectedTags(post.tag.map((tag) => `#${tag.name}`));
    }
  }, [post]);

  const handleUpdatePost = () => {
    dispatch(
      updatePost({
        heading: title,
        content: content,
        tags: tags
          .filter((tag) => selectedTags.includes(`#${tag.name}`))
          .map((tag) => tag.id),
        post_id: params.id,
      })
    );
  };

  return (
    <HeaderContentLayout headerProps={{ hasSearchBar: false }}>
      {post ? (
        isAuthor ? (
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
                onClick={handleUpdatePost}
                className="btn-filled"
                style={{ width: "fit-content" }}
              >
                Publish
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center p-8">
            <h1 className="text-slate-800 font-medium text-2xl">
              You didn't wrote this post.
            </h1>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center p-8">
          <h1 className="text-slate-800 font-medium text-2xl">
            No post with the Id '{params.id}' was found.
          </h1>
        </div>
      )}
    </HeaderContentLayout>
  );
};

export default EditPost;
