import profit from "../assets/profit.png";
import loss from "../assets/loss.png";
import { ITotalSummary } from "../interface/Interfaces";

const TotalSummary: React.FC<ITotalSummary> = ({
  totalIncome,
  totalExpense,
  balance,
}) => {
  return (
    <div className="bg-LconetentBg dark:bg-conetentBg p-[16px] gap-[16px] flex flex-col items-center justify-center rounded-lg all__side__shadow dark:shadow-dark_all__side__shadow">
      <h2 className="text-xl font-bold text-center">Summary</h2>
      <div className="flex  gap-[16px] flex-col md:flex-row self-start md:self-center">
        <p className="text-black dark:text-[#fff]">Total Income: ${totalIncome}</p>
        <p className="text-[#808166]">Total Expenses: ${totalExpense}</p>
        <p
          className={`flex items-center  gap-2 text-${balance > 0 ? "success" : "danger"}`}
        >
          <img
            src={balance > 0 ? profit : loss}
            className="h-[18px] w-[18px]"
            alt="grow"
          />
          Final Balance: ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TotalSummary;
