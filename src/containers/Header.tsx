import { useEffect, useState } from "react";
import { AiFillSun } from "react-icons/ai";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import dark_mode from "../assets/dark_mode.png";
import logo from "../assets/logo.png";
import { saveToLocalStorage } from "../utils/storage";
import { useDataContext } from "./DataProvider";

const Header = () => {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const { isDarkMode, setIsDarkMode } = useDataContext();

  const handToggleNav = () => {
    setIsOpenNav((val) => !val);
  };
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    saveToLocalStorage("isDarkMode", newMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-LconetentBg dark:bg-conetentBg opacity-95 h-[50px] sticky top-0 z-10 backdrop-blur-[2px] border-solid border-b-[1px] dark:border-[#9a979789] shadow-sm dark:shadow-none">
      <nav className="max-w-screen-xxlg mx-auto px-[16px] items-center justify-between flex  border-solid ">
        <Link to={"/"} className="text-white flex items-center gap-2">
          <img src={logo} alt="Expense Tacker" className="h-[50px] -ms-[14px] w-[50px]" />
          <h2 className="text-Ltext dark:text-logoColor font-bold text-[18px]  md:text-[22px]">
            Expense Tracker
          </h2>
        </Link>
        <nav>
          {/*mobile/desktop */}
          <div className=" items-center text-Ltext2 dark:text-[#c3c3c3]  gap-5 hidden md:flex">
            <Link to={"/transactions"} className="hover:text-Ltext dark:hover:text-white">
              Transactions
            </Link>
            <p className="hover:text-Ltext dark:hover:text-white">About Us</p>
            <button onClick={toggleDarkMode} className="text-[32px]">
              {isDarkMode ? (
                <AiFillSun className="transition-transform ease-in duration-300 row-span-2 rotate-[0deg] hover:rotate-[90deg]" />
              ) : (
                <img
                  src={dark_mode}
                  alt="mode dark/light"
                  className="h-[25px] w-[25px] transition-transform ease-in duration-300 -rotate-[10deg] hover:rotate-[0deg]"
                />
              )}
            </button>
          </div>
          <div className="gap-2 flex md:hidden">
            <button onClick={toggleDarkMode} className="text-[25px]">
              {isDarkMode ? (
                <AiFillSun className="transition-transform ease-in duration-300 row-span-2 rotate-[0deg] hover:rotate-[90deg]" />
              ) : (
                <img
                  src={dark_mode}
                  alt="mode dark/light"
                  className="h-[20px] w-[20px] transition-transform ease-in duration-300 -rotate-[10deg] hover:rotate-[0deg]"
                />
              )}
            </button>
            <div className="md:hidden">
              <RxCross2
                size={25}
                className={`text-[#9a9797] cursor-pointer transition-max-height duration-300  overflow-hidden  hover:text-Ltext dark:hover:text-white ${isOpenNav === false ? "max-h-0 opacity-0" : "opacity-100 "}}`}
                onClick={handToggleNav}
              />
              <RxHamburgerMenu
                size={25}
                className={`text-[#9a9797] cursor-pointer transition-opacity duration-300  overflow-hidden  hover:text-Ltext dark:hover:text-white ${isOpenNav === false ? "opacity-100 " : "max-h-0 opacity-0"}`}
                onClick={handToggleNav}
              />
              <div
                className={`absolute left-0 right-0 bg-LconetentBg dark:bg-conetentBg rounded-b-lg max-w-[720px] w-[95%] mx-auto top-[49px] pb-[1rem] transition-opacity duration-700 ${isOpenNav ? "opacity-100 visible" : "opacity-0 invisible"} border-[1px] border-t-0 border-[#9a979789]`}
              >
                <div className="flex items-center text-Ltext2 dark:text-[#9a9797] flex-col gap-2">
                  <Link
                    to={"/transactions"}
                    className="hover:text-Ltext dark:hover:text-white"
                    onClick={handToggleNav}
                  >
                    Transactions
                  </Link>
                  <p
                    className="hover:text-Ltext dark:hover:text-white"
                    onClick={handToggleNav}
                  >
                    About Us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default Header;
