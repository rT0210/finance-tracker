import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  delTransaction,
  updateTransaction,
} from "../../store/slices/transactionsSlice";
import type { RootState } from "../../store/store";

type currentTransactionType = {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: "Доход" | "Расход";
  typeTransaction: "change" | "remove" | "add";
  unchangeableAction?: true
};

type PropsType = {
  closeModal: () => void;
  currentTransaction: currentTransactionType;
};

const TransactionModal = ({ closeModal, currentTransaction }: PropsType) => {
  const newTransaction = { ...currentTransaction };
  const [inputAmount, setInputAmount] = useState(
    currentTransaction.typeTransaction === "add"
      ? ""
      : String(Math.abs(currentTransaction.amount)),
  );
  const [inputDescription, setInputDescription] = useState(
    newTransaction.description,
  );
  const [inputCategory, setInputCategory] = useState(newTransaction.category);
  const [inputDate, setInputDate] = useState(newTransaction.date);
  const [type, setType] = useState(newTransaction.type);
  const categories = useSelector((state: RootState) => state.categories.categories)
  const dispatch = useDispatch();

  console.log(categories)

  const isValid =
  inputAmount !== "" &&
  +inputAmount > 0 &&
  inputDescription !== "" &&
  inputCategory !== "" &&
  inputDate !== "";

  const modalText = (mode: "add" | "change" | "remove") => {
    switch (mode) {
      case "add":
        return "Добавить";
      case "remove":
        return "Удалить";
      case "change":
        return "Сохранить";
      default: {
        const neverMode: never = mode;
        return neverMode;
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col max-w-md bg-white rounded-2xl shadow-xl w-full mx-4 p-6 relative">
        <div
          className="absolute top-0 right-2 text-[20px] cursor-pointer"
          onClick={closeModal}
        >
          х
        </div>

        <div className="flex justify-between">
          <h2>Новая операция</h2>
          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value === "Доход" || value === "Расход") {
                setType(value);
              }
            }}
            value={type}
            disabled={currentTransaction.typeTransaction === "remove" || currentTransaction.unchangeableAction}
          >
            <option value="" disabled>
              выберите тип
            </option>
            <option value="Доход">Доход</option>
            <option value="Расход">Расход</option>
          </select>
        </div>
        <input
          type="number"
          readOnly={currentTransaction.typeTransaction === "remove"}
          value={inputAmount}
          placeholder="сумма"
          className="text-3xl font-semibold w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-blue-500 mb-5"
          onChange={(e) => setInputAmount(e.target.value)}
        />
        <input
          type="text"
          readOnly={currentTransaction.typeTransaction === "remove"}
          value={inputDescription}
          placeholder="описание"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          onChange={(e) => setInputCategory(e.target.value)}
          value={inputCategory}
          disabled={currentTransaction.typeTransaction === "remove"}
        >
          <option value="" disabled>
            выберите категорию
          </option>
          {categories.map((category) => (
            <option key={category.name}>{category.name}</option>
          ))}
        </select>
        <input
          type="date"
          readOnly={currentTransaction.typeTransaction === "remove"}
          value={inputDate}
          placeholder="дата"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          onChange={(e) => setInputDate(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button className="font-bold" onClick={closeModal}>
            отмена
          </button>
          <button
            className={`${!isValid ? "text-gray-400" : "text-black"}`}
            onClick={() => {
              closeModal();
              if (currentTransaction.typeTransaction === "add") {
                return dispatch(
                  addTransaction({
                    id: Date.now(),
                    description: inputDescription,
                    amount:
                      type === "Доход"
                        ? +inputAmount
                        : -Math.abs(+inputAmount),
                    date: inputDate,
                    category: inputCategory,
                  }),
                );
              }
              return currentTransaction.typeTransaction === "remove"
                ? dispatch(delTransaction(newTransaction.id))
                : dispatch(
                    updateTransaction({
                      id: currentTransaction.id,
                      description: inputDescription,
                      amount:
                        type === "Доход"
                          ? Math.abs(+inputAmount)
                          : -Math.abs(+inputAmount),
                      date: inputDate,
                      category: inputCategory,
                    }),
                  );
            }}
            disabled={!isValid}
          >
            {modalText(currentTransaction.typeTransaction)}
          </button>
        </div>
      </div>
    </div>
  );
};
export default TransactionModal;
