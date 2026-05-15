import { Link } from "react-router-dom"

const QuickActions = () => {
    return (
        <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">БЫСТРЫЕ ДЕЙСТВИЯ</h2>
            <div className="flex mb-4 justify-between">
                <button className="bg-white border border-gray-300 shadow-sm rounded-lg py-2 px-4 font-medium text-gray-700 hover:bg-gray-50">+ Добавить расход</button>
                <button className="bg-white border border-gray-300 shadow-sm rounded-lg py-2 px-4 font-medium text-gray-700 hover:bg-gray-50">+ Добавить доход</button>
            </div>
            <div className="flex justify-between">
                <Link to={"/"} className="bg-white border border-gray-300 shadow-sm rounded-lg py-2 px-4 font-medium text-gray-700 hover:bg-gray-50">Полный отчет</Link>
                <Link to={"/"} className="bg-white border border-gray-300 shadow-sm rounded-lg py-2 px-4 font-medium text-gray-700 hover:bg-gray-50">Категории</Link>
            </div>
        </div>
    )
}
export default QuickActions