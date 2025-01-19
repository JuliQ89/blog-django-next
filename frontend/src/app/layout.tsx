"use client";

import LoginLayout from "@/components/layout/LoginLayout";
// import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";

// export const metadata: Metadata = {
//   title: "Blog",
//   description: "Blog application",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="min-h-screen">
      <body className="min-h-screen">
        <ReduxProvider>
          <LoginLayout>{children}</LoginLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
