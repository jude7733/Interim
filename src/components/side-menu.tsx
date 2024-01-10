import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/mode-toggle";

const SideMenu = () => {
  return (
    <Tabs
      defaultValue="backup"
      orientation="vertical"
      className="flex flex-row grow"
    >
      <div className="flex flex-col flex-0 m-1">
        <ModeToggle />
        <TabsList>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="Categories">Categories</TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="exit">Exit</TabsTrigger>
      </TabsList>
      </div>
        <div className="flex flex-1 grow border rounded m-4">
          <TabsContent value="backup">
            <p>Backup</p>
          </TabsContent>
        </div>
    </Tabs>
  );
};
export default SideMenu;
