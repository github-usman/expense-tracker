import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="max-w-screen-xxlg mx-auto pb-[1rem] border-solid px-4 md:px-6  flex-col md:flex-row items-center flex justify-between text-Ltext2 dark:text-[#9a9797]">
      <p className="text-center">
        Copyright © 2024 Expense Tracker Help Center | Terms | Privacy Policy
      </p>
      <div className="flex gap-[0.7rem] items-center">
        <img src={logo} className="h-[25px] w-[25px]" alt="Auto page press" />
        <p className="text-Ltext dark:text-logoColor font-bold text-nowrap">
          {" "}
          Expense Tracker
        </p>
      </div>
    </div>
  );
};

export default Footer;
