import Header from "../common/Header";

interface HeaderContentLayoutI {
  children?: React.ReactNode;
}

const HeaderContentLayout = ({ children }: HeaderContentLayoutI) => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="mt-[66px] w-full min-h-screen">{children}</div>
    </div>
  );
};

export default HeaderContentLayout;
