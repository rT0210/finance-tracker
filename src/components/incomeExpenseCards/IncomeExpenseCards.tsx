import { useSelector } from "react-redux";
import { formatAmount } from "./../../utils/formatAmount";
import type { RootState } from "../../store/store";

const IncomeExpenseCards = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const current = new Date().toISOString();
  const currentYearMonth = current.slice(0, 7);
  const partsPreviousMonth = currentYearMonth.split("-");
  const previousYearMonth =
    partsPreviousMonth[0] +
    "-" +
    (+partsPreviousMonth[1] - 1 >= 10
      ? String(+partsPreviousMonth[1] - 1)
      : "0" + String(+partsPreviousMonth[1] - 1));

  // current / previous transactions
  const currentMonthTransactions = transactions.filter(
    (trans) => trans.date.slice(0, 7) === currentYearMonth,
  );
  const previousMonthTransactions = transactions.filter(
    (trans) => trans.date.slice(0, 7) === previousYearMonth,
  );

  // total income / expense
  const totalIncomeCurrentMonth = currentMonthTransactions
    .filter((transactions) => transactions.amount > 0)
    .reduce((acc, transactions) => acc + transactions.amount, 0);
  const totalExpenseCurrentMonth = currentMonthTransactions
    .filter((transactions) => transactions.amount < 0)
    .reduce((acc, transactions) => acc + transactions.amount, 0);

  // total previous income / expense
  const totalIncomePreviousMonth = previousMonthTransactions
    .filter((transactions) => transactions.amount > 0)
    .reduce((acc, transactions) => acc + transactions.amount, 0);
  const totalExpensePreviousMonth = previousMonthTransactions
    .filter((transactions) => transactions.amount < 0)
    .reduce((acc, transactions) => acc + transactions.amount, 0);

  const differenceIncome = (
    ((totalIncomeCurrentMonth - totalIncomePreviousMonth) /
      totalIncomePreviousMonth) *
    100
  ).toFixed(2);
  const differenceExpense = (
    ((totalExpenseCurrentMonth - totalExpensePreviousMonth) /
      totalExpensePreviousMonth) *
    100
  ).toFixed(2);

  const incomeTotals: Record<string, number> = {};
  const expenseTotals: Record<string, number> = {};
  transactions.forEach((item) =>
    item.amount > 0
      ? incomeTotals[item.category] !== undefined
        ? (incomeTotals[item.category] += item.amount)
        : (incomeTotals[item.category] = item.amount)
      : expenseTotals[item.category] !== undefined
        ? (expenseTotals[item.category] += item.amount)
        : (expenseTotals[item.category] = item.amount),
  );


  const bestCategory = (type: "income" | "expense"): [string, number] => {
    const total = [];
    const currentType = type === "income" ? incomeTotals : expenseTotals
    for (const value in currentType) {
      total.push(currentType[value]);
    }
    const highestEarnings = total.reduce((acc, item) => type === "income" ? (acc > item ? acc : item) : acc < item ? acc : item, total[0],);
    let highestCategory: string = "";
    for (const value in currentType) {
      if (currentType[value] === highestEarnings) {
        highestCategory = value;
      }
    }
    return [highestCategory, highestEarnings];
  };

  return (
    <div className="flex flex-col md:flex-row between gap-4 pt-4 mb-4">
      <div className="rounded-4xl p-4 shadow-md flex-1">
        <h2 className="text-xl text-left mb-4 text-gray-500">📈 Доходы</h2>
        <div className="flex flex-col gap-4 mb-4">
          <p className="text-center text-2xl text-green-600 font-bold">
            {formatAmount(totalIncomeCurrentMonth)}
          </p>
          <p className="text-center text-2xl text-gray-400">За этот месяц</p>
        </div>
        <div className="h-20 w-full mx-auto flex justify-center items-center mb-4 shadow-lg rounded-2xl">
          <p
            className={`text-2xl ${+differenceIncome > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {totalIncomePreviousMonth !== 0
              ? +differenceIncome > 0
                ? `+${differenceIncome}`
                : `-${differenceIncome}`
              : "#"}
            % vs прошлый месяц
          </p>
        </div>
        <p className="text-2xl mb-4 text-gray-500">Лучшая категория:</p>
        <p className="text-2xl text-green-600 font-bold">
          <span className="text-gray-800">
            {bestCategory("income")[0] !== ""
              ? bestCategory("income")[0]
              : "пока нет категории"}{" "}
          </span>
          {bestCategory("income")[1] !== undefined
            ? formatAmount(bestCategory("income")[1])
            : " | нет дохода"}
        </p>
      </div>
      <div className="rounded-4xl p-4 shadow-md flex-1">
        <h2 className="text-xl text-left mb-4 text-gray-500">📉 Расходы</h2>
        <div className="flex flex-col gap-4 mb-4">
          <p className="text-center text-2xl text-red-600 font-bold">
            {formatAmount(totalExpenseCurrentMonth)}
          </p>
          <p className="text-center text-2xl text-gray-400">За этот месяц</p>
        </div>
        <div className="h-20 w-full mx-auto flex justify-center items-center mb-4 shadow-lg rounded-2xl">
          <p
            className={`text-2xl ${+differenceExpense > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {totalExpensePreviousMonth !== 0
              ? +differenceExpense > 0
                ? `+${differenceExpense}`
                : differenceExpense
              : "#"}
            % vs прошлый месяц
          </p>
        </div>
        <p className="text-2xl mb-4 text-gray-500">Наибольшая трата:</p>
        <p className="text-2xl text-red-600 font-bold">
          <span className="text-gray-800">
            {bestCategory("expense")[0] !== ""
              ? bestCategory("expense")[0]
              : "пока нет категории"}{" "}
          </span>
          {bestCategory("expense")[1] !== undefined
            ? formatAmount(bestCategory("expense")[1])
            : " | нет дохода"}
        </p>{" "}
        {/* text-green-600 / text-red-600 */}
      </div>
    </div>
  );
};
export default IncomeExpenseCards;
