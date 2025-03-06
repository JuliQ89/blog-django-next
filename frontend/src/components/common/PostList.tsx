import { RootState } from "@/store/store";
import { PostI } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Post from "./Post";

const optimizeSearchValue = (value: string) => {
  return value.toLowerCase().trim();
};

interface PostListI {
  posts?: PostI[];
  noPosts?: string;
  noPostBySearch?: string;
  postArgs?: {
    displayImage: boolean;
  };
}

const PostList = ({ posts, noPosts, noPostBySearch, postArgs }: PostListI) => {
  const searchParams = useSearchParams();
  const searchValue = optimizeSearchValue(searchParams.get("search") || "");
  const defaultPosts = useSelector((state: RootState) => state.posts.posts);

  const displayedPosts = posts ?? defaultPosts;

  const filteredPosts = displayedPosts.filter(
    (post: PostI) =>
      optimizeSearchValue(post.heading).includes(searchValue) ||
      post.tag.some((obj) =>
        optimizeSearchValue(obj.name).includes(searchValue)
      ) ||
      optimizeSearchValue(post.user.username).includes(searchValue)
  );

  return (
    <>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post key={post.id} post={post} {...postArgs} />
        ))
      ) : searchValue === "" ? (
        <h1 className="text-slate-800 font-medium text-2xl text-center">
          {noPosts ? noPosts : <>There are no posts</>}
        </h1>
      ) : (
        <h1 className="text-slate-800 font-medium text-2xl text-center">
          {noPostBySearch ? (
            noPostBySearch
          ) : (
            <>The post '{searchValue}' was not found</>
          )}
        </h1>
      )}
    </>
  );
};

export default PostList;
