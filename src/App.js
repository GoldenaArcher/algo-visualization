import { Outlet } from "react-router-dom";
import Navigation from "./nav";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
