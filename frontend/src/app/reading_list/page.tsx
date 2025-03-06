"use client";

import Post from "@/components/common/Post";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { RootState } from "@/store/store";
import { RiBookmarkLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const ReadingListPage = () => {
  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const readingList = useSelector((state: RootState) =>
    state.posts.posts.filter((post) =>
      post.reading_list.some((obj) => obj.id == user_id)
    )
  );

  return (
    <HeaderContentLayout>
      <div className="w-full flex justify-center p-8">
        <div className="w-3/4 flex flex-col gap-4">
          <h1 className="text-[33px] font-bold text-slate-900">
            Reading list ({readingList.length})
          </h1>

          <div className="w-full rounded-md border border-slate-200 bg-white p-6 min-h-96">
            {readingList && readingList?.length > 0 ? (
              <div className="w-full flex flex-col gap-3">
                {readingList.map((post) => (
                  <Post post={post} key={post.id} displayImage={false} />
                ))}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center flex-col gap-2">
                <h2 className="text-2xl font-bold text-slate-800">
                  Your reading list is empty
                </h2>
                <p className="text-slate-600 text-center text-lg flex items-center gap-[0.3rem]">
                  Click the{" "}
                  <span className="font-bold flex items-center gap-[0.3rem] w-fit">
                    bookmark reaction <RiBookmarkLine />
                  </span>{" "}
                  when viewing a post add it to your reading list.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderContentLayout>
  );
};

export default ReadingListPage;
