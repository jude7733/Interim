import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Categories from "./categories";
import Update from "./update";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const SideMenu = () => {
  return (
    <Tabs
      defaultValue="backup"
      orientation="vertical"
      className="flex flex-row grow"
    >
      <div className="flex flex-col flex-initial m-1 border rounded-md p-1 gap-2">
        <TabsList>
          <TabsTrigger value="backup">
            &nbsp;&nbsp;Backup &nbsp;&nbsp;
          </TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="update">
            &nbsp;&nbsp;Update &nbsp;&nbsp;
          </TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="settings">&nbsp;Settings &nbsp;</TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="about">
            &nbsp;&nbsp;&nbsp;About &nbsp;&nbsp;&nbsp;
          </TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="exit">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Exit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </TabsTrigger>
        </TabsList>
      </div>
      <ResizablePanelGroup direction="vertical" className="rounded-md border">
        <ResizablePanel defaultSize={75}>
          <div className="flex grow border rounded-md m-1 h-full w-full">
            <TabsContent value="categories" className="grow">
              <Categories />
            </TabsContent>
            <TabsContent value="update" className="grow">
              <Update />
            </TabsContent>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Terminal</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Tabs>
  );
};
export default SideMenu;
