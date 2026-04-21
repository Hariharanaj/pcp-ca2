import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/header.jsx";
import Orders from "../pages/Orders.jsx";
import OrderDetails from "../pages/OrderDetails.jsx";
import Filter from "../pages/Filter.jsx";
import Stats from "../pages/Stats.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/orders" />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
