"use client";

import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { updatePost } from "@/store/features/posts/posts.action";
import { RootState } from "@/store/store";
import Image from "next/image";
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
  const [spellCheck, setSpellCheck] = useState<boolean>(true);
  const tags = useSelector((state: RootState) => state.tags.tags);
  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const isAuthor = post?.user.id === user_id;

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  async function urlToFile(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileName = imageUrl.split("/").pop() || "download.jpg";
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setTitle(post.heading);
      setSelectedTags(post.tag.map((tag) => `#${tag.name}`));
      if (post.image) {
        urlToFile("http://localhost:8000" + post.image).then((file) => {
          setImage(file);
        });
      } else {
        setImage(null);
      }
    }
  }, [post]);

  const handleUpdatePost = () => {
    dispatch(
      updatePost({
        heading: title,
        content: content,
        image: image,
        tags: tags
          .filter((tag) => selectedTags.includes(`#${tag.name}`))
          .map((tag) => tag.id),
        post_id: params.id,
      })
    );
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setImage(e.target.files[0]);
  };

  return (
    <HeaderContentLayout headerProps={{ hasSearchBar: false }}>
      {post ? (
        isAuthor ? (
          <div className="w-full p-6">
            <div className="flex flex-col gap-4 bg-white w-full p-5 rounded-[0.375rem] border border-gray-300">
              <div className="w-full py-2 flex items-start justify-start gap-5">
                {image && (
                  <div className="w-56 h-20 overflow-hidden">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="object-cover"
                      width={224}
                      height={80}
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label htmlFor="cover_image" className="btn-outlined">
                    {image ? "Change" : "Add a cover image"}
                  </label>
                  {image && (
                    <button
                      className="btn-filled"
                      onClick={() => setImage(null)}
                    >
                      Remove
                    </button>
                  )}
                  <input
                    type="file"
                    name="cover_image"
                    id="cover_image"
                    hidden
                    onChange={handleCoverImageChange}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-3 py-2">
                <textarea
                  className="focus:outline-none placeholder:text-slate-700 placeholder:font-black placeholder:text-5xl text-5xl font-black text-slate-950 resize-none overflow-auto"
                  placeholder="New post title here..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></textarea>
              </div>

              <div className="w-full flex items-center gap-4">
                <label
                  className="inline-flex items-center cursor-pointer"
                  htmlFor="spellcheck"
                >
                  <input
                    type="checkbox"
                    id="spellcheck"
                    name="spellcheck"
                    className="sr-only peer"
                    checked={spellCheck}
                    onChange={(e) => {
                      setSpellCheck(e.target.checked);
                    }}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-slate-900">
                    Rechtschreibung {spellCheck ? "an" : "aus"}
                  </span>
                </label>
              </div>

              <RichTextEditor
                editorContent={content}
                setEditorContent={setContent}
                spellCheck={spellCheck}
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
