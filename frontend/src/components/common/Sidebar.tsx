"use client";

import Image from "next/image";
import reading_list_img from "@/assets/icons/reading_list.png";
import create_post_img from "@/assets/icons/create_post.png";
import profile_img from "@/assets/icons/profile.png";
import home_img from "@/assets/icons/home.png";
import tag_img from "@/assets/icons/tag.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <aside className="ml-10 p-3 h-full w-60">
      <ul className="flex flex-col gap-2">
        <li className="py-2 px-3 rounded-[4px] flex items-center gap-1 bg-transparent text-darkFont hover:bg-blue-700/15 w-full hover:text-blue-800 hover:underline">
          <Link href={"/"} className="flex items-center gap-2 w-full">
            <Image src={home_img} alt="" width={24} height={24} />{" "}
            <span>Home</span>
          </Link>
        </li>
        <li className="py-2 px-3 rounded-[4px] flex items-center gap-1 bg-transparent text-darkFont hover:bg-blue-700/15 w-full hover:text-blue-800 hover:underline">
          <Link href={"/tags"} className="flex items-center gap-2 w-full">
            <Image src={tag_img} alt="" width={24} height={24} />{" "}
            <span>Tags</span>
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li className="py-2 px-3 rounded-[4px] flex items-center gap-1 bg-transparent text-darkFont hover:bg-blue-700/15 w-full hover:text-blue-800 hover:underline">
              <Link
                href={"/reading_list"}
                className="flex items-center gap-2 w-full"
              >
                <Image src={reading_list_img} alt="" width={24} height={24} />{" "}
                <span>Reading List</span>
              </Link>
            </li>
            <li className="py-2 px-3 rounded-[4px] flex items-center gap-1 bg-transparent text-darkFont hover:bg-blue-700/15 w-full hover:text-blue-800 hover:underline">
              <Link
                href={"/new-post"}
                className="flex items-center gap-2 w-full"
              >
                <Image src={create_post_img} alt="" width={24} height={24} />{" "}
                <span>Create Post</span>
              </Link>
            </li>

            <li className="py-2 px-3 rounded-[4px] flex items-center gap-1 bg-transparent text-darkFont hover:bg-blue-700/15 w-full hover:text-blue-800 hover:underline">
              <Link
                href={`/user/${user?.id}`}
                className="flex items-center gap-2 w-full"
              >
                <Image src={profile_img} alt="" width={24} height={24} />{" "}
                <span>Profile</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
