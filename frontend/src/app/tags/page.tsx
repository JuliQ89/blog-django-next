"use client";

import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import useParams from "@/hooks/useParams";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const TagsPage = () => {
  const { newQueryString } = useParams();
  const tags = useSelector((state: RootState) => state.tags.tags);
  const posts = useSelector((state: RootState) => state.posts.posts);

  return (
    <HeaderContentLayout>
      <div className="w-full flex justify-center p-8">
        <div className="w-5/6 flex flex-col gap-4">
          <h1 className="text-[33px] font-bold text-slate-900">
            Tags ({tags.length})
          </h1>

          <div className="grid grid-cols-4 gap-4">
            {tags.map((tag) => (
              <div
                className="w-full rounded-md border border-slate-200 bg-white p-6 h-fit flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50"
                onClick={() => newQueryString("/", "search", tag.name)}
                key={tag.id}
              >
                <span className="text-slate-900 font-semibold text-base">
                  #{tag.name}
                </span>
                <small className="text-slate-600 text-sm">
                  {
                    posts.filter((post) =>
                      post.tag.some((obj) => obj.id === tag.id)
                    ).length
                  }{" "}
                  posts
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HeaderContentLayout>
  );
};

export default TagsPage;
