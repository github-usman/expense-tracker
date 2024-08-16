import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import CreateForm from "../components/formComponents/CreateForm";

const Home = () => {
  return (
    <div className="max-w-screen-xxlg mx-auto px-[16px] flex flex-col gap-[16px] my-[32px]">
      <CreateForm />
      <IncomeExpenseChart />
    </div>
  );
};

export default Home;
