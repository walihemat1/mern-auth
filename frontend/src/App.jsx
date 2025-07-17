import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="my-2">
        <Outlet />
      </div>
    </>
  );
}

export default App;
