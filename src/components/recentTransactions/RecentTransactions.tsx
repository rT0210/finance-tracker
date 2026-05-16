import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { formatAmount } from "../../utils/formatAmount";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const RecentTransactions = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const latestOperations = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  return (
    <div className="rounded-lg shadow-lg p-4 bg-white mb-4">
      <div className="flex mb-4 justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          ПОСЛЕДНИЕ ОПЕРАЦИИ
        </h2>
        <Link to={"transactions"} className="text-sm text-blue-600 hover:underline">
          Все операции
        </Link>
      </div>
      <ul>
        {latestOperations.map((elem) => (
          <li
            key={elem.id}
            className="flex justify-between items-center border-b last:border-0 py-2"
          >
            <p className="w-2/3">{elem.description}</p>
            <p
              className={`w-1/6 ${elem.amount >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatAmount(elem.amount)}
            </p>
            <p className="w-1/6 text-right">{formatDate(elem.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RecentTransactions;
