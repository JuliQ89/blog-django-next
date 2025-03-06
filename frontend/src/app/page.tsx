"use client";

import PostList from "@/components/common/PostList";
import Sidebar from "@/components/common/Sidebar";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";

export default function Home() {
  return (
    <HeaderContentLayout>
      <div className="flex gap-6 p-5 w-full">
        <Sidebar />
        <div className="flex flex-col gap-5 w-1/2 h-full">
          <PostList />
        </div>
      </div>
    </HeaderContentLayout>
  );
}
