import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import TransactionsPage from "../pages/transactionsPage/TransactionsPage";
import Categories from "../pages/categories/Categories";
import Analytics from "../pages/analytics/Analytics";

const router = createBrowserRouter([
    {path: "/", element: <Layout />, children: [
        {index: true, element: <Home />},
        {path: "transactions", element: <TransactionsPage />},
        {path: "categories", element: <Categories />},
        {path: "analytics", element: <Analytics />}
    ]}
])

export default router