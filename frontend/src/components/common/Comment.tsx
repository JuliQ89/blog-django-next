"use client";

import useUserProfile from "@/hooks/useUserProfile";
import { CommentI } from "@/utils/types";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  deleteComment,
  updateComment,
} from "@/store/features/posts/posts.action";

const Comment = ({ comment }: { comment: CommentI }) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>(comment.text);
  const { Profile } = useUserProfile({
    profile: comment.user.profile.image,
    user_id: comment.user.id,
    redirect: true,
  });
  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const wroteComment = comment.user.id === user_id;

  useEffect(() => {
    if (isEditable) {
      inputRef.current?.focus();
    }
  }, [isEditable]);

  const handleDeleteComment = () => {
    dispatch(
      deleteComment({ comment_id: comment.id, post_id: comment.post.id })
    );
    setIsOpened(false);
  };

  const handleUpdateComment = () => {
    if (isEditable) {
      dispatch(updateComment({ id: comment.id, text: commentText }));
    }
    setIsEditable(false);
  };

  return (
    <div className="w-full flex gap-3 items-start" id={`${comment.id}`}>
      {Profile}

      <div className="rounded-md border border-slate-200 grow flex flex-col gap-2 p-5">
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-2 w-full">
            <h4 className="font-medium text-[17px] text-slate-700">
              {comment.user.username}
            </h4>
            <span className="text-slate-400">•</span>
            <span className="text-base text-slate-400">
              {new Date(comment.created_at).toLocaleDateString("de-de", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
          {wroteComment && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditable(!isEditable)}
                className="text-gray-700 p-[0.35rem] bg-transparent rounded-[4px] hover:bg-gray-200"
              >
                <AiOutlineEdit size={23} />
              </button>
              <button
                onClick={() => setIsOpened(true)}
                className="text-red-700 p-[0.35rem] bg-transparent rounded-[4px] hover:bg-red-200"
              >
                <AiOutlineDelete size={23} />
              </button>
              <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
                <p className="font-medium">
                  Are you sure you want to delete this comment?
                </p>
                <button
                  onClick={wroteComment ? handleDeleteComment : () => {}}
                  className="bg-red-700 mt-4 flex items-center justify-center gap-1 text-white font-medium p-[0.35rem] rounded-[4px] disabled:bg-red-300 cursor-pointer"
                >
                  <AiOutlineDelete size={23} /> Delete
                </button>
              </Modal>
            </div>
          )}
        </div>
        <div className="text-slate-950 text-base flex items-center justify-between gap-4">
          {isEditable ? (
            <>
              <input
                type="text"
                name="comment_text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                ref={inputRef}
              />
              <button
                onClick={handleUpdateComment}
                className="btn-outlined"
                style={{ width: "fit-content", padding: "0.45rem 0.75rem" }}
              >
                Save
              </button>
            </>
          ) : (
            <span className="w-full">{commentText}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
