import Header from "../common/Header";

interface HeaderContentLayoutI {
  children?: React.ReactNode;
  headerProps?: {
    hasSearchBar?: boolean;
  };
}

const HeaderContentLayout = ({
  children,
  headerProps,
}: HeaderContentLayoutI) => {
  return (
    <div className="w-full min-h-screen">
      <Header {...headerProps} />
      <div className="mt-[66px] w-full min-h-screen">{children}</div>
    </div>
  );
};

export default HeaderContentLayout;
