"use client";

import { RootState } from "@/store/store";
import { PostI, TagI } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { useParams, useRouter } from "next/navigation";
import PostUserProfile from "@/components/common/PostUserProfile";
import LikeBtn from "@/components/common/LikeBtn";
import Tag from "@/components/common/Tag";
import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import Comment from "@/components/common/Comment";
import { useState } from "react";
import { createComment, deletePost } from "@/store/features/posts/posts.action";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "@/components/common/Modal";

function Post() {
  const params = useParams<{ id: string }>();
  const [commentValue, setCommentValue] = useState<string>("");
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [confirmDeleteInputValue, setConfirmDeleteInputValue] =
    useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const post = useSelector((state: RootState) => state.posts.posts).find(
    (post: PostI) => post.id == params.id
  );
  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const isAuthor = post?.user.id === user_id;

  const handleCreateComment = () => {
    if (post) {
      dispatch(
        createComment({
          post_id: post.id,
          text: commentValue,
        })
      );
    }
    setCommentValue("");
  };

  const handleDeletePost = () => {
    if (post) {
      dispatch(deletePost({ id: post?.id }));
    }
    router.push("/");
  };

  return (
    <HeaderContentLayout>
      <div className="p-8 flex justify-center min-h-screen">
        <article className="rounded-md border border-slate-200 bg-white py-8 max-w-3/4">
          <div className="flex flex-col w-full gap-4 px-16">
            <div className="w-full flex items-center justify-between">
              {post && (
                <PostUserProfile
                  created_at={post.created_at}
                  username={post.user.username}
                />
              )}
              {isAuthor && (
                <>
                  <button
                    onClick={() => setIsOpened(true)}
                    className="text-red-700 p-[0.35rem] bg-transparent rounded-[4px] hover:bg-red-200"
                  >
                    <AiOutlineDelete size={23} />
                  </button>
                  <Modal isOpened={isOpened} setIsOpened={setIsOpened}>
                    <small className="font-medium">
                      Type "{post?.heading.toLowerCase().replace(" ", "-")}" to
                      confirm
                    </small>
                    <input
                      type="text"
                      name="confirm"
                      value={confirmDeleteInputValue}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      onChange={(e) =>
                        setConfirmDeleteInputValue(e.target.value)
                      }
                    />
                    <button
                      onClick={handleDeletePost}
                      disabled={
                        confirmDeleteInputValue ===
                        post?.heading.toLowerCase().replace(" ", "-")
                          ? false
                          : true
                      }
                      className="bg-red-700 mt-4 flex items-center justify-center gap-1 text-white font-medium p-[0.35rem] rounded-[4px] disabled:bg-red-300 cursor-pointer"
                    >
                      <AiOutlineDelete size={23} /> Delete
                    </button>
                  </Modal>
                </>
              )}
            </div>
            <div className="flex flex-col w-full gap-1">
              {post && <LikeBtn post={post} />}
              <h1 className="text-5xl font-bold text-slate-900">
                {post?.heading}
              </h1>
              {post && (
                <div className="flex items-center justify-start gap-4">
                  {post.tag.map((tag: TagI) => (
                    <Tag name={tag.name} id={tag.id} key={tag.id} />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* CONTENT */}
          <div className="py-6 px-16">{parse(post?.content || "")}</div>
          <hr />
          {/* COMMENTS */}
          <div className="w-full flex flex-col gap-4 py-6 px-16 pb-0">
            <h2 className="font-bold text-2xl text-slate-900">
              Comments ({post?.comments.length})
            </h2>

            {isAuthenticated && (
              <div className="w-full flex gap-3 items-start mb-2">
                <div className="rounded-full w-9 h-9 bg-slate-500"></div>

                <div className="w-full flex flex-col gap-3">
                  <div className="rounded-md border border-slate-200 grow p-5">
                    <textarea
                      className="text-slate-950 text-base resize-none w-full outline-none border-none h-full"
                      placeholder="Add to the discussion"
                      value={commentValue}
                      onChange={(e) => setCommentValue(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    onClick={handleCreateComment}
                    className="btn-filled"
                    style={{ width: "fit-content" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {post?.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </article>
      </div>
    </HeaderContentLayout>
  );
}

export default Post;
