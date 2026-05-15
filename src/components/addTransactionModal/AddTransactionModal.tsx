import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../store/slices/transactionsSlice";

type PropsType = {
  closeModal: () => void;
};

const AddTransactionModal = ({ closeModal }: PropsType) => {
  const [inputAmount, setInputAmount] = useState(0);
  const [inputDescription, setInputDescription] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const addNewTransaction = () => {
    dispatch(
      addTransaction({
        id: Date.now(),
        description: inputDescription,
        category: inputCategory,
        date: inputDate,
        amount: type === "Доход" ? Math.abs(inputAmount) : -Math.abs(inputAmount),
      }),
    );
    setInputAmount(0);
    setInputDescription("");
    setInputCategory("");
    setInputDate("");
    closeModal();
  };
  const isValid =
    inputAmount > 0 &&
    inputDescription !== "" &&
    inputCategory !== "" &&
    inputDate !== "" &&
    type !== ""
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
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="" disabled>выберите тип</option>
            <option value="Доход">Доход</option>
            <option value="Расход">Расход</option>
          </select>
        </div>
        <input
          type="number"
          placeholder="сумма"
          className="text-3xl font-semibold w-full border-b border-gray-300 py-2 px-1 focus:outline-none focus:border-blue-500 mb-5"
          onChange={(e) => setInputAmount(+e.target.value)}
        />
        <input
          type="text"
          placeholder="описание"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          onChange={(e) => setInputCategory(e.target.value)}
          value={inputCategory}
        >
          <option value="" disabled>
            выберите категорию
          </option>
          <option value="Еда">Еда</option>
          <option value="Транспорт">Транспорт</option>
          <option value="Кафе">Кафе</option>
          <option value="Развлечения">Развлечения</option>
          <option value="Зарплата">Зарплата</option>
          <option value="Другое">Другое</option>
        </select>
        <input
          type="date"
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
            onClick={addNewTransaction}
            disabled={!isValid}
          >
            добавить
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddTransactionModal;
