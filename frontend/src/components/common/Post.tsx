"use client";

import { RootState } from "@/store/store";
import { PostI, TagI } from "@/utils/types";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { AiOutlineComment } from "react-icons/ai";

const Post = ({ post }: { post: PostI }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const [isLiked, setIsLiked] = useState<boolean>(
    post.liked.some((obj) => obj.id == user_id)
  );

  const toggleLike = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLiked(e.target.checked);
  };

  return (
    <Link href={`/post/${post.id}`} className="max-w-[60%]">
      <article className="rounded-md border border-slate-200 bg-white flex flex-col gap-3 p-6">
        <div className="flex items-center gap-2">
          <div className="rounded-full w-9 h-9 bg-slate-500"></div>
          <div className="flex flex-col">
            <h3 className="text-slate-800 font-medium text-[0.9rem] leading-6">
              {post.user.username}
            </h3>
            <span className="text-slate-800 text-sm">
              {new Date(post.created_at).toLocaleDateString("de-de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 hover:text-slate-600">
          {post.heading}
        </h1>

        <div className="flex items-center justify-start gap-4">
          {post.tag.map((tag: TagI) => (
            <small
              className="text-slate-600 p-[0.3rem] bg-transparent rounded-md hover:bg-gray-200 border border-transparent hover:border-gray-400"
              key={tag.id}
            >
              #{tag.name}
            </small>
          ))}
        </div>

        <div className="flex items-center justify-start gap-6">
          <div
            className="w-fit p-[0.3rem] bg-transparent rounded-md hover:bg-gray-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <label
              htmlFor={`isliked-${post.id}`}
              className="flex items-center gap-2 text-slate-800 cursor-pointer"
            >
              {isLiked ? <AiFillLike size={25} /> : <AiOutlineLike size={25} />}{" "}
              <span className="text-sm">{post.likedCount} Likes</span>
            </label>
            <input
              type="checkbox"
              name="isliked"
              id={`isliked-${post.id}`}
              className="absolute hidden"
              checked={isLiked}
              onChange={isAuthenticated ? toggleLike : () => {}}
            />
          </div>

          <div
            className="w-fit p-[0.3rem] bg-transparent rounded-md hover:bg-gray-200 text-slate-800 cursor-pointer flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <AiOutlineComment size={25} />
            <span className="text-sm">{post.comments.length} Comments</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Post;
