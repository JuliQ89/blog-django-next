"use client";

import { RootState } from "@/store/store";
import axiosInstance from "@/utils/axios";
import { CommentI } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CommentsSidebar = () => {
  const [comments, setComments] = useState<CommentI[]>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        try {
          const response: { data: CommentI[] } = await axiosInstance.get(
            "/api/comments/"
          );
          setComments(
            response.data.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <aside className="mr-10 py-3 h-full w-96 rounded-md border border-slate-200 bg-white flex flex-col gap-3 min-h-[200px]">
          <div className="">
            <header className="p-4 flex items-center justify-start border-b border-slate-200">
              <h2 className="text-slate-900 font-bold text-[1.4rem]">
                Your last Comments ({comments?.length})
              </h2>
            </header>

            <div className="grow">
              {comments && comments.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="p-4 border-b border-slate-200 last-of-type:border-b-0 list-none"
                    >
                      <Link
                        href={`/post/${comment.post.id}#${comment.id}`}
                        className="group w-full flex flex-col gap-1"
                      >
                        <p className="group-hover:text-blue-800 text-slate-800 text-base">
                          {comment.text}
                        </p>
                        <small className="text-slate-600 text-sm">
                          {new Date(comment.created_at).toLocaleDateString(
                            "de-de",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </small>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="w-full h-full flex items-center py-7 px-4">
                  <p className="text-slate-600">
                    You haven't commented on any posts yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default CommentsSidebar;
