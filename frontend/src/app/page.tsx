"use client";

import PostList from "@/components/common/PostList";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";

export default function Home() {
  return (
    <HeaderContentLayout>
      <div className="flex flex-col gap-5 p-5">
        <PostList />
      </div>
    </HeaderContentLayout>
  );
}
