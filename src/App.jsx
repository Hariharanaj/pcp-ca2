import AppRouter from "./router/Approuter.jsx";
import { MovieProvider } from "./context/Moviecontext.jsx";

function App() {
  return (
    <MovieProvider>
      <AppRouter />
    </MovieProvider>
  );
}

export default App;
