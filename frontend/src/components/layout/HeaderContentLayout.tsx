import Header from "../common/Header";

interface HeaderContentLayoutI {
  children?: React.ReactNode;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderContentLayout = ({
  searchValue,
  setSearchValue,
  children,
}: HeaderContentLayoutI) => {
  return (
    <div className="w-full min-h-screen">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="mt-[66px] w-full min-h-screen">{children}</div>
    </div>
  );
};

export default HeaderContentLayout;
