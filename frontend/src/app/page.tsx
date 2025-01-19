"use client";

import Post from "@/components/common/Post";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { RootState } from "@/store/store";
import { PostI } from "@/utils/types";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <HeaderContentLayout
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    >
      {isAuthenticated && <h2>{user?.username}</h2>}
      <div className="flex flex-col gap-5 p-5">
        {posts
          .filter(
            (post: PostI) =>
              post.heading
                .toLowerCase()
                .trim()
                .includes(searchValue.toLowerCase().trim()) ||
              post.tag.some(
                (obj) =>
                  obj.name
                    .toLowerCase()
                    .trim()
                    .includes(searchValue.toLowerCase().trim()) ||
                  post.user.username
                    .toLowerCase()
                    .trim()
                    .includes(searchValue.toLowerCase().trim())
              )
          )
          .map((post) => (
            <Post key={post.id} post={post} setSearchValue={setSearchValue} />
          ))}
      </div>
    </HeaderContentLayout>
  );
}
