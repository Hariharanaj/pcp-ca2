import AppRouter from "./router/AppRouter.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

function App() {
  return (
    <OrderProvider>
      <AppRouter />
    </OrderProvider>
  );
}

export default App;
