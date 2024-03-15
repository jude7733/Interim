import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Categories from "./categories";
import Update from "./update";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Terminal } from "./terminal";
import Backup from "./backup";
import QueueList from "./ui/QueueList";

const SideMenu = () => {
  return (
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
        <TabsList>
          <TabsTrigger value="exit">Exit</TabsTrigger>
        </TabsList>
        <QueueList />
      </div>
      <ResizablePanelGroup direction="vertical" className="rounded-md border">
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
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <Terminal />
        </ResizablePanel>
      </ResizablePanelGroup>
    </Tabs>
  );
};
export default SideMenu;
