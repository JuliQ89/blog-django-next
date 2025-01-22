"use client";

import LoginLayout from "@/components/layout/LoginLayout";
// import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "@/store/features/posts/posts.action";

// export const metadata: Metadata = {
//   title: "Blog",
//   description: "Blog application",
// };

const DispatchReduxActions = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="min-h-screen">
      <head>
        <meta name="apple-mobile-web-app-title" content="Blog" />
        <title>Blog</title>
      </head>
      <body className="min-h-screen">
        <ReduxProvider>
          <LoginLayout>
            <DispatchReduxActions>{children}</DispatchReduxActions>
          </LoginLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
