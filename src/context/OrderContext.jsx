import { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import OrderReducer, { initialState } from "../reducer/OrderReducer.jsx";
import { getToken, getDataset } from "../services/api.js";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        // Using credentials hardcoded in api.js
        const tokenRes = await getToken();
        const data = await getDataset(tokenRes.token, tokenRes.dataUrl);
        
        // The dataset returned is an object with an 'orders' array
        const ordersArray = data?.orders || [];
        
        // Data cleaning/validation as requested
        const cleanedData = ordersArray.filter(order => order && (order.orderid || order.id));
        
        dispatch({ type: "SET_ORDERS", payload: cleanedData });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };
    fetchData();
  }, []);

  // Computed values using filter/reduce as mandated
  const totalOrders = state.orders.length;
  const deliveredOrders = state.orders.filter(o => o.status === "delivered" || o.status === "Delivered").length;
  const cancelledOrders = state.orders.filter(o => o.status === "cancelled" || o.status === "Cancelled").length;

  // Expose to window as requested
  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
    };
  }, [totalOrders, deliveredOrders, cancelledOrders]);

  return (
    <OrderContext.Provider value={{ ...state, totalOrders, deliveredOrders, cancelledOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
