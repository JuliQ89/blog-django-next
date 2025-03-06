"use client";

import PostList from "@/components/common/PostList";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";

export default function Home() {
  return (
    <HeaderContentLayout>
      <div className="flex flex-col items-center p-5 w-full">
        <div className="flex flex-col gap-5 w-3/5 h-full">
          <PostList />
        </div>
      </div>
    </HeaderContentLayout>
  );
}
