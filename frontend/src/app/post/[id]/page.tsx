"use client";

import { RootState } from "@/store/store";
import { PostI } from "@/utils/types";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { useParams } from "next/navigation";

function Post() {
  const params = useParams<{ id: string }>();
  const post = useSelector((state: RootState) => state.posts.posts).find(
    (post: PostI) => post.id == params.id
  );

  return (
    <div className="p-8 flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-slate-900">{post?.heading}</h1>
      <div>{parse(post?.content || "")}</div>
    </div>
  );
}

export default Post;
