import { updatePostLiked } from "@/store/features/posts/posts.action";
import { RootState } from "@/store/store";
import { PostI } from "@/utils/types";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

interface LikeBtnI {
  post: PostI;
}

const LikeBtn = ({ post }: LikeBtnI) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user_id = useSelector((state: RootState) => state.auth.user?.id);
  const isLiked = post.liked.some((obj) => obj.id == user_id);

  const toggleLike = () => {
    dispatch(updatePostLiked({ id: post.id }));
  };

  return (
    <div
      className="w-fit p-[0.3rem] bg-transparent rounded-md hover:bg-gray-200 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <label
        htmlFor={`isliked-${post.id}`}
        className="flex items-center gap-2 text-slate-800 cursor-pointer"
      >
        {isLiked ? <AiFillLike size={25} /> : <AiOutlineLike size={25} />}{" "}
        <span className="text-sm">{post.likedCount} Likes</span>
      </label>
      <input
        type="checkbox"
        name="isliked"
        id={`isliked-${post.id}`}
        className="absolute hidden"
        checked={isLiked}
        onChange={isAuthenticated ? toggleLike : () => {}}
      />
    </div>
  );
};

export default LikeBtn;
