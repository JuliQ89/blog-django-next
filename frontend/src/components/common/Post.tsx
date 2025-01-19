import { PostI, TagI } from "@/utils/types";
import Link from "next/link";

const Post = ({ post }: { post: PostI }) => {
  return (
    <Link href={`/post/${post.id}`}>
      <article className="rounded-md border border-slate-200 bg-white flex flex-col gap-4 p-7 max-w-[60%]">
        <div className="flex items-center gap-1">
          <div className="rounded-full w-9 h-9 bg-slate-500"></div>
          <div className="flex flex-col">
            <h3>{post.user.username}</h3>
            <span>
              {new Date(post.created_at).toLocaleDateString("de-de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">{post.heading}</h1>

        <div className="flex items-center justify-start gap-6">
          {post.tag.map((tag: TagI) => (
            <small className="text-slate-600" key={tag.id}>
              #{tag.name}
            </small>
          ))}
        </div>

        <div>
          👍🏻 <span>{post.likedCount} Likes</span>
        </div>
      </article>
    </Link>
  );
};

export default Post;
