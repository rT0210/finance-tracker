import { formatAmount } from "../../utils/formatAmount";

type PropsType = {
  description: string;
  amount: number;
  category: string;
  date: string;
};

const TransactionCard = ({
  description,
  amount,
  category,
  date,
}: PropsType) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 transition hover:shadow-lg">
  <div className="flex justify-between items-start">
    <p className="text-gray-800 font-medium">{description}</p>
    <p className={`font-semibold ${amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
      {formatAmount(amount)}
    </p>
  </div>
  <p className="text-gray-500 text-sm mt-1">{category}</p>
  <p className="text-gray-400 text-xs mt-1">{date}</p>
  <div className="flex justify-end gap-3 mt-3">
    <button className="text-blue-500 text-sm hover:underline">Редактировать</button>
    <button className="text-red-500 text-sm hover:underline">Удалить</button>
  </div>
</div>
  );
};
export default TransactionCard;
