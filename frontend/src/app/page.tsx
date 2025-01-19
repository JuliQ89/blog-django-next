"use client";

import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <HeaderContentLayout>
      <h1>Home</h1>
      {isAuthenticated && <h2>{user?.username}</h2>}
    </HeaderContentLayout>
  );
}
