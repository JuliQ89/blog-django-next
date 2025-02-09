import { searchPosts } from "@/store/features/posts/posts.slice";
import React from "react";
import { useDispatch } from "react-redux";

interface TagI {
  name: string;
  id: number | string;
}

const Tag = ({ name, id }: TagI) => {
  const dispatch = useDispatch();

  return (
    <small
      className="text-slate-600 p-[0.3rem] bg-transparent rounded-md hover:bg-gray-200 border border-transparent hover:border-gray-400 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(searchPosts(name));
      }}
    >
      #{name}
    </small>
  );
};

export default Tag;
