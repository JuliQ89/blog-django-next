"use client";

import CommentsSidebar from "@/components/common/CommentsSidebar";
import PostList from "@/components/common/PostList";
import Sidebar from "@/components/common/Sidebar";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";

export default function Home() {
  return (
    <HeaderContentLayout>
      <div className="flex gap-6 py-6 px-12 w-full">
        <Sidebar />
        <div className="flex flex-col gap-5 h-full grow max-w-[1000px]">
          <PostList />
        </div>

        <CommentsSidebar />
      </div>
    </HeaderContentLayout>
  );
}
