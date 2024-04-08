import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import SideMenu from "./components/side-menu";
import TopBar from "./components/top-bar";
import { Toaster } from "./components/ui/toaster";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeSettings } from "./features/settingsSlice";
import { getSettings } from "./app/firestore";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const email = useAppSelector((state) => state.user.value?.email);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (email) {
      async () => dispatch(changeSettings(await getSettings(email)));
    }
  }, []);

  return (
    <div className="bg-background flex flex-col text-foreground border rounded-md h-screen">
      <TopBar hideLogin={showLogin} email={email ?? ""} />
      {showLogin ? <Login skip={() => setShowLogin(false)} /> : <SideMenu />}
      <Toaster />
    </div>
  );
}

export default App;
