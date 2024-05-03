import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import TopBar from "./components/top-bar";
import { Toaster } from "./components/ui/toaster";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { changeSettings } from "./features/settingsSlice";
import { getSettings } from "./app/firestore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import QueueList from "./components/ui/QueueList";
import Backup from "./components/backup";
import Categories from "./components/categories";
import Update from "./components/update";
import Settings from "./components/settings";
import { Terminal } from "./components/terminal";

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
      {showLogin ? (
        <Login skip={() => setShowLogin(false)} />
      ) : (
        <Tabs
          defaultValue="backup"
          orientation="vertical"
          className="flex flex-row grow"
        >
          <div className="flex flex-col flex-initial border-r-2 p-1 gap-2">
            <TabsList>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>
            <TabsList>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            <TabsList>
              <TabsTrigger value="update">Update</TabsTrigger>
            </TabsList>
            <TabsList>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <QueueList />
          </div>
          <ResizablePanelGroup
            direction="vertical"
            className="rounded-md border"
          >
            <ResizablePanel defaultSize={80}>
              <div className="flex grow p-1 h-full w-full">
                <TabsContent value="backup" className="grow">
                  <Backup />
                </TabsContent>
                <TabsContent value="categories" className="grow">
                  <Categories />
                </TabsContent>
                <TabsContent value="update" className="grow">
                  <Update />
                </TabsContent>
                <TabsContent value="settings" className="grow">
                  <Settings />
                </TabsContent>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={20}>
              <Terminal />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Tabs>
      )}
      <Toaster />
    </div>
  );
}

export default App;
