import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import type { RootState } from "../../store/store";
import { formatAmount } from "../../utils/formatAmount";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088fe",
  "#00c49f",
  "#ffbb28",
  "#ff7c43",
  "#d0ed57",
];

const Analytics = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const currentDate = new Date().toISOString().slice(0, 7);

  const filterTransaction = () => {
    return transactions
      .filter((transaction) => transaction.date.startsWith(currentDate))
      .filter((transaction) => transaction.amount < 0);
  };
  const diagramData = (() => {
    const resultObj: Record<string, number> = {};
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 6);
    transactions
      .filter(
        (transaction) =>
          new Date(transaction.date) >= currentDate && transaction.amount < 0,
      )
      .forEach((item) => {
        if (resultObj[item.date.slice(0, 7)]) {
          resultObj[item.date.slice(0, 7)] += item.amount;
        } else {
          resultObj[item.date.slice(0, 7)] = item.amount;
        }
      });

    return Object.entries(resultObj).map(([key, value]) => ({
      month: new Date(key + "-01").toLocaleString("ru-RU", { month: "short" }),
      amount: Math.abs(value),
    }));
  })();
  const transactionCategory: Record<string, number> = {};
  filterTransaction().forEach((transaction) => {
    if (transactionCategory[transaction.category]) {
      transactionCategory[transaction.category] += transaction.amount;
    } else {
      transactionCategory[transaction.category] = transaction.amount;
    }
  });
  const data = Object.entries(transactionCategory).map(
    ([category, amount]) => ({
      category,
      amount: Math.abs(amount),
    }),
  );

  const totalExpense = data.reduce((acc, value) => acc + value.amount, 0);

  return (
    <div>
      <div className="max-w-7xl mx-auto pt-4">
        {data.length > 1 ? (
          <>
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Общая сумма расходов
              </p>
              <p className="text-3xl font-bold text-red-600">
                {formatAmount(-totalExpense)}
              </p>
            </div>{" "}
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p className="text-center">не достаточно данных</p>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Динамика расходов по месяцам
          </h3>
          {diagramData.length === 0 ? (
            <p className="text-center text-gray-500">
              Недостаточно данных для графика
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={diagramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatAmount(Number(value))} />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
export default Analytics;
