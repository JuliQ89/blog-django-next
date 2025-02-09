import useParams from "@/hooks/useParams";
import React from "react";
import { useDispatch } from "react-redux";

interface TagI {
  name: string;
  id: number | string;
}

const Tag = ({ name, id }: TagI) => {
  const { newQueryString } = useParams();
  const dispatch = useDispatch();

  return (
    <small
      className="text-slate-600 p-[0.3rem] bg-transparent rounded-md hover:bg-gray-200 border border-transparent hover:border-gray-400 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        newQueryString("search", name);
      }}
    >
      #{name}
    </small>
  );
};

export default Tag;
