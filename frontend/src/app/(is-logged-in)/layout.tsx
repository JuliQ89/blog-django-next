"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/store/store";

interface LoggedInLayoutI {
  children: React.ReactNode;
}

const LoggedInLayout = ({ children }: LoggedInLayoutI) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return (
      <>
        <p>Du bist nicht eingeloggt!</p>
        <Link href="/login">Login</Link>
      </>
    );
  } else {
    return <>{children}</>;
  }
};

export default LoggedInLayout;
