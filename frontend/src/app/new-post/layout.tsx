import RequireLoggedInLayout from "@/components/layout/RequireLoggedInLayout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RequireLoggedInLayout>{children}</RequireLoggedInLayout>
    </>
  );
};

export default Layout;
