import useUserProfile from "@/hooks/useUserProfile";
import { CommentI } from "@/utils/types";

const Comment = ({ comment }: { comment: CommentI }) => {
  const { Profile } = useUserProfile({
    profile: comment.user.profile.image,
    user_id: comment.user.id,
    redirect: true,
  });

  return (
    <div className="w-full flex gap-3 items-start">
      {Profile}

      <div className="rounded-md border border-slate-200 grow flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-[17px] text-slate-700">
            {comment.user.username}
          </h4>
          <span className="text-slate-400">•</span>
          <span className="text-base text-slate-400">
            {new Date(comment.created_at).toLocaleDateString("de-de", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="text-slate-950 text-base">{comment.text}</div>
      </div>
    </div>
  );
};

export default Comment;
