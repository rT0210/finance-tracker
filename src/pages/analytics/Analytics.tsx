import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
  console.log(data);
  const totalExpense = data.reduce((acc, value) => acc + value.amount, 0);

  return (
    <div>
      <div className="max-w-7xl mx-auto pt-4">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Общая сумма расходов
          </p>
          <p className="text-3xl font-bold text-red-600">
            {formatAmount(-totalExpense)}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount" // ← должно совпадать с ключом в данных
              nameKey="category" // ← должно совпадать с ключом для названия
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
      </div>
    </div>
  );
};
export default Analytics;
