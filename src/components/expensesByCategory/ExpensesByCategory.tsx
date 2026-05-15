import { formatAmount } from "../../utils/formatAmount";

const categories = [
  { name: "Еда", percent: 45, amount: -12000 },
  { name: "Транспорт", percent: 20, amount: -5000 },
  { name: "Кафе", percent: 20, amount: -5000 },
  { name: "Развлечения", percent: 15, amount: -3500 },
];

const ExpensesByCategory = () => {
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
        {categories.map((category) => (
          <li
            key={category.name}
            className="flex justify-between items-center py-2 border-b last:border-0"
          >
            <p className="w-1/4 text-gray-800 font-medium">{category.name}</p>
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
        ))}
      </ul>
    </div>
  );
};
export default ExpensesByCategory;
