"use client";

import Post from "@/components/common/Post";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) => state.posts.filteredPosts);

  return (
    <HeaderContentLayout>
      {isAuthenticated && <h2>{user?.username}</h2>}
      <div className="flex flex-col gap-5 p-5">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </HeaderContentLayout>
  );
}
