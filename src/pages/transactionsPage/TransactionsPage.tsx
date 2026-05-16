import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { formatAmount } from "../../utils/formatAmount";
import { formatDate } from "../../utils/formatDate";
import { useMemo, useState } from "react";
import type { Transaction } from "../../store/slices/transactionsSlice";
import TransactionModal from "../../components/transactionModal/TransactionModal";

const TransactionsPage = () => {
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [searchTransaction, setSearchTransaction] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);
  const [typeTransaction, setTypeTransaction] = useState<
    "change" | "remove" | "add"
  >("change");
  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (filter === "income") {
      result = result.filter((transaction) => transaction.amount > 0);
    }
    if (filter === "expense") {
      result = result.filter((transaction) => transaction.amount < 0);
    }
    if (searchTransaction.trim() !== "") {
      result = result.filter((transaction) =>
        transaction.description
          .toLowerCase()
          .includes(searchTransaction.toLocaleLowerCase()),
      );
    }
    return result;
  }, [transactions, filter, searchTransaction]);

  const closeModal = () => setIsShowModal(false);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4 pt-4">
          <h2 className="text-2xl font-bold text-gray-800">Все операции</h2>
          <input
            type="text"
            placeholder="поиск по описанию..."
            value={searchTransaction}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTransaction(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-1 shadow-sm"
            onClick={() => {
              setIsShowModal(true);
              setCurrentTransaction({
                id: Date.now(),
                description: "",
                amount: 0,
                date: "",
                category: "",
              });
              setTypeTransaction("add");
            }}
          >
            Добавить транзакцию
          </button>
        </div>
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} text-gray-800 hover:bg-gray-300 transition`}
            onClick={() => setFilter("all")}
          >
            Все
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${filter === "income" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} hover:bg-gray-300 transition`}
            onClick={() => setFilter("income")}
          >
            Доходы
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${filter === "expense" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} hover:bg-gray-300 transition`}
            onClick={() => setFilter("expense")}
          >
            Расходы
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Описание
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Сумма
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Категория
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Дата
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length !== 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{transaction.description}</td>
                    <td
                      className={`px-4 py-3 ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {formatAmount(transaction.amount)}
                    </td>
                    <td className="px-4 py-3">{transaction.category}</td>
                    <td className="px-4 py-3">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          setIsShowModal(true);
                          setCurrentTransaction(transaction);
                          setTypeTransaction("change");
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setIsShowModal(true);
                          setCurrentTransaction(transaction);
                          setTypeTransaction("remove");
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Пока не добавлено ни одной транзакции
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isShowModal && currentTransaction && (
          <TransactionModal
            closeModal={closeModal}
            currentTransaction={{
              ...currentTransaction,
              type: currentTransaction.amount > 0 ? "Доход" : "Расход",
              typeTransaction: typeTransaction,
            }}
          />
        )}
      </div>
    </div>
  );
};
export default TransactionsPage;
