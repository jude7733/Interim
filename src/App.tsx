import SideMenu from "./components/side-menu";
import TopBar from "./components/top-bar";

function App() {

  return (
    <div className="bg-background flex flex-col text-foreground border rounded-md h-screen">
      <TopBar />
      <SideMenu />
    </div>
  );
}

export default App;
