import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { formatAmount } from "./../../utils/formatAmount";
import { useState } from "react";

const Header = () => {
  const transactions = useSelector((state: RootState) => state.transaction.transactions);
  const totalBalance = transactions.reduce((acc, item) => acc + item.amount, 0);
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(false);

  return (
    <header className="bg-amber-100 px-4 text-[10px] md:text-[16px]">
      <div className="h-10 flex items-center max-w-7xl mx-auto justify-between relative">
        <button
          className="flex flex-col gap-1 absolute md:hidden right-1"
          onClick={() => setIsOpenBurger((prev) => !prev)}
        >
          <div className="w-4 border"></div>
          <div className="w-4 border"></div>
          <div className="w-4 border"></div>
        </button>
        <Logo />
        <nav className="hidden md:flex">
          <ul className="flex gap-2">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/transactions">Операции</Link></li>
            <li><Link to="/analytics">Аналитика</Link></li>
            <li><Link to="/categories">Категории</Link></li>
          </ul>
        </nav>
        <p className="hidden md:block">Баланс: {formatAmount(totalBalance)}</p>
      </div>

      {/* Мобильное меню */}
      {isOpenBurger && (
        <div className="absolute top-10 left-0 w-full bg-amber-100 shadow-md z-40 md:hidden">
          <ul className="flex flex-col items-center py-4 gap-2">
            <li><Link to="/" onClick={() => setIsOpenBurger(false)}>Главная</Link></li>
            <li><Link to="/transactions" onClick={() => setIsOpenBurger(false)}>Операции</Link></li>
            <li><Link to="/analytics" onClick={() => setIsOpenBurger(false)}>Аналитика</Link></li>
            <li><Link to="/categories" onClick={() => setIsOpenBurger(false)}>Категории</Link></li>
            <li className="text-sm text-gray-600">Баланс: {formatAmount(totalBalance)}</li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;