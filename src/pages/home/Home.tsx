import AddTransactionModal from "../../components/addTransactionModal/AddTransactionModal";
import ExpensesByCategory from "../../components/expensesByCategory/ExpensesByCategory";
import IncomeExpenseCards from "../../components/incomeExpenseCards/IncomeExpenseCards";
import QuickActions from "../../components/quickActions/QuickActions";
import RecentTransactions from "../../components/recentTransactions/RecentTransactions";
import { useState } from "react";

const Home = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const closeModal = () => setIsShowModal(false)

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        {isShowModal && <AddTransactionModal closeModal={closeModal}/>}
        <IncomeExpenseCards />
        <ExpensesByCategory />
        <QuickActions />
        <RecentTransactions />
        <button
          className="border w-10 h-10"
          onClick={() => setIsShowModal(true)}
        ></button>
      </div>
    </div>
  );
};
export default Home;

/* onClick={() => dispatch(addTransaction({id: Date.now(), description: "test", amount: 10, date: new Date(), category: "еда"}))} */
