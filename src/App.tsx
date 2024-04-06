import { useState } from "react";
import { Login } from "./components/Login";
import SideMenu from "./components/side-menu";
import TopBar from "./components/top-bar";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-background flex flex-col text-foreground border rounded-md h-screen">
      <TopBar hideLogin={showLogin} />
      {showLogin ? <Login skip={() => setShowLogin(false)} /> : <SideMenu />}
    </div>
  );
}

export default App;
