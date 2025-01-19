"use client";

import Post from "@/components/common/Post";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { RootState } from "@/store/store";
import { PostI } from "@/utils/types";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) => state.posts.posts);

  return (
    <HeaderContentLayout>
      <h1>Home</h1>
      {isAuthenticated && <h2>{user?.username}</h2>}
      {posts.map((post: PostI) => (
        <Post key={post.id} post={post} />
      ))}
    </HeaderContentLayout>
  );
}
