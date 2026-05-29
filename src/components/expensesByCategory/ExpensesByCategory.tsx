import { useSelector } from "react-redux";
import { formatAmount } from "../../utils/formatAmount";
import type { RootState } from "../../store/store";


const ExpensesByCategory = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );

  const current = new Date().toISOString().slice(0, 7);
  


  const filterTransaction = () => {
    return transactions
      .filter((transaction) => transaction.date.startsWith(current))
      .filter((transaction) => transaction.amount < 0);
  };

  const transactionCategory: Record<string, number> = {};

  filterTransaction().forEach((transaction) => {
    if (transactionCategory[transaction.category]) {
      transactionCategory[transaction.category] += transaction.amount;
    } else {
      transactionCategory[transaction.category] = transaction.amount;
    }
  });

  const totalExpense = Object.values(transactionCategory).reduce((acc, value) => acc + value, 0)

  const expenseByCategory = Object.entries(transactionCategory).map(([name, amount]) => ({
    name,
    amount,
    percent: Math.round((amount / totalExpense) * 100)
  })).sort((a, b) => b.percent - a.percent)

  return (
    <div className="rounded-lg shadow-lg p-4 bg-white mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          РАСХОДЫ ПО КАТЕГОРИЯМ
        </h2>
        <button className="text-sm text-blue-600 hover:underline">
          Все категории
        </button>
      </div>
      <ul>
        {expenseByCategory.length !== 0 ? expenseByCategory.map((category) => (
          <li
            key={category.name}
            className="flex justify-between items-center py-2 border-b last:border-0"
          >
            <p className="w-1/4 text-[12px] md:text-[16px] text-gray-800 font-medium">{category.name}</p>
            <p className="w-1/6 text-gray-600 text-right">
              {category.percent}%
            </p>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${category.percent}%` }}
              ></div>
            </div>
            <p className="w-1/4 text-right text-red-500 font-medium">
              {formatAmount(category.amount)}
            </p>
          </li>
        )) : <li>Расходы отсутствуют...</li>}
      </ul>
    </div>
  );
};
export default ExpensesByCategory;
