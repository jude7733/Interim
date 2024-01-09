import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/mode-toggle";

const SideMenu = () => {
  return (
    <Tabs
      defaultValue="backup"
      className="flex flex-row bg-background p-5 text-foreground"
    >
      <div className="flex flex-col">
        <ModeToggle />
        <TabsList>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        <TabsList>
          <TabsTrigger value="restore">Restore</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex flex-col">
        <TabsContent value="backup">
          <p>Backup</p>
        </TabsContent>
        <TabsContent value="restore">
          <p>Restore</p>
        </TabsContent>
      </div>
    </Tabs>
  );
};
export default SideMenu;
