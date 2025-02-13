import useUserProfile from "@/hooks/useUserProfile";
import React from "react";

interface PostUserProfileI {
  profile: string | null;
  username: string;
  created_at: string;
  user_id: number;
}

const PostUserProfile = ({
  username,
  created_at,
  profile,
  user_id,
}: PostUserProfileI) => {
  const { Profile, redirectToUserProfilePage } = useUserProfile({
    profile: profile,
    user_id: user_id,
  });

  return (
    <div
      className="flex items-center gap-2 w-fit cursor-pointer"
      onClick={redirectToUserProfilePage}
    >
      {Profile}
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
