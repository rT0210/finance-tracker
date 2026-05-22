import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CategoriesModal from "./../../components/categoriesModal/CategoriesModal";
import { useState } from "react";
import { type Category } from "../../store/slices/categoriesSlice";

const Categories = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<"add" | "remove" | "change">(
    "add",
  );
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(
    undefined,
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const closeModal = () => {
    setIsShowModal(false);
    setCurrentCategory(undefined);
    setTypeModal("add");
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex pt-4 justify-between mb-4">
          <h2 className="text-2xl ">Категории</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
            onClick={() => {
              setTypeModal("add");
              setIsShowModal(true);
            }}
          >
            Добавить категорию
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <span className="text-gray-800 font-medium">{category.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setTypeModal("change");
                    setCurrentCategory(category);
                    setIsShowModal(true);
                  }}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => {
                    setTypeModal("remove");
                    setCurrentCategory(category);
                    setIsShowModal(true);
                  }}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
        {isShowModal && (
          <CategoriesModal
            closeModal={closeModal}
            typeModal={typeModal}
            currentCategory={currentCategory}
          />
        )}
      </div>
    </div>
  );
};
export default Categories;
