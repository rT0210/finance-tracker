import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import TransactionsPage from "../pages/transactionsPage/TransactionsPage";

const router = createBrowserRouter([
    {path: "/", element: <Layout />, children: [
        {index: true, element: <Home />},
        {path: "transactions", element: <TransactionsPage />}
    ]}
])

export default router