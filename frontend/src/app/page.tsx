"use client";

import Post from "@/components/common/Post";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { RootState } from "@/store/store";
import { PostI } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const optimizeSearchValue = (value: string) => {
  return value.toLowerCase().trim();
};

export default function Home() {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const searchParams = useSearchParams();
  const searchValue = optimizeSearchValue(searchParams.get("search") || "");

  const filteredPosts = posts.filter(
    (post: PostI) =>
      optimizeSearchValue(post.heading).includes(searchValue) ||
      post.tag.some((obj) =>
        optimizeSearchValue(obj.name).includes(searchValue)
      ) ||
      optimizeSearchValue(post.user.username).includes(searchValue)
  );

  return (
    <HeaderContentLayout>
      <div className="flex flex-col gap-5 p-5">
        {filteredPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </HeaderContentLayout>
  );
}
