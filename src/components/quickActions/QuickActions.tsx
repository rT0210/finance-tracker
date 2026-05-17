import { useState } from "react";
import { Link } from "react-router-dom";
import TransactionModal from "../transactionModal/TransactionModal";

const QuickActions = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<"Доход" | "Расход">("Доход");
  const closeModal = () => setIsShowModal(false);
  return (
    <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white mb-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        БЫСТРЫЕ ДЕЙСТВИЯ
      </h2>
      <div className="flex mb-4 justify-between">
        <button
          className="bg-white border border-gray-300 shadow-sm rounded-lg py-2 px-4 font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setIsShowModal(true);
            setCurrentType("Расход");
          }}
        >
          + Добавить расход
        </button>
        <button
          className="bg-white border border-gray-300 shadow-sm rounded-lg py-2 px-4 font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setIsShowModal(true);
            setCurrentType("Доход");
          }}
        >
          + Добавить доход
        </button>
      </div>
      <div className="flex justify-between">
        <Link
          to={"/analytics"}
          className="bg-white border border-gray-300 shadow-sm rounded-lg py-2 px-4 font-medium text-gray-700 hover:bg-gray-50"
        >
          Аналитика
        </Link>
        <Link
          to={"/categories"}
          className="bg-white border border-gray-300 shadow-sm rounded-lg py-2 px-4 font-medium text-gray-700 hover:bg-gray-50"
        >
          Категории
        </Link>
      </div>
      {isShowModal && (
        <TransactionModal
          closeModal={closeModal}
          currentTransaction={{
            id: 0,
            description: "",
            amount: 0,
            date: "",
            category: "",
            type: currentType,
            typeTransaction: "add",
            unchangeableAction: true,
          }}
        />
      )}
    </div>
  );
};
export default QuickActions;
