import ExpensesByCategory from "../../components/expensesByCategory/ExpensesByCategory";
import IncomeExpenseCards from "../../components/incomeExpenseCards/IncomeExpenseCards";
import QuickActions from "../../components/quickActions/QuickActions";
import RecentTransactions from "../../components/recentTransactions/RecentTransactions";

const Home = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <IncomeExpenseCards />
        <ExpensesByCategory />
        <QuickActions />
        <RecentTransactions />
      </div>
    </div>
  );
};
export default Home;

/* onClick={() => dispatch(addTransaction({id: Date.now(), description: "test", amount: 10, date: new Date(), category: "еда"}))} */
