import React from "react";

interface PostUserProfileI {
  username: string;
  created_at: string;
}

const PostUserProfile = ({ username, created_at }: PostUserProfileI) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full w-9 h-9 bg-slate-500"></div>
      <div className="flex flex-col">
        <h3 className="text-slate-800 font-medium text-[0.9rem] leading-6">
          {username}
        </h3>
        <span className="text-slate-800 text-sm">
          {new Date(created_at).toLocaleDateString("de-de", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default PostUserProfile;
