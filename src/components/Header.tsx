import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import logo from "../assets/logo.png";

const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  const handToggleNav = () => {
    setIsOpenNav((val) => !val);
  };
  return (
    <div className="bg-conetentBg opacity-95 h-[50px] sticky top-0 z-50 backdrop-blur-[2px] border-solid border-b-[1px] border-[#9a979789]">
      <nav className="max-w-screen-xxlg h-full items-center justify-between flex m-auto border-solid px-4 md:px-6  ">
        <div className="text-white flex items-center gap-2">
          <img src={logo} alt="Expense Tacker" className="h-[40px] w-[40px]" />
          <h2 className="text-logoColor font-bold text-[18px] md:text-[22px]">
            Expense Tracker
          </h2>
        </div>
        <nav> {/*mobile/desktop */}
          <div className=" items-center text-[#c3c3c3]  gap-3 hidden md:flex">
            <p className="hover:text-white">About Us</p>
          </div>
          <div className="md:hidden">
            <RxCross2
              size={25}
              className={`text-[#9a9797] cursor-pointer transition-max-height duration-300  overflow-hidden  hover:text-white ${isOpenNav === false ? "max-h-0 opacity-0" : "opacity-100 "}}`}
              onClick={handToggleNav}
            />
            <RxHamburgerMenu
              size={25}
              className={`text-[#9a9797] cursor-pointer transition-opacity duration-300  overflow-hidden  hover:text-white ${isOpenNav === false ? "opacity-100 " : "max-h-0 opacity-0"}`}
              onClick={handToggleNav}
            />
            <div
              className={`absolute left-0 right-0 bg-conetentBg rounded-b-lg max-w-[720px] w-[95%] mx-auto top-[49px] pb-[1rem] transition-opacity duration-700 ${isOpenNav ? "opacity-100 visible" : "opacity-0 invisible"} border-[1px] border-t-0 border-[#9a979789]`}
            >
              <div className="flex items-center text-[#9a9797] flex-col gap-2">
                <p className="hover:text-white" onClick={handToggleNav}>
                  About Us
                </p>
              </div>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default Header;
