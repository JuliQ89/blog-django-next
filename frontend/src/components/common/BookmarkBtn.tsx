"use client";

import { updatePostAddedToReadingList } from "@/store/features/posts/posts.action";
import { RootState } from "@/store/store";
import { PostI } from "@/utils/types";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface BookmarkBtnI {
  post: PostI;
}

const BookmarkBtn = ({ post }: BookmarkBtnI) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const isSavedToReadingList = post.reading_list.some(
    (obj) => obj.id == user_id
  );

  const toggleAddToReadingList = () => {
    dispatch(updatePostAddedToReadingList({ id: post.id }));
  };

  return (
    <div
      className="w-fit p-[0.3rem] bg-transparent rounded-md hover:bg-gray-200 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <label
        htmlFor={`isAddedToReadingList-${post.id}`}
        className="flex items-center gap-2 text-slate-800 cursor-pointer"
      >
        {isSavedToReadingList ? (
          <RiBookmarkFill size={25} />
        ) : (
          <RiBookmarkLine size={25} />
        )}
      </label>
      <input
        type="checkbox"
        name="isAddedToReadingList"
        id={`isAddedToReadingList-${post.id}`}
        className="absolute hidden"
        checked={isSavedToReadingList}
        onChange={isAuthenticated ? toggleAddToReadingList : () => {}}
      />
    </div>
  );
};

export default BookmarkBtn;
