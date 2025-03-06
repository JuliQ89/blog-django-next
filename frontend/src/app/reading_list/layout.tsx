import RequireLoggedInLayout from "@/components/layout/RequireLoggedInLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RequireLoggedInLayout>{children}</RequireLoggedInLayout>
    </>
  );
};

export default Layout;
