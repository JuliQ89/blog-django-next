"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/features/auth/auth.action";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useParams from "@/hooks/useParams";
import { IoMdClose } from "react-icons/io";

const HeaderSearchBar = () => {
  const { newQueryString } = useParams();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchValue, setSearchValue] = useState<string>(search || "");

  return (
    <div className="w-full max-w-[25rem] min-w-[200px] grow">
      <form
        className="relative flex items-center"
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          newQueryString("search", searchValue);
        }}
      >
        <div className="relative w-full">
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search Blogs..."
            spellCheck={false}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue.length > 0 && (
            <button
              onClick={() => setSearchValue("")}
              type="button"
              className="-translate-y-1/2 absolute top-1/2 right-3 flex items-center justify-center bg-transparent border-none outline-none cursor-pointer text-slate-800"
            >
              <IoMdClose />
            </button>
          )}
        </div>

        <button
          className="rounded-md ml-2 bg-slate-800 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          onClick={() => newQueryString("search", searchValue)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

interface HeaderI {
  hasSearchBar?: boolean;
}

const Header = ({ hasSearchBar = true }: HeaderI) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <header className="w-full fixed top-0 left-0 right-0 bg-white py-3 flex items-center shadow-[0_1px_1px_rgba(0,0,0,0.066)] z-[100]">
      <nav className="flex h-full items-center justify-between mx-32 w-full">
        <div className="h-full flex items-center gap-12 grow">
          <Link href="/">
            <h1 className="font-black text-3xl font-playfairDisplay select-none">
              Blog
            </h1>
          </Link>
          {hasSearchBar && <HeaderSearchBar />}
        </div>
        <div className="h-full flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                className="btn-outlined"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
              <Link href="/new-post" className="btn-filled">
                Create Post
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outlined">
                Log in
              </Link>
              <Link href="/create_account" className="btn-filled">
                Create Account
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
