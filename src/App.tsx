import { DataProvider } from "./context/DataContext";
import SideMenu from "./components/side-menu";
import TopBar from "./components/top-bar";
function App() {
  return (
    <DataProvider>
      <div className="bg-background flex flex-col text-foreground border rounded-md h-screen">
        <TopBar />
        <SideMenu />
      </div>
    </DataProvider>
  );
}

export default App;
