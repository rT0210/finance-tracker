import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  changeCategories,
  delCategories,
} from "../../store/slices/categoriesSlice";
import type { RootState } from "../../store/store";

type CategoryType = {
  id: number;
  name: string;
};

type CategorisPropsType = {
  closeModal: () => void;
  typeModal: "add" | "remove" | "change";
  currentCategory?: CategoryType;
};

const CategoriesModal = ({
  closeModal,
  typeModal,
  currentCategory,
}: CategorisPropsType) => {
  const [categoryName, setCategoryName] = useState(currentCategory?.name || "");
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );

  const totalNameCategories = categories.map((cat) => cat.name.toLowerCase())
  const isDuplicate = totalNameCategories.includes(categoryName.toLowerCase())
  const titles = {
    add: "Новая категория",
    remove: "Удаление категории",
    change: "Изменение категории",
  };

  const handleConfirm = () => {
    switch (typeModal) {
      case "add":
        dispatch(
          addCategories({
            id: Date.now(),
            name:
              categoryName[0].toUpperCase() +
              categoryName.slice(1).toLowerCase(),
          }),
        );
        return closeModal();
      case "remove":
        dispatch(delCategories(currentCategory?.id));
        return closeModal();
      case "change":
        dispatch(
          changeCategories({
            ...currentCategory,
            name:
              categoryName[0].toUpperCase() +
              categoryName.slice(1).toLowerCase(),
          }),
        );
        return closeModal();
      default: {
        const checkNever: never = typeModal;
        return checkNever;
      }
    }
  };

  const actionSelection = () => {
    switch (typeModal) {
      case "add":
        return "Добавить";
      case "remove":
        return "Удалить";
      case "change":
        return "Сохранить";
      default: {
        const checkNever: never = typeModal;
        return checkNever;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="flex flex-col max-w-md bg-white rounded-2xl shadow-xl w-full mx-4 p-6 relative">
        <h2 className="mb-4">{titles[typeModal]}</h2>
        <input
          type="text"
          maxLength={20}
          placeholder="Название категории..."
          className="mb-4 h-10"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          readOnly={typeModal === "remove"}
        />
        <div className="flex justify-between">
          <button
            onClick={() => {
              setCategoryName("");
              closeModal();
            }}
          >
            Отменить
          </button>
          <button
            onClick={handleConfirm}
            className={`${typeModal === "remove" ? "text-black" : categoryName !== "" && !isDuplicate ? "text-black" : "text-gray-500"}`}
            disabled={categoryName === "" || (typeModal !== "remove" && isDuplicate)}
          >
            {actionSelection()}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CategoriesModal;
