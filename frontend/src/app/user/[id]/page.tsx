"use client";

import PostList from "@/components/common/PostList";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import useUserProfile from "@/hooks/useUserProfile";
import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { RiCake2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const params = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.users.users).find(
    (user) => user.id === Number(params.id)
  );
  const posts = useSelector((state: RootState) => state.posts.posts).filter(
    (post) => post.user.id === Number(params.id)
  );

  const { Profile } = useUserProfile({
    profile: user?.profile.image ? user.profile.image : null,
    user_id: user?.id ?? 0,
    redirect: false,
    size: "110px",
  });

  return (
    <HeaderContentLayout>
      {user ? (
        <div className="w-full h-full flex justify-center p-4 pt-14">
          <div className="rounded-md border border-slate-200 bg-white w-3/5 py-7 relative">
            <div className="w-full flex flex-col items-center gap-3 px-7">
              {Profile}
              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                {user.username}
              </h1>
              <p className="text-center text-slate-800">{user.profile.bio}</p>

              <div className="flex items-center gap-6 mt-1">
                <small className="text-slate-600 flex items-center gap-1 text-sm">
                  <RiCake2Fill size={21} />
                  {new Date(user.joined_at).toLocaleDateString("de-de", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </small>
              </div>
            </div>

            <hr className="my-8" />

            <div className="px-7 flex flex-col gap-5">
              <PostList
                posts={posts}
                noPosts={`The user '${user.username}' has no posts`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center p-8">
          <h1 className="text-slate-800 font-medium text-2xl">
            No user with the Id '{params.id}' was found.
          </h1>
        </div>
      )}
    </HeaderContentLayout>
  );
};

export default UserProfilePage;
