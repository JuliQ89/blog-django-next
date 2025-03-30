"use client";

import PostList from "@/components/common/PostList";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import useUserProfile from "@/hooks/useUserProfile";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RiCake2Fill, RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const params = useParams<{ id: string }>();
  const authenticatedUser = useSelector((state: RootState) => state.auth.user);
  const user = useSelector((state: RootState) => state.users.users).find(
    (user) => user.id === Number(params.id)
  );
  const posts = useSelector((state: RootState) => state.posts.posts).filter(
    (post) => post.user.id === Number(params.id)
  );
  const isEditable: boolean = authenticatedUser?.id === user?.id;

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
            <div className="w-full flex flex-col items-center gap-3 px-7 relative">
              {isEditable && (
                <Link
                  href={`/user/${user.id}/edit`}
                  className="absolute top-0 right-7 border-none outline-none bg-transparent cursor-pointer text-slate-900 flex items-center justify-center gap-2 btn-filled"
                >
                  Edit Profile
                  <RiEdit2Fill />
                </Link>
              )}
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
                postArgs={{ displayImage: false }}
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
