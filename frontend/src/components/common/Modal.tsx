import React from "react";
import { IoMdClose } from "react-icons/io";

interface ModalI {
  children?: React.ReactNode;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, isOpened, setIsOpened }: ModalI) => {
  return (
    <>
      {isOpened && (
        <div className="fixed z-[999] top-0 left-0 right-0 bottom-0 bg-[rgba(30,41,59,0.8)] backdrop-blur-[2px] flex items-center justify-center">
          <div className="rounded-md border border-slate-200 bg-white p-6">
            <button
              className="flex items-center justify-center rounded-sm bg-transparent border-none p-[0.35rem] outline-none cursor-pointer mb-2 text-slate-800 hover:bg-gray-200 float-right"
              onClick={() => setIsOpened(false)}
            >
              <IoMdClose />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
