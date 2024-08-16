import CreateForm from "../components/add-form/CreateForm";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import DataProvider from "../containers/DataProvider";

const Home = () => {
  return (
    <div className="max-w-screen-xxlg mx-auto px-[16px] flex flex-col gap-[16px] my-[32px]">
      <DataProvider storageKey="total-summary">
        <CreateForm />
        <IncomeExpenseChart />
      </DataProvider>
    </div>
  );
};

export default Home;
