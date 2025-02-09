"use client";

import { PostI, TagI } from "@/utils/types";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import PostUserProfile from "./PostUserProfile";
import Tag from "./Tag";
import LikeBtn from "./LikeBtn";

const Post = ({ post }: { post: PostI }) => {
  return (
    <Link href={`/post/${post.id}`} className="max-w-[60%]">
      <article className="rounded-md border border-slate-200 bg-white flex flex-col gap-3 p-6">
        <PostUserProfile
          username={post.user.username}
          created_at={post.created_at}
        />

        <h1 className="text-3xl font-bold text-slate-900 hover:text-slate-600">
          {post.heading}
        </h1>

        <div className="flex items-center justify-start gap-4">
          {post.tag.map((tag: TagI) => (
            <Tag name={tag.name} id={tag.id} key={tag.id} />
          ))}
        </div>

        <div className="flex items-center justify-start gap-6">
          <LikeBtn post={post} />

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
