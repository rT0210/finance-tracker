import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { formatAmount } from './../../utils/formatAmount';

const Header = () => {
  const transactions = useSelector((state: RootState) => state.transaction.transactions)
  const totalBalance = transactions.reduce((acc, item) => acc + item.amount, 0)
  return (
    <header className="bg-amber-100 px-4 text-[10px] md:text-[16px]">
      <div className="h-10 flex items-center max-w-7xl mx-auto justify-between">
        <Logo />
        <nav>
          <ul className="flex gap-2">
            <li>
              <Link to={"/"}>Главная</Link>
            </li>
            <li>
              <Link to={"/transactions"}>Операции</Link>
            </li>
            <li>
              <Link to={"/analytics"}>Аналитика</Link>
            </li>
          </ul>
        </nav>
        <p>Баланс: {formatAmount(totalBalance)}</p>
      </div>
    </header>
  );
};
export default Header;
