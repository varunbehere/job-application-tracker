import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-black text-white">
        <Header />
        <AppProvider>
          <Outlet />
        </AppProvider>
      </div>
    </>
  );
}

export default App;
