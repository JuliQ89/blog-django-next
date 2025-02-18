"use client";

import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

interface RequireLoggedInLayoutI {
  children?: React.ReactNode;
}

const RequireLoggedInLayout = ({ children }: RequireLoggedInLayoutI) => {
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

export default RequireLoggedInLayout;
